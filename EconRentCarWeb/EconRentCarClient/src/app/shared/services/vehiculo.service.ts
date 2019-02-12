import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Vehiculo } from '../models/vehiculo';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService extends BaseService<Vehiculo> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Vehiculos);
 }

}
