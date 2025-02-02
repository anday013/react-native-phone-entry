import { PhoneInput, isValidNumber } from '../';

describe('Package exports', () => {
  it('should export PhoneInput component', () => {
    expect(PhoneInput).toBeDefined();
    expect(typeof PhoneInput).toBe('function');
  });

  it('should export isValidNumber utility', () => {
    expect(isValidNumber).toBeDefined();
    expect(typeof isValidNumber).toBe('function');
  });
});
