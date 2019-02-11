import { BaseData } from '../dynamic-crud/models';
import { EstadoRenta } from './enums';
import { Vehiculo } from './vehiculo';
import { Empleado } from './empleado';
import { Cliente } from './cliente';
import { Inspeccion } from './inspeccion';

export class Renta implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public FechaRenta = new Date();
    public FechaDevolucion = new Date();
    public Comentario = '';
    public EstadoRenta = EstadoRenta.Estacionado;
    public VehiculoId = '00000000-0000-0000-0000-000000000000';
    public Vehiculo: Vehiculo;
    public EmpleadoId = '00000000-0000-0000-0000-000000000000';
    public Empleado: Empleado;
    public ClienteId = '00000000-0000-0000-0000-000000000000';
    public Cliente: Cliente;
    public Inspecciones: Inspeccion[];
}
