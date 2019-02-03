using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class TipoVehiculoValidator : AbstractValidator<TipoVehiculo>
    {

        public TipoVehiculoValidator()
        {
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.Nombre)
                .MaximumLength(50)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)

                .WithMessage(CommonValidatorMessages.Min);
            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.Descripcion)
                .MaximumLength(50)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min);

        }
    }
}
