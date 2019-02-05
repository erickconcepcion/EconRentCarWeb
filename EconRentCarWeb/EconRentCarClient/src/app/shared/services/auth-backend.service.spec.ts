/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthBackendService } from './auth-backend.service';

describe('Service: AuthBackend', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBackendService]
    });
  });

  it('should ...', inject([AuthBackendService], (service: AuthBackendService) => {
    expect(service).toBeTruthy();
  }));
});
