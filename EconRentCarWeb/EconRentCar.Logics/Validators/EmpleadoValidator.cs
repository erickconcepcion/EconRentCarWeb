using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class EmpleadoValidator : AbstractValidator<Empleado>
    {

        public EmpleadoValidator()
        {
            RuleFor(x => x.Nombres)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.Nombres)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min);

            RuleFor(x => x.Apellidos)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.Apellidos)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(7)
                .WithMessage(CommonValidatorMessages.Min);

            RuleFor(x => x.CedulaEmpleado)
                .NotEmpty().WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.CedulaEmpleado)
                .MaximumLength(13)
                .WithMessage(CommonValidatorMessages.Max)
                .MinimumLength(13)
                .WithMessage(CommonValidatorMessages.Min);
            RuleFor(p => p.CedulaEmpleado)
                .Matches(@"\d{3}-\d{7}-\d{1}")
                .WithMessage(CommonValidatorMessages.MissMatch);
            RuleFor(x => x.TandaLaboral)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.TandaLaboral)
                .IsInEnum()
                .WithMessage(CommonValidatorMessages.MissMatch);

            RuleFor(x => x.FechaIngreso)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty);
            RuleFor(p => p.FechaIngreso)
                .GreaterThanOrEqualTo(DateTime.Today)
                .WithMessage(CommonValidatorMessages.MissMatch);

        }
    }
}
