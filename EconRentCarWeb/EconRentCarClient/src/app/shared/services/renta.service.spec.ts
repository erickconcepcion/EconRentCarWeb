/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentaService } from './renta.service';

describe('Service: Renta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentaService]
    });
  });

  it('should ...', inject([RentaService], (service: RentaService) => {
    expect(service).toBeTruthy();
  }));
});
