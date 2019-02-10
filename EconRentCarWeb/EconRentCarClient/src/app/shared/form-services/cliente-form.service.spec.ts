/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClienteFormService } from './cliente-form.service';

describe('Service: ClienteForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteFormService]
    });
  });

  it('should ...', inject([ClienteFormService], (service: ClienteFormService) => {
    expect(service).toBeTruthy();
  }));
});
