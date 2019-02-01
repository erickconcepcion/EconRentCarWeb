using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Core;
using EconRentCar.DataModel;
using EconRentCar.Logics.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace EconRentCar.Logics.Repositories
{
    public class EmpleadoRepository : EntityBaseRepository<Empleado>, IEmpleadoRepository
    {
        public EmpleadoRepository(ApplicationDbContext db)
            : base(db)
        {

        }
    }
}
