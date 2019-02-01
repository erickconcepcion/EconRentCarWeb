using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.DataModel
{
    public class Inspeccion : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid RentaId { get; set; }
        public virtual Renta Renta { get; set; }
        public bool TieneRayaduras { get; set; }
        public decimal GalonesCombustibles { get; set; }
        public bool TieneGomaRepuesta { get; set; }
        public bool TieneGato { get; set; }
        public bool CristalRoto { get; set; }
        public bool GomasDaniadas { get; set; }
        [DataType("money")]
        public decimal CargosExtra { get; set; }
        [Required]
        public DateTime FechaInspeccion { get; set; }
        public bool PasaInspeccion { get; set; }
    }
}
