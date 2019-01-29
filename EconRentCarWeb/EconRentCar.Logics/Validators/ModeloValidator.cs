using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class ModeloValidator : AbstractValidator<Modelo>
    {
        
        private ModeloValidator()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");

            RuleFor(p => p.Nombre)
                .MaximumLength(30)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.Descripcion)
                .MaximumLength(500)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
        }
    }
}
