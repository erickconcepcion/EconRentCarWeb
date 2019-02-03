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
        
        public TipoCombustibleValidator()
        {
            RuleFor(p => p.Nombre)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min)
                .MaximumLength(50)
                .WithMessage(CommonValidatorMessages.Max);

        }
    }
}
