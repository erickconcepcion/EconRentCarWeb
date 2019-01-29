using EconRentCar.Core;
using EconRentCar.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EconRentCar.Logics.Repositories
{
    public interface IAppUserRepository : IEntityBaseRepository<AppUser>
    {
    }
    public interface IClienteRepository : IEntityBaseRepository<Cliente>
    {
    }
    public interface IEmpleadoRepository : IEntityBaseRepository<Empleado>
    {
    }
    public interface IInspeccionRepository : IEntityBaseRepository<Inspeccion>
    {
    }
    public interface IMarcaRepository : IEntityBaseRepository<Marca>
    {
    }
    public interface IModeloRepository : IEntityBaseRepository<Modelo>
    {
    }
    public interface IRentaRepository : IEntityBaseRepository<Renta>
    {
    }
    public interface ITipoCombustibleRepository : IEntityBaseRepository<TipoCombustible>
    {
    }
    public interface ITipoVehiculoRepository : IEntityBaseRepository<TipoVehiculo>
    {
    }
    public interface IVehiculoRepository : IEntityBaseRepository<Vehiculo>
    {
    }
}
