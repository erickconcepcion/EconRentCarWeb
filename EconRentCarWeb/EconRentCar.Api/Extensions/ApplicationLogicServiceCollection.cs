using EconRentCar.Logics.Repositories;
using EconRentCar.Logics.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EconRentCar.Api.Extensions
{
    public static class ApplicationLogicServiceCollection
    {
        public static IServiceCollection AddEntityRepositories(this IServiceCollection services)
        {
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IEmpleadoRepository, EmpleadoRepository>();
            services.AddScoped<IInspeccionRepository, InspeccionRepository>();
            services.AddScoped<IMarcaRepository, MarcaRepository>();
            services.AddScoped<IModeloRepository, ModeloRepository>();
            services.AddScoped<IRentaRepository, RentaRepository>();
            services.AddScoped<ITipoCombustibleRepository, TipoCombustibleRepository>();
            services.AddScoped<ITipoVehiculoRepository, TipoVehiculoRepository>();
            services.AddScoped<IVehiculoRepository, VehiculoRepository>();
            return services;
        }

        public static IServiceCollection AddEntityServices(this IServiceCollection services)
        {
            services.AddScoped<IClienteService, ClienteService>();

            services.AddScoped<IEmpleadoService, EmpleadoService>();
            services.AddScoped<IInspeccionService, InspeccionService>();
            services.AddScoped<IMarcaService, MarcaService>();
            services.AddScoped<IModeloService, ModeloService>();
            services.AddScoped<IRentaService, RentaService>();
            services.AddScoped<ITipoCombustibleService, TipoCombustibleService>();
            services.AddScoped<ITipoVehiculoService, TipoVehiculoService>();
            services.AddScoped<IVehiculoService, VehiculoService>();
            return services;
        }
    }
}
