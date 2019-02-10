/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarcaService } from './marca.service';

describe('Service: Marca', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarcaService]
    });
  });

  it('should ...', inject([MarcaService], (service: MarcaService) => {
    expect(service).toBeTruthy();
  }));
});
