using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NotificationMicroservice.Hubs;
using NotificationMicroservice.Models;
using NotificationMicroservice.Models.Interfaces;
using NotificationMicroservice.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();

            //services.AddDbContext<AuthenticationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));

            var server = Configuration["DatabaseServer"] ?? "mssql-server";
            var port = Configuration["DatabasePort"] ?? "1433"; // Default SQL Server port
            var user = Configuration["DatabaseUser"] ?? "SA"; // Warning do not use the SA account
            var password = Configuration["DatabasePassword"] ?? "Password1!";
            var database = Configuration["DatabaseName"] ?? "NotificationDB"; 

            services.AddDbContext<AuthenticationContext>(options => options.UseSqlServer($"Server={server}, {port};Initial Catalog={database};User ID={user};Password={password}"));

            services.AddScoped<INotification, NotificationService>();
            services.AddScoped<ISettings, SettingsService>();
            

            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200") // the Angular app url
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddSignalR();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            DatabaseManagementService.MigrationInitialization(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString()).AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/notifikacije");
            });
        }
    }
}
