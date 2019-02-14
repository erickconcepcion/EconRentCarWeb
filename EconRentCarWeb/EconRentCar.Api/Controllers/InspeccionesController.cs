using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EconRentCar.Core;
using EconRentCar.DataModel;
using EconRentCar.Logics.ViewModels;
using EconRentCar.Logics.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace EconRentCar.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [ApiController]
    public class InspeccionesController : EntityBaseApiController<Inspeccion, InspeccionVm>
    {
        public InspeccionesController(IInspeccionService _service, IMapper _mapper): 
            base(_service, _mapper, "Renta,Renta.Vehiculo,Renta.Empleado,Renta.Cliente")
        {

        }
    }
}