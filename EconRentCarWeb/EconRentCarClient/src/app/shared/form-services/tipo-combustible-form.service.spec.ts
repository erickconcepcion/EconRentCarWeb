/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoCombustibleFormService } from './tipo-combustible-form.service';

describe('Service: TipoCombustibleForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoCombustibleFormService]
    });
  });

  it('should ...', inject([TipoCombustibleFormService], (service: TipoCombustibleFormService) => {
    expect(service).toBeTruthy();
  }));
});
