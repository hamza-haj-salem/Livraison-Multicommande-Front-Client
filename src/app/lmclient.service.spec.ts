import { TestBed } from '@angular/core/testing';

import { LMClientService } from './lmclient.service';

describe('LMClientService', () => {
  let service: LMClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LMClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
