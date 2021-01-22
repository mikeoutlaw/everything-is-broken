import { CompanyService } from './company.service';
import { Developer } from './developer';

describe('Developer', () => {
  it('should create an instance', () => {
    expect(new Developer(new CompanyService())).toBeTruthy();
  });

  it('should no longer be considered an individual contributor once moved to a team', () => {
    // Arrange
    let dev = new Developer(new CompanyService());

    // Act
    dev.moveToTeam();

    // Assert
    expect(dev.isIndividualContributor()).toBeFalse();
  });
});
