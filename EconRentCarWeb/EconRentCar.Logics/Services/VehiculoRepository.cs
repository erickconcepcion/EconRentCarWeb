using EconRentCar.Core;
using EconRentCar.DataModel;
using FluentValidation;
using System.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Logics.Validators;
using EconRentCar.Logics.Repositories;

namespace EconRentCar.Logics.Services
{
    public class VehiculoService: EntityBaseService<Vehiculo>,IVehiculoService
    {
        private VehiculoService(IValidator<Vehiculo> val, IVehiculoRepository repo)
            : base(val, repo)
        {

        }
    }
}
