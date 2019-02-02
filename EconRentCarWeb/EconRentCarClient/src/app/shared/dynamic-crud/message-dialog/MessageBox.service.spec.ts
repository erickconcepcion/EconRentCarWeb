/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageBoxService } from './MessageBox.service';

describe('Service: MessageBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBoxService]
    });
  });

  it('should ...', inject([MessageBoxService], (service: MessageBoxService) => {
    expect(service).toBeTruthy();
  }));
});
