import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Modelo } from '../models/modelo';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends BaseService<Modelo> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Modelos);
 }

}
