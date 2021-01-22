import { CompanyService } from './company.service';
import { SmallTeam } from './small-team';

describe('SmallTeam', () => {
  it('should create an instance', () => {
    expect(new SmallTeam(new CompanyService())).toBeTruthy();
  });
});
