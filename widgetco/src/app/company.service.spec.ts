import { TestBed } from '@angular/core/testing';
import { Company } from './company';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService; // this means that all of these tests are using the same Company object ... gross

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a new hire cost between the min and max values when get the hiring cost', () => {
    // Arrange
    const expectedMinHiringCost = service.minNewHireCost;
    const expectedMaxHiringCost = service.maxNewHireCost;

    // Act
    var cost = service.getNewHireCost();

    // Assert
    expect(cost).toBeGreaterThanOrEqual(expectedMinHiringCost);
    expect(cost).toBeLessThanOrEqual(expectedMaxHiringCost);
  });
});
