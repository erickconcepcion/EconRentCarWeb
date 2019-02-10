/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoVehiculoService } from './tipo-vehiculo.service';

describe('Service: TipoVehiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoVehiculoService]
    });
  });

  it('should ...', inject([TipoVehiculoService], (service: TipoVehiculoService) => {
    expect(service).toBeTruthy();
  }));
});
