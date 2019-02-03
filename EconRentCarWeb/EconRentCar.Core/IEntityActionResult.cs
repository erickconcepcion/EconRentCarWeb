using System;
using System.Collections.Generic;

namespace EconRentCar.Core
{
    public interface IEntityActionResult
    {
        int ErrorCode { get; set; }
        bool Success { get; set; }
        IEnumerable<KeyValuePair<string, string>> Messages { get; set; }
        Guid Id { get; set; }
    }
}