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
    public class Vehiculo: IEntityBase
    {
        public Vehiculo()
        {
            Rentas = new HashSet<Renta>();
        }
        public Guid Id { get; set; }
        [Required]
        public string Placa { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string NoChasis { get; set; }
        [Required]
        public string NoMotor { get; set; }
        [Required]
        public EstadoVehiculo EstadoVehiculo { get; set; }
        public int ModeloId { get; set; }
        public virtual Modelo Modelo { get; set; }
        public int TipoVehiculoId { get; set; }
        public virtual TipoVehiculo TipoVehiculo { get; set; }
        public int TipoCombustibleId { get; set; }
        public virtual TipoCombustible TipoCombustible { get; set; }

        public virtual ICollection<Renta> Rentas { get; set; }

    }
}
