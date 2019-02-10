/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspeccionService } from './inspeccion.service';

describe('Service: Inspeccion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspeccionService]
    });
  });

  it('should ...', inject([InspeccionService], (service: InspeccionService) => {
    expect(service).toBeTruthy();
  }));
});
