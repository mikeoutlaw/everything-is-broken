import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a new hire cost between the min and max values', () => {
    var cost = service.getNewHireCost();
    expect(cost).toBeGreaterThanOrEqual(service.minNewHireCost);
    expect(cost).toBeLessThanOrEqual(service.maxNewHireCost);
  });

});
