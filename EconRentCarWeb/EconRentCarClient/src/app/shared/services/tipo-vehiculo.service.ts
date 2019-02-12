import { Injectable } from '@angular/core';
import { TipoVehiculo } from '../models/tipo-vehiculo';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService extends BaseService<TipoVehiculo> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().TipoVehiculos);
 }

}
