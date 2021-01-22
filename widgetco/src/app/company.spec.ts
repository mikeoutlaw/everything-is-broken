import { Company } from './company';
import { CompanyService } from './company.service';

describe('Company', () => {
  it('should create an instance', () => {
    expect(new Company()).toBeTruthy();
  });

  it('should increment the closed tickets and hiring budget when tickets are closed', () => {
    // Arrange
    let company: Company = new Company();
    let expectedClosedTicketCount = 5;

    // Act
    company.closeTickets(expectedClosedTicketCount);

    // Assert
    expect(company.ticketsClosed).toBe(expectedClosedTicketCount);
  });

  it('should not increment employee count if there is not enough budget when attempting to hire', () => {
    // Arrange
    let company: Company = new Company();
    let service: CompanyService = new CompanyService();
    const expectedHiringBudget = 5;
    const hiringCost = 6
    company.hiringBudget = expectedHiringBudget;

    // Act
    let result = company.hireNewEmployee(service, hiringCost);

    // Assert
    expect(result).toBeFalse();
    expect(company.employees.length).toBe(0);
    expect(company.hiringBudget).toBe(expectedHiringBudget);
  });
});
