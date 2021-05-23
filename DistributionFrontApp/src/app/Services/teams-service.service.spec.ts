import { TestBed } from '@angular/core/testing';

import { TeamsServiceService } from './teams-service.service';

describe('TeamsServiceService', () => {
  let service: TeamsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
