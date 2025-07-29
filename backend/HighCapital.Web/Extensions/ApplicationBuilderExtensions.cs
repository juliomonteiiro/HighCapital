using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace HighCapital.Web.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "HighCapital API v1");
                });
            }

            return app;
        }
    }
}
