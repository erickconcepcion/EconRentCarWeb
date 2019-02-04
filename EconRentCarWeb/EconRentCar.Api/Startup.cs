using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EconRentCar.DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using EconRentCar.Api.AuthServices;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.DependencyInjection.Extensions;
using EconRentCar.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using EconRentCar.Logics.Repositories;
using EconRentCar.Api.Extensions;
using FluentValidation.AspNetCore;
using FluentValidation;
using EconRentCar.Logics.Validators;
using AutoMapper;
using EconRentCar.Logics.Services;

namespace EconRentCar.Api
{
    public class Startup
    {
        private const string SecretKey = "THEKEYISINYOURHEART";
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddSingleton<IJwtFactory, JwtFactory>();

            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = AppConstants.Issuer;
                options.Audience = AppConstants.Audience;
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = AppConstants.Issuer,

                ValidateAudience = true,
                ValidAudience = AppConstants.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = AppConstants.Issuer;
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(AppConstants.rolClaim, AppConstants.apiAccess));
            });

            services.AddCors();

            services.AddEntityRepositories();

            services.AddEntityServices();

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver
                    = new Newtonsoft.Json.Serialization.DefaultContractResolver();
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)           
            .AddFluentValidation();

            AssemblyScanner.FindValidatorsInAssemblyContaining<ClienteValidator>()
               .ForEach(a => services.AddTransient(a.InterfaceType, a.ValidatorType));

            services.AddAutoMapper(map => { map.AddProfile<EconrentCarMappings>(); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider service)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            CreateUserRoles(service).Wait();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var UserManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            IdentityResult usersResult;
            var credential = "super@usuario.com";
            AppUser user = await UserManager.FindByEmailAsync(credential);
            
            if (user == null)
            {
                var User = new AppUser() { UserName = credential, Email = credential };
                usersResult = await UserManager.CreateAsync(User, "Abcd.1234");
                var emp = context.Empleados.Where(e => e.AppUserId==User.Id).FirstOrDefault();
                if (emp == null)
                {
                    emp = new Empleado
                    {
                        Nombres = "Super",
                        Apellidos = "Usuario",
                        TandaLaboral = Common.TandaLaboral.Matutino,
                        CedulaEmpleado = "000",
                        PorcentajeComision = 0.00m,
                        FechaIngreso = DateTime.Now,
                        AppUserId = User.Id
                    };
                    context.Empleados.Add(emp);
                    await context.SaveChangesAsync();
                }

            }
        }
    }
}
