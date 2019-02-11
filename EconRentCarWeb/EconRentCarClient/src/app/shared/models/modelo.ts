import { BaseData } from '../dynamic-crud/models';
import { Marca } from './marca';
import { Vehiculo } from './vehiculo';

export class Modelo implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public Nombre = '';
    public Descripcion = '';
    public MontoPorDia = 0.00;
    public Activo = false;
    public MarcaId = '00000000-0000-0000-0000-000000000000';
    public Marca: Marca;
    public Vehiculos: Vehiculo[];
}
