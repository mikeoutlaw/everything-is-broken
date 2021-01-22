import { Company } from './company';
import { CompanyService } from './company.service';
import { Developer } from './developer';
import { HiringManager } from './hiring-manager';
import { Team } from './team';

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
    company.capital = expectedHiringBudget;

    // Act
    let result = company.hireNewDeveloper(service, hiringCost);

    // Assert
    expect(result).toBeFalse();
    expect(company.employees.length).toBe(0);
    expect(company.capital).toBe(expectedHiringBudget);
  });

  it('should form small team when there are enough individual contributors', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));

    // Act
    company.formSmallTeam(service);

    // Arrange
    expect(company.smallTeams.length).toBe(1);
    expect(company.employees.every(employee => employee instanceof Developer && employee.isIndividualContributor() === false)).toBeTrue();
  });

  it('should not form a small team when there are not enough individual contributors', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));

    // Act
    company.formSmallTeam(service);

    // Arrange
    expect(company.smallTeams.length).toBe(0);
    expect(company.employees.every(employee => employee instanceof Developer && employee.isIndividualContributor())).toBeTrue();
  });

  it('should return true when there are enough individual contributors to form a small team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough individual contributors to form a small team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough individual contributors to form a small team after forming a small team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.employees.push(new Developer(service));
    company.formSmallTeam(service);

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough small teams to form a medium team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true when there are enough small teams to form a medium team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough small teams to form a medium team after forming a medium team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));
    company.smallTeams.push(new Team(service, company.smallTeamDelayMs, company.smallTeamTicketCloseRate));
    company.formMediumTeam(service);

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough medium teams to form a large team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true when there are enough medium teams to form a large team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough medium teams to form a large team after forming a large team', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));
    company.mediumTeams.push(new Team(service, company.mediumTeamDelayMs, company.mediumTeamTicketCloseRate));
    company.formLargeTeam(service);

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should allow hiring new hiring managers when there are multiples of 4 large teams', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    const capital = 10;
    const cost = 1;
    company.capital = capital;
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));

    // Act
    let result = company.canHireNewHiringManager(cost);

    // Assert
    expect(result).toBeTrue();
  });

  it('should allow hiring new hiring managers when there are 4 or more large teams and no current hiring managers', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    const capital = 10;
    const cost = 1;
    company.capital = capital;
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));

    // Act
    let result = company.canHireNewHiringManager(cost);

    // Assert
    expect(result).toBeTrue();
  });

  it('should not allow hiring new hiring managers when there are 4 or more large teams and one or more hiring managers', () => {
    // Arrange
    let company = new Company();
    let service = new CompanyService();
    const capital = 10;
    const cost = 1;
    company.capital = capital;
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.largeTeams.push(new Team(service, company.largeTeamDelayMs, company.largeTeamTicketCloseRate));
    company.employees.push(new HiringManager());

    // Act
    let result = company.canHireNewHiringManager(cost);

    // Assert
    expect(result).toBeFalse();
  });
});
