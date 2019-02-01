using EconRentCar.DataModel;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Validators
{
    public class ClienteValidator: AbstractValidator<Cliente>
    {
        
        public ClienteValidator()
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
                .MinimumLength(3)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");

            RuleFor(x => x.CedulaCliente)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.CedulaCliente)
                .MaximumLength(13)
                .MinimumLength(13)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.CedulaCliente)
                .Matches(@"\d{3}-\d{7}-\d{1}")
                .WithMessage("{PropertyName} No posee un valor valido.");
            RuleFor(x => x.NoTArjetaCredito)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.NoTArjetaCredito)
                .MaximumLength(19)
                .MinimumLength(19)
                .WithMessage("{PropertyName} solo de {MinLength} a {MaxLength} Caracteres Permitidos.");
            RuleFor(p => p.NoTArjetaCredito)
                .Matches(@"\d{4}-\d{4}-\d{4}-\d{4}")
                .WithMessage("{PropertyName} No posee un valor valido.");

            RuleFor(x => x.TipoPersona)
                .NotEmpty()
                .WithMessage("{PropertyName} es requerido.");
            RuleFor(p => p.TipoPersona)
                .IsInEnum()
                .WithMessage("{PropertyName} No tiene un valor valido.");


        }
    }
}
