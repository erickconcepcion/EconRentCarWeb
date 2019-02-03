using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class InspeccionValidator : AbstractValidator<Inspeccion>
    {

        public InspeccionValidator()
        {
            RuleFor(x => x.FechaInspeccion)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.FechaInspeccion)
                .GreaterThanOrEqualTo(DateTime.Today)
                .WithMessage(CommonValidatorMessages.MissMatch);
        }
    }
}
