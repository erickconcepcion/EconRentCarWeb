using EconRentCar.Core;
using EconRentCar.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Services
{
    public interface IAppUserService : IEntityBaseService<AppUser>
    {
    }
    public interface IClienteService : IEntityBaseService<Cliente>
    {
    }
    public interface IEmpleadoService : IEntityBaseService<Empleado>
    {
    }
    public interface IInspeccionService : IEntityBaseService<Inspeccion>
    {
    }
    public interface IMarcaService : IEntityBaseService<Marca>
    {
    }
    public interface IModeloService : IEntityBaseService<Modelo>
    {
    }
    public interface IRentaService : IEntityBaseService<Renta>
    {
    }
    public interface ITipoCombustibleService : IEntityBaseService<TipoCombustible>
    {
    }
    public interface ITipoVehiculoService : IEntityBaseService<TipoVehiculo>
    {
    }
    public interface IVehiculoService : IEntityBaseService<Vehiculo>
    {
    }
}
