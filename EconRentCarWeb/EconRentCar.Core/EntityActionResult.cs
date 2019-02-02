using System;
using System.Collections.Generic;

namespace EconRentCar.Core
{
    public class EntityActionResult: IEntityActionResult
    {
        public int ErrorCode { get; set; }
        public bool Success { get; set; }
        public IDictionary<string, string> Messages { get; set; }
        public Guid Id { get; set; }
    }
}