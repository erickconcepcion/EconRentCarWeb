using EconRentCar.Core;
using EconRentCar.DataModel;
using EconRentCar.Logics.Repositories;
using EconRentCar.Logics.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Services
{
    public class ClienteService : EntityBaseService<Cliente>, IClienteService
    {
        
        private ClienteService(IValidator<Cliente> val, IClienteRepository repo)
            : base(val, repo)
        {

        }
    }
}
