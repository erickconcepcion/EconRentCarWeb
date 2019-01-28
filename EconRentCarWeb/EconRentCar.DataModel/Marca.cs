using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class Marca : IEntityBase
    {
        public Marca()
        {
            Modelos = new HashSet<Modelo>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Descripcion { get; set; }
        public virtual ICollection<Modelo> Modelos { get; set; }
        public bool Activo { get; set; }
    }
}
