using HighCapital.Application.DTOs.Auth;
using HighCapital.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HighCapital.Web.Controllers;

/// <summary>
/// Controlador responsável pela autenticação e registro de usuários
/// </summary>
[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Registra um novo usuário
    /// </summary>
    /// <param name="request">Dados do usuário para registro</param>
    /// <returns>Token de autenticação e dados do usuário</returns>
    /// <response code="200">Usuário registrado com sucesso</response>
    /// <response code="400">Dados inválidos ou email já cadastrado</response>
    /// <response code="500">Erro interno do servidor</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [Consumes("application/json")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            if (request == null)
            {
                return BadRequest(new { message = "Request não pode ser nulo" });
            }

            if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Nome, Email e Senha são obrigatórios" });
            }

            var result = await _authService.RegisterAsync(request);
            return CreatedAtAction(nameof(Login), new { }, result);
        }
        catch (Exception ex) when (ex.Message.Contains("Email já cadastrado"))
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erro interno do servidor: {ex.Message}" });
        }
    }

    /// <summary>
    /// Autentica um usuário
    /// </summary>
    /// <param name="request">Credenciais de login</param>
    /// <returns>Token de autenticação e dados do usuário</returns>
    /// <response code="200">Login realizado com sucesso</response>
    /// <response code="400">Credenciais inválidas</response>
    /// <response code="500">Erro interno do servidor</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await _authService.LoginAsync(request);
            return Ok(result);
        }
        catch (Exception ex) when (ex.Message.Contains("Credenciais inválidas"))
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erro interno do servidor: {ex.Message}" });
        }
    }

    /// <summary>
    /// Refresh token
    /// </summary>
    /// <param name="request">Refresh token</param>
    /// <returns>Novo token de autenticação e refresh token</returns>
    /// <response code="200">Token renovado com sucesso</response>
    /// <response code="400">Refresh token inválido</response>
    /// <response code="500">Erro interno do servidor</response>
    [HttpPost("refresh")]
    [ProducesResponseType(typeof(AuthResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(result);
        }
        catch (Exception ex) when (ex.Message.Contains("Refresh token inválido"))
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erro interno do servidor: {ex.Message}" });
        }
    }
}
