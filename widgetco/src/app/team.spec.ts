import { CompanyService } from './company.service';
import { Team } from './team';

describe('Team', () => {
  it('should create an instance', () => {
    expect(new Team(new CompanyService(), 800, 5)).toBeTruthy();
  });
});
