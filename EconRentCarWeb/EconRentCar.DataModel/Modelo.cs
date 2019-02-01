using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class Modelo : IEntityBase
    {
        public Modelo()
        {
            Vehiculos = new HashSet<Vehiculo>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [DataType("money")]
        public decimal MontoPorDia { get; set; }
        public bool Activo { get; set; }
        public Guid MarcaId { get; set; }
        public virtual Marca Marca { get; set; }
        public virtual ICollection<Vehiculo> Vehiculos { get; set; }
    }
}
