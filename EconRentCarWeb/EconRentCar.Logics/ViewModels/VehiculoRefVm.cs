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
    public class VehiculoRefVm : IViewModel
    {
        public Guid Id { get; set; }
        public string Placa { get; set; }
        public string Descripcion { get; set; }
        public string NoChasis { get; set; }
        public string NoMotor { get; set; }
        public EstadoVehiculo EstadoVehiculo { get; set; }
        public Guid ModeloId { get; set; }
        public virtual ModeloRefVm Modelo { get; set; }
        public Guid TipoVehiculoId { get; set; }
        public virtual TipoVehiculoRefVm TipoVehiculo { get; set; }
        public Guid TipoCombustibleId { get; set; }
        public virtual TipoCombustibleRefVm TipoCombustible { get; set; }
        public virtual ICollection<RentaRefVm> Rentas { get; set; }

    }
}
