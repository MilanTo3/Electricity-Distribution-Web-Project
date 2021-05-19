import { TestBed } from '@angular/core/testing';

import { WorkPlanServiceService } from './work-plan-service.service';

describe('WorkPlanServiceService', () => {
  let service: WorkPlanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPlanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
