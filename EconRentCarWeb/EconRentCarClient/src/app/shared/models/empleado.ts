import { BaseData } from '../dynamic-crud/models';

export class Empleado implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
}
/**
 * public Guid Id { get; set; }
        [Required]
        public string Nombres { get; set; }
        [Required]
        public string Apellidos { get; set; }
        [Required]
        public string CedulaEmpleado { get; set; }
        [Required]
        public TandaLaboral TandaLaboral { get; set; }
        [Required]
        [DataType("money")]
        public decimal PorcentajeComision { get; set; }
        [Required]
        public DateTime FechaIngreso { get; set; }
        public bool Activo { get; set; }
        [ForeignKey("AppUsers")]
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<Renta> Rentas { get; set; }
 */
