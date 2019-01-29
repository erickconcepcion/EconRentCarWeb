using EconRentCar.Core;
using EconRentCar.DataModel;
using EconRentCar.Logics.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Repositories
{
    public class ClienteRepository : EntityBaseRepository<Cliente>, IClienteRepository
    {
        private ClienteRepository(DbContext db)
            : base(db)
        {

        }
    }
}
