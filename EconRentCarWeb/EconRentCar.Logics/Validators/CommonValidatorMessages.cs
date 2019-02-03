using System;
using System.Collections.Generic;
using System.Text;

namespace EconRentCar.Logics.Validators
{
    class CommonValidatorMessages
    {
        public static string NotEmpty = "{PropertyName} es requerido.";
        public static string Max = "{PropertyName} solo admite por debajo de {MaxLength} Caracteres.";
        public static string Min = "{PropertyName} solo admite por encima de {MinLength} Caracteres.";
        public static string MissMatch = "{PropertyName} No posee un valor valido.";
    }
}
