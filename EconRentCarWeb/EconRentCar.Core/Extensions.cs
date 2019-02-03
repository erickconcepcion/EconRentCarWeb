using LinqKit;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;

namespace EconRentCar.Core
{
    public static class Extension
    {
        
        public static void AddErrorFromResult(this ModelStateDictionary modelState, IEnumerable<KeyValuePair<string, string>> errors)
        {
            foreach (var item in errors)
            {
                modelState.AddModelError(item.Key, item.Value);
            }
        }

        public static string ToPascalCase(this string str)
        {
            // Replace all non-letter and non-digits with an underscore and lowercase the rest.
            var sample = string.Join("",
                str?.Select(c => char.IsLetterOrDigit(c) ? c.ToString().ToLower() : "_").ToArray());

            // Split the resulting string by underscore
            // Select first character, uppercase it and concatenate with the rest of the string
            var arr = sample?
                .Split(new[] { '_' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => $"{s.Substring(0, 1).ToUpper()}{s.Substring(1)}");

            // Join the resulting collection
            sample = string.Join("", arr);

            return sample;
        }



        public static Expression<Func<T, bool>> AsPredicate<T>(this string filterString, AndOrOperator andOrOperator = AndOrOperator.Or) where T : IEntityBase
        {
            var predicate = PredicateBuilder.New<T>();
            var param = Expression.Parameter(typeof(T), "x");
            var list = new List<Expression>();
            var queryparts = filterString.Split('|');
            //
            //   MethodInfo StringContainsMethod = typeof(string).GetMethod(@"Contains");

            foreach (var part in queryparts)
            {
                var elements = part.Trim().Split(' ');
                //
                var propertie = elements[0];
                var value = elements[2];
                #region PendingForRemove
                //var propertyAccessExpr = Expression.PropertyOrField(param, propertie);
                //Expression valueExpr;

                //try
                //{
                //    valueExpr = ToExprConstant(propertyAccessExpr.Type, value);
                //}
                //catch
                //{
                //    continue;

                //}

                //if (propertyAccessExpr.Type == typeof(string) ||)
                //{
                //    var currentMethodInfo = StringContainsMethod;
                //    var body = Expression.Call(propertyAccessExpr, currentMethodInfo, valueExpr);
                //    _list.Add(body);
                //}
                //else if (propertyAccessExpr.Type == typeof(Guid) || propertyAccessExpr.Type == typeof(bool))
                //{
                //    var expr = Expression.Equal(propertyAccessExpr, valueExpr);
                //    _list.Add(expr);
                //}
                //else
                //{
                //var expreTest = Test.ToExpression2<T>(param, propertie, elements[1], value);
                //if (expreTest != null)
                //    _list.Add(expreTest);
                //}

                #endregion

                var expreTest = Test.ToExpression2<T>(param, propertie, elements[1], value);
                if (expreTest != null)
                    list.Add(expreTest);

            }

            if (list.Count <= 0) return predicate;
            var tmp = list.Aggregate((expression, expression1) => andOrOperator == AndOrOperator.Or
                ? Expression.Or(expression, expression1)
                : Expression.And(expression, expression1));
            predicate.And(Expression.Lambda<Func<T, bool>>(tmp, param));

            return predicate;

        }
        

        public static IOrderedQueryable<T> GetOrderBy<T>(this IQueryable<T> source, string value)
        {
            var property = value.Split()[0];
            var order = value.Split()[1];
            //
            return order == "asc"
                ? OrderBy(source, property)
                : OrderByDescending(source, property);
        }

        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "OrderBy");
        }

        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "OrderByDescending");
        }

        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "ThenBy");
        }

        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder(source, property, "ThenByDescending");
        }

        private static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            var props = property.Split('.');
            var type = typeof(T);
            var arg = Expression.Parameter(type, "x");
            Expression expr = arg;
            foreach (var prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ
                var pi = type.GetProperties().FirstOrDefault(t => t.Name.ToLower() == prop.ToLower());

                //PropertyInfo pi = type.GetProperty(prop.ToPascalCase());
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            var delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            var lambda = Expression.Lambda(delegateType, expr, arg);

            var result = typeof(Queryable).GetMethods().Single(
                    method => (method.Name == methodName)
                              && method.IsGenericMethodDefinition
                              && (method.GetGenericArguments().Length == 2)
                              && (method.GetParameters().Length == 2))
                .MakeGenericMethod(typeof(T), type)
                .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable<T>)result;
        }

        public static Expression ToExprConstant(Type prop, string value)
        {
            if (String.IsNullOrEmpty(value))
                return Expression.Constant(value);
            object val = null;
            switch (prop.FullName)
            {
                case "System.Guid":
                    val = Guid.Parse(value);
                    break;
                default:
                    val = To(value, Type.GetType(prop.FullName));// Convert.ChangeType(value, Type.GetType(prop.FullName));
                    break;
            }
            return Expression.Constant(val);
        }

        /// <summary>
        ///     Converts a value to a destination type.
        /// </summary>
        /// <param name="value">The value to convert.</param>
        /// <param name="destinationType">The type to convert the value to.</param>
        /// <returns>The converted value.</returns>
        public static object To(object value, Type destinationType)
        {
            return To(value, destinationType, CultureInfo.InvariantCulture);
        }

        /// <summary>
        ///     Converts a value to a destination type.
        /// </summary>
        /// <param name="value">The value to convert.</param>
        /// <param name="destinationType">The type to convert the value to.</param>
        /// <param name="culture">Culture</param>
        /// <returns>The converted value.</returns>
        public static object To(object value, Type destinationType, CultureInfo culture)

        {
            if (value != null)
            {
                var sourceType = value.GetType();

                var destinationConverter = GetNopCustomTypeConverter(destinationType);

                var sourceConverter = GetNopCustomTypeConverter(sourceType);

                if ((destinationConverter != null) && destinationConverter.CanConvertFrom(value.GetType()))

                    return destinationConverter.ConvertFrom(null, culture, value);

                if ((sourceConverter != null) && sourceConverter.CanConvertTo(destinationType))

                    return sourceConverter.ConvertTo(null, culture, value, destinationType);

                if (destinationType.IsEnum && value is int)

                    return Enum.ToObject(destinationType, (int)value);

                if (!destinationType.IsInstanceOfType(value))

                    return Convert.ChangeType(value, destinationType, culture);
            }

            return value;
        }

        public static TypeConverter GetNopCustomTypeConverter(Type type)
        {
            return TypeDescriptor.GetConverter(type);
        }

    }
    public static class Test
    {

        public static Expression<Func<T, bool>> ToExpression<T>(string andOrOperator, string propName, string opr, string value, Expression<Func<T, bool>> expr = null)
        {
            Expression<Func<T, bool>> func = null;
            try
            {
                ParameterExpression paramExpr = Expression.Parameter(typeof(T), "x");
                var arrProp = propName.Split('.').ToList();
                Expression binExpr = null;
                string partName = string.Empty;
                arrProp.ForEach(x =>
                {
                    Expression tempExpr = null;
                    partName = String.IsNullOrEmpty(partName) ? x : partName + "." + x;
                    if (partName == propName)
                    {
                        var member = NestedExprProp(paramExpr, partName);
                        var type = member.Type.Name == "Nullable`1" ? Nullable.GetUnderlyingType(member.Type) : member.Type;
                        if (type == typeof(bool))
                        {
                            opr = "=";
                        }
                        tempExpr = ApplyFilter(opr, member, Expression.Convert(Extension.ToExprConstant(type, value), member.Type));
                    }
                    else
                        tempExpr = ApplyFilter("!=", NestedExprProp(paramExpr, partName), Expression.Constant(null));
                    if (binExpr != null)
                        binExpr = Expression.AndAlso(binExpr, tempExpr);
                    else
                        binExpr = tempExpr;
                });
                // Expression<Func<T, bool>> innerExpr = Expression.Lambda<Func<T, bool>>(binExpr, paramExpr);
                Expression<Func<T, bool>> innerExpr = Expression.Lambda<Func<T, bool>>(binExpr, paramExpr);
                if (expr != null)
                    innerExpr = (String.IsNullOrEmpty(andOrOperator) || andOrOperator == "And" || andOrOperator == "AND" || andOrOperator == "&&") ? innerExpr.And(expr) : innerExpr.Or(expr);
                func = innerExpr;
            }
            catch { }
            return func;
        }

        public static Expression ToExpression2<T>(ParameterExpression paramExpr, string propName, string opr, string value)
        {
            Expression func = null;
            try
            {
                var arrProp = propName.Split('.').ToList();
                Expression binExpr = null;
                string partName = string.Empty;
                arrProp.ForEach(x =>
                {
                    Expression tempExpr = null;
                    partName = String.IsNullOrEmpty(partName) ? x : partName + "." + x;
                    if (partName == propName)
                    {
                        var member = NestedExprProp(paramExpr, partName);
                        var type = member.Type.Name == "Nullable`1" ? Nullable.GetUnderlyingType(member.Type) : member.Type;
                        if (opr == "contains" && (type == typeof(bool) || type == typeof(int) || (type == typeof(Guid))))
                        {
                            opr = "=";
                        }
                        tempExpr = ApplyFilter(opr, member, Expression.Convert(Extension.ToExprConstant(type, value), member.Type));
                    }
                    else
                        tempExpr = ApplyFilter("!=", NestedExprProp(paramExpr, partName), Expression.Constant(null));
                    binExpr = binExpr != null ? Expression.AndAlso(binExpr, tempExpr) : tempExpr;
                });
                return binExpr;
                //Expression<Func<T, bool>> innerExpr = Expression.Lambda<Func<T, bool>>(binExpr, paramExpr);
                //if (expr != null)
                //    innerExpr = (String.IsNullOrEmpty(andOrOperator) || andOrOperator == "And" || andOrOperator == "AND" || andOrOperator == "&&") ? innerExpr.And(expr) : innerExpr.Or(expr);
                //func = innerExpr;
            }
            catch { }
            return func;
        }
        private static Expression ApplyFilter(string opr, Expression left, Expression right)
        {
            Expression InnerLambda = null;
            switch (opr)
            {
                case "==":
                case "=":
                case "equals":
                    InnerLambda = Expression.Equal(left, right);
                    break;
                case "<":
                    InnerLambda = Expression.LessThan(left, right);
                    break;
                case ">":
                    InnerLambda = Expression.GreaterThan(left, right);
                    break;
                case ">=":
                    InnerLambda = Expression.GreaterThanOrEqual(left, right);
                    break;
                case "<=":
                    InnerLambda = Expression.LessThanOrEqual(left, right);
                    break;
                case "!=":
                    InnerLambda = Expression.NotEqual(left, right);
                    break;
                case "&&":
                    InnerLambda = Expression.And(left, right);
                    break;
                case "||":
                    InnerLambda = Expression.Or(left, right);
                    break;
                case "LIKE":
                case "Contains":
                case "contains":
                    InnerLambda = Expression.Call(left, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), right);
                    break;
                case "NOTLIKE":
                    InnerLambda = Expression.Not(Expression.Call(left, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), right));
                    break;
            }
            return InnerLambda;
        }

        public static Expression<Func<T, object>> PropExpr<T>(string PropName)
        {
            ParameterExpression paramExpr = Expression.Parameter(typeof(T));
            var tempExpr = NestedExprProp(paramExpr, PropName);
            return Expression.Lambda<Func<T, object>>(Expression.Convert(Expression.Lambda(tempExpr, paramExpr).Body, typeof(object)), paramExpr);

        }

        public static Expression<Func<T, TResult>> And<T, TResult>(this Expression<Func<T, TResult>> expr1, Expression<Func<T, TResult>> expr2)
        {
            var invokedExpr = Expression.Invoke(expr2, expr1.Parameters.Cast<Expression>());
            return Expression.Lambda<Func<T, TResult>>(Expression.AndAlso(expr1.Body, invokedExpr), expr1.Parameters);
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
        {
            var invokedExpr = Expression.Invoke(expr2, expr1.Parameters.Cast<Expression>());
            return Expression.Lambda<Func<T, bool>>(Expression.OrElse(expr1.Body, invokedExpr), expr1.Parameters);
        }

        private static MemberExpression NestedExprProp(Expression expr, string propName)
        {
            string[] arrProp = propName.Split('.');
            int arrPropCount = arrProp.Length;
            return (arrPropCount > 1) ? Expression.Property(NestedExprProp(expr, arrProp.Take(arrPropCount - 1).Aggregate((a, i) => a + "." + i)), arrProp[arrPropCount - 1]) : Expression.Property(expr, propName);
        }

        #region Date Funcions

        public static DateTime LastDayOfMonth(this DateTime date)
        {
            return date.AddDays(1 - (date.Day)).AddMonths(1).AddDays(-1);
        }



        public static DateTime ConvertToSafeDateTime(this string data, CultureInfo info = null)
        {
            DateTime result;

            var culture = info ?? new CultureInfo("en-US");
            DateTime.TryParse(data, culture, DateTimeStyles.NoCurrentDateDefault, out result);

            return result;
        }
        public static DateTime ConvertToSafeDateTimeEs(this string data)
        {
            var result = StringToDateFieldEs(data) as DateTime?;
            return result ?? new DateTime(1900, 1, 1);
        }

        public static DateTime ConvertToSafeDateTime2(this string data, CultureInfo info = null)
        {
            var result = StringToDateField(data) as DateTime?;

            return result ?? new DateTime(1900, 1, 1);
        }

        public static DateTime ConvertToSafeDateTimeWithFormat(this string data, string format = "MMddyyyy",
                                                     CultureInfo info = null)
        {
            return DateTime.ParseExact(data, format, info ?? CultureInfo.InvariantCulture);
        }

        public static DateTime? ConvertToSafeNullableDateTime(this string data, CultureInfo info = null)
        {
            DateTime result;

            var culture = info ?? new CultureInfo("en-US", true);
            if (DateTime.TryParse(data, culture, DateTimeStyles.AssumeLocal, out result))
                return result;

            return null;
        }
        public static DateTime? ConvertToSafeNullableDateTimeEs(this string data, CultureInfo info = null)
        {
            return StringToDateFieldEs(data) as DateTime?;

        }

        public static DateTime? ConvertToSafeNullableDateTime2(this string data, CultureInfo info = null)
        {
            try
            {
                var result = StringToDateField(data) as DateTime?;
                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static object StringToDateField(string @from)
        {
            if (@from == null)
                return null;
            //
            @from = @from.Trim();
            DateTime dt;

            if (DateTime.TryParseExact(@from, "MM.dd.yyyy", null, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "MM dd yyyy", null, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "M/d/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParse(@from, CultureInfo.GetCultureInfo("en-US"), DateTimeStyles.None, out dt))
                return dt;
            //
            double days;
            if (Double.TryParse(@from, out days))
                return DateTime.FromOADate(days);

            throw new ArgumentException("can not make a date from " + @from, "from");
        }


        public static object StringToDateFieldEs(string @from)
        {
            if (@from == null)
                return null;
            //
            @from = @from.Trim();
            DateTime dt;

            #region Espanol
            if (DateTime.TryParseExact(@from, "dd.MM.yyyy", null, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "dd MM yyyy", null, DateTimeStyles.None, out dt))
                return dt;

            if (DateTime.TryParseExact(@from, "d/M/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
                return dt;

            #endregion

            if (DateTime.TryParse(@from, CultureInfo.GetCultureInfo("es-DO"), DateTimeStyles.None, out dt))
                return dt;
            //
            double days;
            if (Double.TryParse(@from, out days))
                return DateTime.FromOADate(days);

            throw new ArgumentException("can not make a date from " + @from, "from");
        }


        #endregion



        #region Int Functions

        public static int ConvertToSafeInt(this string data)
        {
            int result;
            Int32.TryParse(data, out result);
            return result;
        }

        public static int? ConvertToSafeNullableInt(this string data)
        {
            if (data != null)
            {
                int result;
                if (Int32.TryParse(data, out result))
                    return result;
            }

            return null;

        }

        #endregion

        #region bool Functions


        public static bool ConvertToSafeBoolean(this string data)
        {
            bool result;
            bool.TryParse(data, out result);
            return result;
        }

        public static bool? ConvertToSafeNullableBoolean(this string data)
        {
            if (data == null) return null;
            bool result;
            if (bool.TryParse(data, out result))
                return result;

            return null;

        }
        #endregion

        #region Decimal Functions

        public static decimal? ConvertToSafeDecimalToMiliseconds(this Decimal? data)
        {
            if (data.HasValue)
                return data.GetValueOrDefault() * 86400000;
            return null;
        }

        public static decimal ConvertToDecimalToMiliseconds(this Decimal data)
        {
            return data * 86400000;
        }

        public static decimal? ConvertToSafeNullableDecimal(this string data)
        {
            decimal result;
            if (Decimal.TryParse(data, out result))
                return result;

            return null;
        }

        public static decimal ConvertToSafeDecimal(this string data)
        {
            decimal result;
            Decimal.TryParse(data, out result);
            return result;
        }
        #endregion

        #region Strings Functions

        private static readonly Regex ProperNameRx = new Regex(@"\b(\w+)\b");
        private static readonly string[] Prefixes = { "mc" };

        public static string RemoveLineBreaks(this string lines)
        {
            return lines.Replace("\r", "").Replace("\n", "");
        }

        public static string ReplaceLineBreaks(this string lines, string replacement)
        {
            return lines.Replace("\r\n", replacement)
                        .Replace("\r", replacement)
                        .Replace("\n", replacement);
        }

        public static string RemoveSpaces(this string value)
        {
            return Regex.Replace(value, @"\s", "");
        }

        public static string RemoveSpacesLowerTrim(this string value)
        {
            return value.ToLower().Trim().RemoveSpaces();
        }

        public static string RemoveSpacesUppeTrim(this string value)
        {
            return value.ToUpper().Trim().RemoveSpaces();
        }

        public static String ToUpperTrimmed(this string data)
        {
            return data.ToUpperInvariant().Trim();
        }


        public static string TrimmingAllBetweenTwoWords(this string data)
        {
            var result = Regex.Replace(data, @"\s+", " ");
            return result;
        }


        public static string ConvertToSafeCodSubSegmento(this string data)
        {
            if (string.IsNullOrEmpty(data))
                return null;

            var result = data.Split('-');

            return result[0].Trim();
        }

        public static string ConvertToSafeTarjeta(this string data, string[] strSuffix = null,
            string[] codCanales = null,
            string[] codLocalidad = null)
        {
            if (string.IsNullOrEmpty(data))
                return null;

            var tarjeta = data.TrimStart('0');

            codCanales = codCanales ?? new string[0];
            codLocalidad = codLocalidad ?? new string[0];

            if (strSuffix == null || strSuffix.Length <= 0) return tarjeta;
            tarjeta = strSuffix.Aggregate(tarjeta, (current, tarjetaSuffix) => current.Replace(tarjetaSuffix, ""));

            tarjeta = codCanales.Aggregate(tarjeta, (current, codCanal) => current.Replace(codCanal, ""));

            tarjeta = codLocalidad.Aggregate(tarjeta, (current, tarjetaSuffix) => current.Replace(tarjetaSuffix, ""));

            return tarjeta;
        }



        public static string ToProperCase(this string original)
        {

            if (string.IsNullOrEmpty(original))
                return original;

            string result = ProperNameRx.Replace(original.ToLower(CultureInfo.CurrentCulture), HandleWord);
            return result;
        }

        private static string HandleWord(Match m)
        {
            string word = m.Groups[1].Value;

            foreach (string prefix in Prefixes)
            {
                if (word.StartsWith(prefix, StringComparison.CurrentCultureIgnoreCase))
                    return prefix.WordToProperCase() + word.Substring(prefix.Length).WordToProperCase();
            }

            return word.WordToProperCase();
        }

        public static string WordToProperCase(this string word)
        {
            if (string.IsNullOrEmpty(word))
                return word;

            if (word.Length > 1)
                return Char.ToUpper(word[0], CultureInfo.CurrentCulture) + word.Substring(1);

            return word.ToUpper(CultureInfo.CurrentCulture);
        }

        public static string ProperCaseWithSpaces(this string value)
        {
            return string.Concat(value.WordToProperCase().Select(x => Char.IsUpper(x) ? " " + x : x.ToString(CultureInfo.InvariantCulture))).TrimStart(' ');
        }

        #endregion


        public static string ReplaceIgnoreCase(this string text, string oldValue, string replaceWith)
        {
            var regex = new Regex(oldValue, RegexOptions.IgnoreCase);
            return regex.Replace(text, replaceWith);
        }

    }

}
