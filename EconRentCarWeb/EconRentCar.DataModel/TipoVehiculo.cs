using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class TipoVehiculo : IEntityBase
    {
        public TipoVehiculo()
        {
            Vehiculos = new HashSet<Vehiculo>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public virtual ICollection<Vehiculo> Vehiculos { get; set; }
    }
}
