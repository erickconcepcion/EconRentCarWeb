import { TipoPersona } from './enums';
import { Renta } from './renta';
import { BaseData } from '../dynamic-crud/models';

export class Cliente implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public Nombres = '';
    public Apellidos = '';
    public CedulaCliente = '';
    public NoTArjetaCredito = '';
    public LimiteCredito = 0.00;
    public TipoPersona = TipoPersona.Persona;
    public Activo = true;
    public Rentas: Renta[];
}
