import { Team } from './team';
import { noopfn } from './utils/globals';

describe('Team', () => {
  it('should create an instance', () => {
    expect(new Team(noopfn, 800)).toBeTruthy();
  });
});
