import { noop } from 'rxjs';
import { Company } from './company';
import { Employee } from './employee';
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
    const expectedHiringBudget = 4;
    company.capital = expectedHiringBudget;

    // Act
    company.hireNewDeveloper();

    // Assert
    expect(company.getEmployeeCount()).toBe(0);
    expect(company.capital).toBe(expectedHiringBudget);
  });

  it('should form small team when there are enough individual contributors', () => {
    // Arrange
    let company = new Company();
    company.developers = Array.from({length: 5}, () => new Employee(noop, 0), 0);

    // Act
    company.formSmallTeam();

    // Arrange
    expect(company.smallTeams.length).toBe(1);
  });

  it('should not form a small team when there are not enough individual contributors', () => {
    // Arrange
    let company = new Company();
    company.developers = Array.from({length: 3}, () => new Employee(noop, 0), 0);

    // Act
    company.formSmallTeam();

    // Arrange
    expect(company.smallTeams.length).toBe(0);
  });

  it('should return true when there are enough individual contributors to form a small team', () => {
    // Arrange
    let company = new Company();
    company.developers = Array.from({length: 5}, () => new Employee(noop, 0), 0);

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough individual contributors to form a small team', () => {
    // Arrange
    let company = new Company();
    company.developers = Array.from({length: 2}, () => new Employee(noop, 0), 0);

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough individual contributors to form a small team after forming a small team', () => {
    // Arrange
    let company = new Company();
    company.developers = Array.from({length: 6}, () => new Employee(noop, 0), 0);
    company.formSmallTeam();

    // Act
    let result = company.canFormSmallTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough small teams to form a medium team', () => {
    // Arrange
    let company = new Company();
    company.smallTeams.push(new Team(noop, 0));

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true when there are enough small teams to form a medium team', () => {
    // Arrange
    let company = new Company();
    company.smallTeams = Array.from({length: 2}, () => new Team(noop, 0), 0);

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough small teams to form a medium team after forming a medium team', () => {
    // Arrange
    let company = new Company();
    company.smallTeams = Array.from({length: 3}, () => new Team(noop, 0), 0);
    company.formMediumTeam();

    // Act
    let result = company.canFormMediumTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false when there are not enough medium teams to form a large team', () => {
    // Arrange
    let company = new Company();
    company.mediumTeams.push(new Team(noop, 0));

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true when there are enough medium teams to form a large team', () => {
    // Arrange
    let company = new Company();
    company.mediumTeams = Array.from({length: 2}, () => new Team(noop, 0), 0);

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when there are not enough medium teams to form a large team after forming a large team', () => {
    // Arrange
    let company = new Company();
    company.largeTeams = Array.from({length: 3}, () => new Team(noop, 0));
    company.formLargeTeam();

    // Act
    let result = company.canFormLargeTeam();

    // Assert
    expect(result).toBeFalse();
  });

  it('should allow hiring new hiring managers when there are multiples of 4 large teams', () => {
    // Arrange
    let company = new Company();
    company.capital = 10;
    company.newHiringManagerCost = 1;
    company.largeTeams = Array.from({length: 4}, () => new Team(noop, 0));

    // Act
    let result = company.canHireNewHiringManager();

    // Assert
    expect(result).toBeTrue();
  });

  it('should allow hiring new hiring managers when there are 4 or more large teams and no current hiring managers', () => {
    // Arrange
    let company = new Company();
    company.capital = 10;
    company.newHiringManagerCost = 1;
    company.largeTeams = Array.from({length: 6}, () => new Team(noop, 0));

    // Act
    let result = company.canHireNewHiringManager();

    // Assert
    expect(result).toBeTrue();
  });

  it('should not allow hiring new hiring managers when there are 4 large teams and one current hiring manager', () => {
    // Arrange
    let company = new Company();
    company.capital = 10;
    company.newHiringManagerCost = 1;
    company.largeTeams = Array.from({length: 4}, () => new Team(noop, 0));
    company.hiringMgrs.push(new Employee(noop, 0));

    // Act
    let result = company.canHireNewHiringManager();

    // Assert
    expect(result).toBeFalse();
  });

  it('should not allow hiring new hiring managers when there are 12 large teams, no current hiring managers, and one HR team', () => {
    // Arrange
    let company = new Company();
    company.capital = 10;
    company.newHiringManagerCost = 1;
    company.largeTeams = Array.from({length: 12}, () => new Team(noop, 0));
    company.hrTeams.push(new Team(noop,0));

    // Act
    let result = company.canHireNewHiringManager();

    // Assert
    expect(result).toBeFalse();
  });

  it('should not allow hiring new hiring managers when there are 4 or more large teams and one or more hiring managers', () => {
    // Arrange
    let company = new Company();
    company.capital = 10;
    company.newHiringManagerCost = 1;
    company.largeTeams = Array.from({length: 6}, () => new Team(noop, 0));
    company.hiringMgrs.push(new Employee(noop, 0));

    // Act
    let result = company.canHireNewHiringManager();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return a new hire cost between the min and max values when get the hiring cost', () => {
    // Arrange
    let company = new Company();
    const expectedMinHiringCost = company.minNewHireCost;
    const expectedMaxHiringCost = company.maxNewHireCost;

    // Act
    var cost = company.getNewHireCost();

    // Assert
    expect(cost).toBeGreaterThanOrEqual(expectedMinHiringCost);
    expect(cost).toBeLessThanOrEqual(expectedMaxHiringCost);
  });
});
