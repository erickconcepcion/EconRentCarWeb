import { BaseData } from '../dynamic-crud/models';
import { TandaLaboral } from './enums';
import { Renta } from './renta';

export class Empleado implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public Nombres = '';
    public Apellidos = '';
    public CedulaEmpleado = '';
    public TandaLaboral = TandaLaboral.Matutino;
    public PorcentajeComision = 0.00;
    public FechaIngreso = new Date();
    public AppUserId = '';
    public Rentas: Renta[];
}
