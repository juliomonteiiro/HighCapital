using HighCapital.Application.DTOs.Chatbot;
using HighCapital.Application.DTOs.Message;
using HighCapital.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.Web.Controllers
{
    /// <summary>
    /// Controlador responsável pelo gerenciamento de mensagens dos chatbots
    /// </summary>
    [ApiController]
    [Route("api/messages/{chatbotId}")]
    [Authorize]
    [Produces("application/json")]
    public class MessagesController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;

        public MessagesController(IChatbotService chatbotService)
        {
            _chatbotService = chatbotService;
        }

        /// <summary>
        /// Obtém o histórico de mensagens de um chatbot
        /// </summary>
        /// <param name="chatbotId">ID do chatbot</param>
        /// <returns>Lista de mensagens</returns>
        /// <response code="200">Mensagens encontradas</response>
        /// <response code="404">Chatbot não encontrado</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MessageResponse>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<MessageResponse>>> GetMessages(int chatbotId)
        {
            try
            {
                var messages = await _chatbotService.GetChatbotMessagesAsync(chatbotId);
                return Ok(messages);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Envia uma mensagem para o chatbot e recebe a resposta da IA
        /// </summary>
        /// <param name="chatbotId">ID do chatbot</param>
        /// <param name="request">Dados da mensagem a ser enviada</param>
        /// <returns>Resposta do chatbot</returns>
        /// <response code="200">Mensagem processada com sucesso</response>
        /// <response code="400">Dados inválidos ou chatbot não encontrado</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="500">Erro interno do servidor</response>
        [HttpPost]
        [ProducesResponseType(typeof(ChatMessageResponse), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<ChatMessageResponse>> SendMessage(int chatbotId, [FromBody] SendMessageRequest request)
        {
            try
            {
                var chatMessageRequest = new ChatMessageRequest
                {
                    ChatbotId = chatbotId,
                    Message = request.Message
                };

                var response = await _chatbotService.SendMessageAsync(chatMessageRequest);
                return Ok(response);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado") || ex.Message.Contains("inativo"))
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex) when (ex.Message.Contains("OpenAI") || ex.Message.Contains("API"))
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro interno do servidor: {ex.Message}" });
            }
        }
    }
}
