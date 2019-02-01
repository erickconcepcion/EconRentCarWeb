using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Core;
using EconRentCar.DataModel;
using EconRentCar.Logics.Repositories;
using EconRentCar.Logics.Validators;
using FluentValidation;

namespace EconRentCar.Logics.Services
{
    public class EmpleadoService : EntityBaseService<Empleado>, IEmpleadoService
    {
        public EmpleadoService(IValidator<Empleado> val, IEmpleadoRepository repo)
            : base(val, repo)
        {

        }
    }
}
