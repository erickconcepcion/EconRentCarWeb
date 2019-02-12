import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Renta } from '../models/renta';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class RentaService extends BaseService<Renta> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Rentas);
 }

}
