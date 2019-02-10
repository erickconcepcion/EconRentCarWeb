/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehiculoFormService } from './vehiculo-form.service';

describe('Service: VehiculoForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculoFormService]
    });
  });

  it('should ...', inject([VehiculoFormService], (service: VehiculoFormService) => {
    expect(service).toBeTruthy();
  }));
});
