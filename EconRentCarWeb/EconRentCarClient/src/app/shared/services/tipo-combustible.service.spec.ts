/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoCombustibleService } from './tipo-combustible.service';

describe('Service: TipoCombustible', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoCombustibleService]
    });
  });

  it('should ...', inject([TipoCombustibleService], (service: TipoCombustibleService) => {
    expect(service).toBeTruthy();
  }));
});
