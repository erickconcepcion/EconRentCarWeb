﻿using EconRentCar.Core;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class AppUser: IdentityUser
    {
        public virtual Empleado Empleado { get; set; }

    }
}
