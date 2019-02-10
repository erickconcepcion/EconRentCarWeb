import { BaseData } from '../dynamic-crud/models';
import { Marca } from './marca';
import { Vehiculo } from './vehiculo';

export class Modelo implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    Nombre = '';
    Descripcion = '';
    MontoPorDia = 0.00;
    Activo = false;
    MarcaId = '00000000-0000-0000-0000-000000000000';
    Marca: Marca;
    Vehiculos: Vehiculo[];
}
