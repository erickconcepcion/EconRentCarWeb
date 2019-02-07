import { Injectable } from '@angular/core';
import { Endpoints } from '../models/config-models';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiUri = '/api/';
  constructor() { }
  getApiUri() {
    return this._apiUri;
  }
  getEndpoints() {
    return new Endpoints();
  }
}
