import { BaseData } from '../dynamic-crud/models';
import { EstadoRenta } from './enums';
import { Vehiculo } from './vehiculo';
import { Empleado } from './empleado';
import { Cliente } from './cliente';
import { Inspeccion } from './inspeccion';

export class Renta implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    FechaRenta = Date.now();
    FechaDevolucion = Date.now();
    Comentario = '';
    EstadoRenta = EstadoRenta.Estacionado;
    VehiculoId = '00000000-0000-0000-0000-000000000000';
    Vehiculo: Vehiculo;
    EmpleadoId = '00000000-0000-0000-0000-000000000000';
    Empleado: Empleado;
    ClienteId = '00000000-0000-0000-0000-000000000000';
    Cliente: Cliente;
    Inspecciones: Inspeccion[];
}
