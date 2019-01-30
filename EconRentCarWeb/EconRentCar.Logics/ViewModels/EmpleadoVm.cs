using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EconRentCar.Common;
using EconRentCar.Core;

namespace EconRentCar.Logics.ViewModels
{
    public class EmpleadoVm : IViewModel
    {
        public Guid Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string CedulaEmpleado { get; set; }
        public TandaLaboral TandaLaboral { get; set; }
        public decimal PorcentajeComision { get; set; }
        public DateTime FechaIngreso { get; set; }
        public bool Activo { get; set; }
        public virtual ICollection<RentaRefVm> Rentas { get; set; }

    }
}
