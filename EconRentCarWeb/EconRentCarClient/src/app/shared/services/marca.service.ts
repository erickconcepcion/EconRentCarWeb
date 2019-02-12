import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Marca } from '../models/marca';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends BaseService<Marca> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Marcas);
 }

}
