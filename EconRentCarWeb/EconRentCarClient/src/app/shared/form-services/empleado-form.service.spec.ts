/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpleadoFormService } from './empleado-form.service';

describe('Service: EmpleadoForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoFormService]
    });
  });

  it('should ...', inject([EmpleadoFormService], (service: EmpleadoFormService) => {
    expect(service).toBeTruthy();
  }));
});
