import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends BaseService<Empleado> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Empleados);
 }

}
