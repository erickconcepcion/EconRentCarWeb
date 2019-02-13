using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.ViewModels
{
    public class InspeccionVm : IViewModel
    {
        public Guid Id { get; set; }
        public Guid RentaId { get; set; }
        public virtual RentaRefVm Renta { get; set; }
        public bool TieneRayaduras { get; set; }
        public decimal GalonesCombustibles { get; set; }
        public bool TieneGomaRepuesta { get; set; }
        public bool TieneGato { get; set; }
        public bool CristalRoto { get; set; }
        public bool GomasDaniadas { get; set; }
        public decimal CargosExtra { get; set; }
        public DateTime FechaInspeccion { get; set; }
        public bool PasaInspeccion { get; set; }
    }
}
