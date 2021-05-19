import { TestBed } from '@angular/core/testing';

import { WorkRequestServiceService } from './work-request-service.service';

describe('WorkRequestServiceService', () => {
  let service: WorkRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
