using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Core;
using EconRentCar.DataModel;
using FluentValidation;
using EconRentCar.Logics.Validators;
using Microsoft.EntityFrameworkCore;

namespace EconRentCar.Logics.Repositories
{
    public class TipoVehiculoRepository : EntityBaseRepository<TipoVehiculo>, ITipoVehiculoRepository
    {
        private TipoVehiculoRepository(DbContext db)
            : base(db)
        {

        }
    }
}
