using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class TipoCombustibleValidator : AbstractValidator<TipoCombustible>
    {
        
        private TipoCombustibleValidator()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Nombre)
                .MaximumLength(50)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");

        }
    }
}
