import { noop } from 'rxjs';
import { Team } from './team';

describe('Team', () => {
  it('should create an instance', () => {
    expect(new Team(noop, 800)).toBeTruthy();
  });
});
