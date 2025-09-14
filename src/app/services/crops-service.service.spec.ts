import { TestBed } from '@angular/core/testing';

import { CropsServiceService } from './crops-service.service';

describe('CropsServiceService', () => {
  let service: CropsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
