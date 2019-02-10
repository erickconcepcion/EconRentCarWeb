/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspeccionFormService } from './inspeccion-form.service';

describe('Service: InspeccionForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspeccionFormService]
    });
  });

  it('should ...', inject([InspeccionFormService], (service: InspeccionFormService) => {
    expect(service).toBeTruthy();
  }));
});
