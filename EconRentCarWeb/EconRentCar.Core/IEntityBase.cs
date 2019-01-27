using System;
using System.Collections.Generic;
using System.Text;

namespace EconRentCar.Core
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
    }
}
