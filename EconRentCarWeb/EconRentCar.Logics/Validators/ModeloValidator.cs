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

        public ModeloValidator()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);

            RuleFor(p => p.Nombre)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min);
            RuleFor(p => p.Descripcion)
                .MaximumLength(500)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min);
        }
    }
}
