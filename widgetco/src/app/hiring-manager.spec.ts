import { Company } from './company';
import { HiringManager } from './hiring-manager';

describe('HiringManager', () => {
  it('should create an instance', () => {
    expect(new HiringManager(new Company)).toBeTruthy();
  });
});
