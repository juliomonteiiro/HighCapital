using HighCapital.Application.DTOs.Chatbot;
using HighCapital.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.Web.Controllers
{
    /// <summary>
    /// Controlador responsável pelo gerenciamento de chatbots
    /// </summary>
    [ApiController]
    [Route("api/chatbots")]
    [Authorize]
    [Produces("application/json")]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;

        public ChatbotController(IChatbotService chatbotService)
        {
            _chatbotService = chatbotService;
        }

        /// <summary>
        /// Lista todos os chatbots do usuário
        /// </summary>
        /// <returns>Lista de chatbots</returns>
        /// <response code="200">Chatbots encontrados</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ChatbotResponse>), 200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<ChatbotResponse>>> GetChatbots()
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                var chatbots = await _chatbotService.GetUserChatbotsAsync(userId);
                return Ok(chatbots);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Obtém informações de um chatbot por ID
        /// </summary>
        /// <param name="id">ID do chatbot</param>
        /// <returns>Informações do chatbot</returns>
        /// <response code="200">Chatbot encontrado</response>
        /// <response code="404">Chatbot não encontrado</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ChatbotResponse), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<ChatbotResponse>> GetChatbot(int id)
        {
            try
            {
                var chatbot = await _chatbotService.GetChatbotAsync(id);
                return Ok(chatbot);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Cria um novo chatbot
        /// </summary>
        /// <param name="request">Dados do chatbot a ser criado</param>
        /// <returns>ID do chatbot criado</returns>
        /// <response code="201">Chatbot criado com sucesso</response>
        /// <response code="400">Dados inválidos</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="500">Erro interno do servidor</response>
        [HttpPost]
        [ProducesResponseType(typeof(int), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<int>> CreateChatbot([FromBody] CreateChatbotRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                var id = await _chatbotService.CreateChatbotAsync(request, userId);
                return CreatedAtAction(nameof(GetChatbot), new { id }, id);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Atualiza um chatbot por ID
        /// </summary>
        /// <param name="id">ID do chatbot</param>
        /// <param name="request">Dados para atualização</param>
        /// <returns>Chatbot atualizado</returns>
        /// <response code="200">Chatbot atualizado com sucesso</response>
        /// <response code="400">Dados inválidos</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="403">Acesso negado</response>
        /// <response code="404">Chatbot não encontrado</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ChatbotResponse), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ChatbotResponse>> UpdateChatbot(int id, [FromBody] UpdateChatbotRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                var chatbot = await _chatbotService.UpdateChatbotAsync(id, request, userId);
                return Ok(chatbot);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex) when (ex.Message.Contains("Acesso negado"))
            {
                return Forbid();
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        /// <summary>
        /// Remove um chatbot por ID
        /// </summary>
        /// <param name="id">ID do chatbot</param>
        /// <returns>Sem conteúdo</returns>
        /// <response code="204">Chatbot removido com sucesso</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="403">Acesso negado</response>
        /// <response code="404">Chatbot não encontrado</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteChatbot(int id)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                await _chatbotService.DeleteChatbotAsync(id, userId);
                return NoContent();
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex) when (ex.Message.Contains("Acesso negado"))
            {
                return Forbid();
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }
    }
}
