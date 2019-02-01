using AutoMapper;
using EconRentCar.DataModel;
using EconRentCar.Logics.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EconRentCar.Api
{
    public class EconrentCarMappings: Profile
    {
        public override string ProfileName => "EconrentCarMappings";
        public EconrentCarMappings()
        {
            CreateMap<Cliente, ClienteVm>()
                .ReverseMap();
            CreateMap<Empleado, EmpleadoVm>()
                .ReverseMap();
            CreateMap<Inspeccion, InspeccionVm>()
                .ReverseMap();
            CreateMap<Marca, MarcaVm>()
                .ReverseMap();
            CreateMap<Modelo, ModeloVm>()
                .ReverseMap();
            CreateMap<Renta, RentaVm>()
                .ReverseMap();
            CreateMap<TipoCombustible, TipoCombustibleVm>()
                .ReverseMap();
            CreateMap<TipoVehiculo, TipoVehiculoVm>()
                .ReverseMap();
            CreateMap<Vehiculo, VehiculoVm>()
                .ReverseMap();
        }
    }
}
