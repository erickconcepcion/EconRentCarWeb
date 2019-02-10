/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentaFormService } from './renta-form.service';

describe('Service: RentaForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentaFormService]
    });
  });

  it('should ...', inject([RentaFormService], (service: RentaFormService) => {
    expect(service).toBeTruthy();
  }));
});
