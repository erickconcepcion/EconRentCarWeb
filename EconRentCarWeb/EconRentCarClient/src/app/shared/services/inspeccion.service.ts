import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inspeccion } from '../models/inspeccion';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService extends BaseService<Inspeccion> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Inspecciones);
 }

}
