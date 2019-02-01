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
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Nombres)
                .MaximumLength(30)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");

            RuleFor(x => x.Apellidos)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Apellidos)
                .MaximumLength(30)
                .MinimumLength(7)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");

            RuleFor(x => x.CedulaEmpleado)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.CedulaEmpleado)
                .MaximumLength(13)
                .MinimumLength(13)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.CedulaEmpleado)
                .Matches(@"\d{3}-\d{7}-\d{1}")
                .WithMessage("{PropertyName} No posee un valor valido.");
            RuleFor(x => x.TandaLaboral)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.TandaLaboral)
                .IsInEnum()
                .WithMessage("{PropertyName} No tiene un valor valido.");

            RuleFor(x => x.FechaIngreso)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.FechaIngreso)
                .GreaterThanOrEqualTo(DateTime.Today)
                .WithMessage("{PropertyName} No tiene un valor valido.");

        }
    }
}
