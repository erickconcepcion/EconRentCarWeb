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
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max);
            RuleFor(x => x.Apellidos)
            .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .MinimumLength(2)
                .WithMessage(CommonValidatorMessages.Min)
                .MaximumLength(30)
                .WithMessage(CommonValidatorMessages.Max);

             RuleFor(p => p.CedulaCliente)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .MinimumLength(13)
                .WithMessage(CommonValidatorMessages.Min)
                .MaximumLength(13)
                .WithMessage(CommonValidatorMessages.Max)
                .Matches(@"\d{3}-\d{7}-\d{1}")
                .WithMessage(CommonValidatorMessages.MissMatch);

            RuleFor(x => x.NoTArjetaCredito)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .MinimumLength(19)
                .WithMessage(CommonValidatorMessages.Min)
                .MaximumLength(19)
                .WithMessage(CommonValidatorMessages.Max)
                .Matches(@"\d{3}-\d{7}-\d{1}")
                .WithMessage(CommonValidatorMessages.MissMatch)           
                .Matches(@"\d{4}-\d{4}-\d{4}-\d{4}")
                .WithMessage(CommonValidatorMessages.MissMatch);

            RuleFor(x => x.TipoPersona)
                .NotEmpty()
                .WithMessage(CommonValidatorMessages.NotEmpty)
                .IsInEnum()
                .WithMessage(CommonValidatorMessages.MissMatch);


        }
    }
}
