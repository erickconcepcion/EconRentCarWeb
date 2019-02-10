import { BaseData } from '../dynamic-crud/models';
import { Modelo } from './modelo';

export class Marca implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    Nombre = '';
    Descripcion = '';
    Activo = true;
    Modelos: Modelo;
}
