using EconRentCar.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.ViewModels
{
    public class ModeloRefVm : IViewModel
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal MontoPorDia { get; set; }
        public bool Activo { get; set; }
        public Guid MarcaId { get; set; }
        public virtual MarcaRefVm Marca { get; set; }
    }
}
