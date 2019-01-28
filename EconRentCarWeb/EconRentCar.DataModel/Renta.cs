using EconRentCar.Common;
using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class Renta : IEntityBase
    {
        public Renta()
        {
            Inspecciones = new HashSet<Inspeccion>();
        }
        public Guid Id { get; set; }
        public DateTime FechaRenta { get; set; }
        public DateTime FechaDevolucion { get; set; }
        [Required]
        public string Comentario { get; set; }
        public EstadoRenta EstadoRenta { get; set; }
        public int VehiculoId { get; set; }
        public virtual Vehiculo Vehiculo { get; set; }
        public int EmpleadoId { get; set; }
        public virtual Empleado Empleado { get; set; }
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<Inspeccion> Inspecciones { get; set; }
    }
}
