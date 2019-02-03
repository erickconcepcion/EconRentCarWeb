import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiUri = '';
  constructor() { }
  getApiUri() {
    return this._apiUri;
  }
}
