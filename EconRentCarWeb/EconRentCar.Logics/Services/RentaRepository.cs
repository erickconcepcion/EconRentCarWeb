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
    public class RentaService : EntityBaseService<Renta>,IRentaService
    {
        private RentaService(IValidator<Renta> val, IRentaRepository repo)
            : base(val, repo)
        {

        }
    }
}
