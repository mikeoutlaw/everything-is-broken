import { CompanyService } from './company.service';
import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee(new CompanyService())).toBeTruthy();
  });

  it('should no longer be considered an individual contributor once moved to a team', () => {
    // Arrange
    let employee = new Employee(new CompanyService());

    // Act
    employee.moveToTeam();

    // Assert
    expect(employee.isIndividualContributor()).toBeFalse();
  });
});
