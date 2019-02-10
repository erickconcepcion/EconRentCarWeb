/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehiculoService } from './vehiculo.service';

describe('Service: Vehiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculoService]
    });
  });

  it('should ...', inject([VehiculoService], (service: VehiculoService) => {
    expect(service).toBeTruthy();
  }));
});
