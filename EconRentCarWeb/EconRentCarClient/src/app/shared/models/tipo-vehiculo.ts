import { BaseData } from '../dynamic-crud/models';
import { Vehiculo } from './vehiculo';

export class TipoVehiculo implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    Nombre = '';
    Descripcion = '';
    Activo = false;
    Vehiculos: Vehiculo[];
}
