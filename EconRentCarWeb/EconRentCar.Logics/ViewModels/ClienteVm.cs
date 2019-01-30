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
    public class ClienteVm : IViewModel
    {
        public Guid Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string CedulaCliente { get; set; }
        public string NoTArjetaCredito { get; set; }
        public double LimiteCredito { get; set; }
        public TipoPersona TipoPersona { get; set; }
        public bool Activo { get; set; }
        public virtual ICollection<RentaRefVm> Rentas { get; set; }
    }
}
