/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoVehiculoFormService } from './tipo-vehiculo-form.service';

describe('Service: TipoVehiculoForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoVehiculoFormService]
    });
  });

  it('should ...', inject([TipoVehiculoFormService], (service: TipoVehiculoFormService) => {
    expect(service).toBeTruthy();
  }));
});
