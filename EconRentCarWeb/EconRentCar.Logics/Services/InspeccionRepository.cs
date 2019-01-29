using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Core;
using EconRentCar.DataModel;
using FluentValidation;
using EconRentCar.Logics.Validators;
using EconRentCar.Logics.Repositories;

namespace EconRentCar.Logics.Services
{
    public class InspeccionService : EntityBaseService<Inspeccion>, IInspeccionService
    {
        private InspeccionService(IValidator<Inspeccion> val, IInspeccionRepository repo)
            : base(val, repo)
        {

        }
    }
}
