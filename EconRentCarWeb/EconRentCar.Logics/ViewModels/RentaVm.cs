using EconRentCar.Common;
using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.ViewModels
{
    public class RentaVm : IViewModel
    {
        public Guid Id { get; set; }
        public DateTime FechaRenta { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public string Comentario { get; set; }
        public EstadoRenta EstadoRenta { get; set; }
        public Guid VehiculoId { get; set; }
        public virtual VehiculoRefVm Vehiculo { get; set; }
        public Guid EmpleadoId { get; set; }
        public virtual EmpleadoRefVm Empleado { get; set; }
        public Guid ClienteId { get; set; }
        public virtual ClienteRefVm Cliente { get; set; }
        public virtual ICollection<InspeccionVm> Inspecciones { get; set; }
    }
}
