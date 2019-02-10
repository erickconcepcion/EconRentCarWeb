/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpleadoService } from './empleado.service';

describe('Service: Empleado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoService]
    });
  });

  it('should ...', inject([EmpleadoService], (service: EmpleadoService) => {
    expect(service).toBeTruthy();
  }));
});
