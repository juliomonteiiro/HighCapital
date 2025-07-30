using HighCapital.Application.DTOs.User;
using HighCapital.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.Web.Controllers
{
    /// <summary>
    /// Controlador responsável pelo gerenciamento de usuários
    /// </summary>
    [ApiController]
    [Route("api/users")]
    [Authorize]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Lista de usuários</returns>
        /// <response code="200">Lista retornada com sucesso</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserList>), 200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<UserList>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Obtém o perfil do usuário
        /// </summary>
        /// <returns>Dados do usuário</returns>
        /// <response code="200">Usuário encontrado</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="404">Usuário não encontrado</response>
        [HttpGet("profile")]
        [ProducesResponseType(typeof(UserProfile), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<UserProfile>> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                var user = await _userService.GetUserAsync(userId);
                return Ok(user);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Atualiza o perfil do usuário
        /// </summary>
        /// <param name="request">Dados para atualização</param>
        /// <returns>Usuário atualizado</returns>
        /// <response code="200">Usuário atualizado com sucesso</response>
        /// <response code="400">Dados inválidos</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="404">Usuário não encontrado</response>
        [HttpPut("profile")]
        [ProducesResponseType(typeof(UserProfile), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<UserProfile>> UpdateProfile([FromBody] UpdateUserRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                var user = await _userService.UpdateUserAsync(userId, request);
                return Ok(user);
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex) when (ex.Message.Contains("Email já cadastrado"))
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Altera a senha do usuário
        /// </summary>
        /// <param name="request">Dados para alteração de senha</param>
        /// <returns>Sem conteúdo</returns>
        /// <response code="204">Senha alterada com sucesso</response>
        /// <response code="400">Dados inválidos</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="404">Usuário não encontrado</response>
        [HttpPut("profile/password")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> UpdatePassword([FromBody] UpdateUserPasswordRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Token inválido ou expirado" });
                }

                await _userService.UpdatePasswordAsync(userId, request);
                return NoContent();
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex) when (ex.Message.Contains("Senha atual incorreta"))
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Remove um usuário
        /// </summary>
        /// <param name="id">ID do usuário</param>
        /// <returns>Sem conteúdo</returns>
        /// <response code="204">Usuário removido com sucesso</response>
        /// <response code="401">Usuário não autenticado</response>
        /// <response code="404">Usuário não encontrado</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return NoContent();
            }
            catch (Exception ex) when (ex.Message.Contains("não encontrado"))
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
