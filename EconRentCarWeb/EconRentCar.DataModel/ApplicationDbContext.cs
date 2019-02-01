using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EconRentCar.DataModel
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TipoCombustible> TipoCombustibles { get; set; }
        public virtual DbSet<TipoVehiculo> TipoVehiculos { get; set; }
        public virtual DbSet<Marca> Marcas { get; set; }
        public virtual DbSet<Empleado> Empleados { get; set; }
        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Modelo> Modelos { get; set; }
        public virtual DbSet<Renta> Rentas { get; set; }
        public virtual DbSet<Inspeccion> Inspeccions { get; set; }
        public virtual DbSet<Vehiculo> Vehiculos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<TipoCombustible>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<TipoVehiculo>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Marca>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Empleado>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Cliente>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Modelo>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Renta>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Inspeccion>().Property(prop => prop.Id).ValueGeneratedOnAdd();
            builder.Entity<Vehiculo>().Property(prop => prop.Id).ValueGeneratedOnAdd();
        }
    }
}
