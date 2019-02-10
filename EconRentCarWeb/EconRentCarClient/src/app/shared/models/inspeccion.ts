import { BaseData } from '../dynamic-crud/models';
import { Renta } from './renta';

export class Inspeccion implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    RentaId = '00000000-0000-0000-0000-000000000000';
    Renta: Renta;
    TieneRayaduras = false;
    GalonesCombustibles = 0.00;
    TieneGomaRepuesta = false;
    TieneGato = false;
    CristalRoto = false;
    GomasDaniadas = false;
    CargosExtra = 0.00;
    FechaInspeccion = Date.now();
    PasaInspeccion = true;
}
