import { BaseData } from '../dynamic-crud/models';
import { Renta } from './renta';

export class Inspeccion implements BaseData {
    public Id = '00000000-0000-0000-0000-000000000000';
    public RentaId = '00000000-0000-0000-0000-000000000000';
    public Renta: Renta;
    public TieneRayaduras = false;
    public GalonesCombustibles = 0.00;
    public TieneGomaRepuesta = false;
    public TieneGato = false;
    public CristalRoto = false;
    public GomasDaniadas = false;
    public CargosExtra = 0.00;
    public FechaInspeccion = new Date();
    public PasaInspeccion = true;
}
