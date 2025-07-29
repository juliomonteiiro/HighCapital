using HighCapital.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using HighCapital.Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("String de conexão não configurada.")));

builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSwaggerDocumentation();

builder.Services.AddControllers();

var app = builder.Build();

app.UseSwaggerDocumentation(app.Environment);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
