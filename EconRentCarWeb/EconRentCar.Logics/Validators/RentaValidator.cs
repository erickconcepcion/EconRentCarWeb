using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class RentaValidator : AbstractValidator<Renta>
    {
        
        private RentaValidator()
        {
            RuleFor(x => x.Comentario)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Comentario)
                .MaximumLength(30)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(x => x.EstadoRenta)
               .NotEmpty()
               .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.EstadoRenta)
                .IsInEnum()
                .WithMessage("{PropertyName} No tiene un valor valido.");

            RuleFor(x => x.FechaRenta)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.FechaRenta)
                .LessThanOrEqualTo(p=>p.FechaDevolucion)
                .WithMessage("{PropertyName} No tiene un valor valido.");
            RuleFor(x => x.FechaDevolucion)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.FechaRenta)
                .GreaterThanOrEqualTo(p => p.FechaRenta)
                .WithMessage("{PropertyName} No tiene un valor valido.");
        }
    }
}
