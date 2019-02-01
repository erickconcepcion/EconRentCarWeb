using EconRentCar.Core;
using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Logics.Validators;
using Microsoft.EntityFrameworkCore;

namespace EconRentCar.Logics.Repositories
{
    public class VehiculoRepository: EntityBaseRepository<Vehiculo>,IVehiculoRepository
    {
        public VehiculoRepository(ApplicationDbContext db)
            : base(db)
        {

        }
    }
}
