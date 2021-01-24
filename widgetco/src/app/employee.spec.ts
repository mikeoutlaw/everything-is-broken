import { noop } from 'rxjs';
import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee(noop, 0)).toBeTruthy();
  });
});
