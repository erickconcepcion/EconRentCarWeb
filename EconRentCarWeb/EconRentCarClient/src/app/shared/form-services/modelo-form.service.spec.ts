/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModeloFormService } from './modelo-form.service';

describe('Service: ModeloForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeloFormService]
    });
  });

  it('should ...', inject([ModeloFormService], (service: ModeloFormService) => {
    expect(service).toBeTruthy();
  }));
});
