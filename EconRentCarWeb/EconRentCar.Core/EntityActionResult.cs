using System;
using System.Collections.Generic;

namespace EconRentCar.Core
{
    public class EntityActionResult: IEntityActionResult
    {
        public int ErrorCode { get; set; }
        public bool Success { get; set; }
        public IEnumerable<KeyValuePair<string, string>> Messages { get; set; }
        public Guid Id { get; set; }
    }
}