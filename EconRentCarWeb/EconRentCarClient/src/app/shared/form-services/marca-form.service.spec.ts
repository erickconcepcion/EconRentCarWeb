/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarcaFormService } from './marca-form.service';

describe('Service: MarcaForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarcaFormService]
    });
  });

  it('should ...', inject([MarcaFormService], (service: MarcaFormService) => {
    expect(service).toBeTruthy();
  }));
});
