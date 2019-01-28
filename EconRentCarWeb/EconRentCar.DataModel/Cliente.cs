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
    public class Cliente : IEntityBase
    {
        public Cliente()
        {
            Rentas = new HashSet<Renta>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Nombres { get; set; }
        [Required]
        public string Apellidos { get; set; }
        [Required]
        public string CedulaCliente { get; set; }
        [Required]
        public string NoTArjetaCredito { get; set; }
        [DataType("money")]
        public double LimiteCredito { get; set; }
        [Required]
        public TipoPersona TipoPersona { get; set; }
        public bool Activo { get; set; }
        public virtual ICollection<Renta> Rentas { get; set; }
    }
}
