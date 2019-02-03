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
        
        public RentaValidator()
        {
            RuleFor(x => x.Comentario)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.Comentario)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min);
            RuleFor(x => x.EstadoRenta)
               .NotEmpty()
               .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.EstadoRenta)
                .IsInEnum()
                .WithMessage(CommonValidatorMessages.MissMatch);

            RuleFor(x => x.FechaRenta)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.FechaRenta)
                .LessThanOrEqualTo(p=>p.FechaDevolucion)
                .WithMessage(CommonValidatorMessages.MissMatch);
            RuleFor(x => x.FechaDevolucion)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.FechaRenta)
                .GreaterThanOrEqualTo(p => p.FechaRenta)
                .WithMessage(CommonValidatorMessages.MissMatch);
        }
    }
}
