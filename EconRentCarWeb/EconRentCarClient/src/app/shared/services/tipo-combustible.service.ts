import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TipoCombustible } from '../models/tipo-combustible';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class TipoCombustibleService extends BaseService<TipoCombustible> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().TipoCombustibles);
 }

}
