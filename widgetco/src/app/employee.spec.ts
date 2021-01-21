import { Employee } from './employee';
import { ScoreService } from './score.service';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee(new ScoreService())).toBeTruthy();
  });
});
