using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Common;
using EconRentCar.Core;

namespace EconRentCar.DataModel
{
    public class Empleado : IEntityBase
    {
        public Empleado()
        {
            Rentas = new HashSet<Renta>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Nombres { get; set; }
        [Required]
        public string Apellidos { get; set; }
        [Required]
        public string CedulaEmpleado { get; set; }
        [Required]
        public TandaLaboral TandaLaboral { get; set; }
        [Required]
        [DataType("money")]
        public decimal PorcentajeComision { get; set; }
        [Required]
        public DateTime FechaIngreso { get; set; }
        public bool Activo { get; set; }
        [ForeignKey("AppUsers")]
        public string AppUserId { get; set; }
        public virtual AppUser AppUsers { get; set; }
        public virtual ICollection<Renta> Rentas { get; set; }

    }
}
