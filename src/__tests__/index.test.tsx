import {
  CALLING_CODE_PER_COUNTRY_CODE,
  EXCLUDED_COUNTRIES,
  MASK_PER_COUNTRY,
  PhoneInput,
  isValidNumber,
} from '../';

describe('Package exports', () => {
  it('should export PhoneInput component', () => {
    expect(PhoneInput).toBeDefined();
    expect(typeof PhoneInput).toBe('function');
  });

  it('should export isValidNumber utility', () => {
    expect(isValidNumber).toBeDefined();
    expect(typeof isValidNumber).toBe('function');
  });

  it('should export calling codes', () => {
    expect(CALLING_CODE_PER_COUNTRY_CODE).toBeDefined();
  });

  it('should export excluded countries', () => {
    expect(EXCLUDED_COUNTRIES).toBeDefined();
  });

  it('should export masks', () => {
    expect(MASK_PER_COUNTRY).toBeDefined();
  });
});
