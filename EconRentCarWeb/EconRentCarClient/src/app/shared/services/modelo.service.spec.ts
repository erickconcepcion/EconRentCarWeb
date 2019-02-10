/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModeloService } from './modelo.service';

describe('Service: Modelo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeloService]
    });
  });

  it('should ...', inject([ModeloService], (service: ModeloService) => {
    expect(service).toBeTruthy();
  }));
});
