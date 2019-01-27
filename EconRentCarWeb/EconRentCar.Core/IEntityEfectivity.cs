using System;
using System.Collections.Generic;
using System.Text;

namespace EconRentCar.Core
{
    interface IEntityEfectivity
    {
        DateTime StartDate { get; set; }
        DateTime? EndDate { get; set; }
    }
}
