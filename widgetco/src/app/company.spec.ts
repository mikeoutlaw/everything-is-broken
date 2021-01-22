import { Company } from './company';
import { CompanyService } from './company.service';
import { Employee } from './employee';

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

  it('should form small team when there are enough individual contributors', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));

    // Act
    company.formSmallTeam(service);

    // Arrange
    expect(company.smallTeams.length).toBe(1);
    expect(company.employees.every(employee => employee.isIndividualContributor() === false)).toBeTrue();
  });

  it('should not form a small team when there are not enough individual contributors', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));
    company.employees.push(new Employee(service));

    // Act
    company.formSmallTeam(service);

    // Arrange
    expect(company.smallTeams.length).toBe(0);
    expect(company.employees.every(employee => employee.isIndividualContributor())).toBeTrue();
  });
});
