import { TestBed } from '@angular/core/testing';

import { SafetyDocumentServiceService } from './safety-document-service.service';

describe('SafetyDocumentServiceService', () => {
  let service: SafetyDocumentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafetyDocumentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
