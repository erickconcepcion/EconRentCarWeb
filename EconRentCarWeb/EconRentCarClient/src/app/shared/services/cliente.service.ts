import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Cliente } from '../models/cliente';
import { ConfigService } from '../utils/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {

constructor(client: HttpClient, config: ConfigService) {
  super(client, config, config.getEndpoints().Clientes);
 }

}
