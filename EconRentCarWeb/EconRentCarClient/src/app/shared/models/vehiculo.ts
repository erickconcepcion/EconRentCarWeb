import { BaseData } from '../dynamic-crud/models';
import { EstadoVehiculo } from './enums';
import { Modelo } from './modelo';
import { TipoVehiculo } from './tipo-vehiculo';
import { TipoCombustible } from './tipo-combustible';
import { Renta } from './renta';

export class Vehiculo implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    Placa = '';
    Descripcion = '';
    NoChasis = '';
    NoMotor = '';
    EstadoVehiculo = EstadoVehiculo.Nuevo;
    ModeloId = '00000000-0000-0000-0000-000000000000';
    Modelo: Modelo;
    TipoVehiculoId = '00000000-0000-0000-0000-000000000000';
    TipoVehiculo: TipoVehiculo;
    TipoCombustibleId = '00000000-0000-0000-0000-000000000000';
    TipoCombustible: TipoCombustible;
    Rentas: Renta[];
}
