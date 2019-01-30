using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.ViewModels
{
    public class ModeloVm : IViewModel
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal MontoPorDia { get; set; }
        public bool Activo { get; set; }
        public int MarcaId { get; set; }
        public virtual MarcaRefVm Marca { get; set; }
        public virtual ICollection<VehiculoVm> Vehiculos { get; set; }
    }
}
