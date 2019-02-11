import { BaseData } from '../dynamic-crud/models';
import { EstadoVehiculo } from './enums';
import { Modelo } from './modelo';
import { TipoVehiculo } from './tipo-vehiculo';
import { TipoCombustible } from './tipo-combustible';
import { Renta } from './renta';

export class Vehiculo implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public Placa = '';
    public Descripcion = '';
    public NoChasis = '';
    public NoMotor = '';
    public EstadoVehiculo = EstadoVehiculo.Nuevo;
    public ModeloId = '00000000-0000-0000-0000-000000000000';
    public Modelo: Modelo;
    public TipoVehiculoId = '00000000-0000-0000-0000-000000000000';
    public TipoVehiculo: TipoVehiculo;
    public TipoCombustibleId = '00000000-0000-0000-0000-000000000000';
    public TipoCombustible: TipoCombustible;
    public Rentas: Renta[];
}
