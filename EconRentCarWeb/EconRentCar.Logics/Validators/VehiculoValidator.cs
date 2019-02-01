using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class VehiculoValidator : AbstractValidator<Vehiculo>
    {

        public VehiculoValidator()
        {
            RuleFor(x => x.Placa)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Placa)
                .MaximumLength(7)
                .MinimumLength(7)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.Placa)
                .Matches(@"[A-Z]{1}\d{6}")
                .WithMessage("{PropertyName} Debe empezar por una letra seguido a 6 digitos.");

            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.Descripcion)
                .MaximumLength(500)
                .MinimumLength(2)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");

            RuleFor(x => x.NoChasis)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.NoChasis)
                .MaximumLength(7)
                .MinimumLength(7)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.NoChasis)
                .Matches(@"\d{7}")
                .WithMessage("{PropertyName} de ser solo numeros.");

            RuleFor(x => x.NoMotor)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.NoMotor)
                .MaximumLength(7)
                .MinimumLength(7)
                .WithMessage("{PropertyName} solo {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.NoMotor)
                .Matches(@"\d{7}")
                .WithMessage("{PropertyName} de ser solo numeros.");

        }
    }
}
