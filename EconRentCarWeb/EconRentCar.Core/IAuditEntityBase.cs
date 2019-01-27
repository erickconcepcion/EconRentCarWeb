using System;
using System.Collections.Generic;
using System.Text;

namespace EconRentCar.Core
{
    public interface IAuditEntityBase: IEntityBase
    {
        DateTimeOffset CreatedDate { get; set; }
        DateTimeOffset? ModifiedDate { get; set; }
        Guid CreatedBy { get; set; }
        Guid? ModifiedBy { get; set; }
        bool Disabled { get; set; }
    }
}
