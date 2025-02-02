import { maskPerCountry } from '../PhoneInput/constants';
import {
  ensurePlusPrefix,
  getFullMaskPhoneNumber,
  getFullPhoneNumber,
  isValidNumber,
} from '../PhoneInput/utils';

jest.mock('google-libphonenumber', () => ({
  PhoneNumberUtil: {
    getInstance: jest.fn(() => ({
      parse: jest.fn((number, countryCode) => {
        // Simulate parsing behavior
        if (number === '+1234567890' && countryCode === 'US') {
          return { isValid: true };
        }
        throw new Error('Invalid number');
      }),
      isValidNumber: jest.fn((parsedNumber) => parsedNumber.isValid),
    })),
  },
}));

describe('Phone Input Utils', () => {
  describe('isValidNumber', () => {
    it('should return true for valid phone number', () => {
      expect(isValidNumber('+1234567890', 'US')).toBe(true);
    });

    it('should return false for invalid phone number', () => {
      expect(isValidNumber('+invalid', 'US')).toBe(false);
    });

    it('should return false when country code is invalid', () => {
      expect(isValidNumber('+1234567890', 'INVALID')).toBe(false);
    });
  });

  describe('ensurePlusPrefix', () => {
    it('should add plus prefix if missing', () => {
      expect(ensurePlusPrefix('1234')).toBe('+1234');
    });

    it('should not add plus prefix if already present', () => {
      expect(ensurePlusPrefix('+1234')).toBe('+1234');
    });

    it('should return empty string for undefined input', () => {
      expect(ensurePlusPrefix(undefined)).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(ensurePlusPrefix('')).toBe('');
    });
  });

  describe('getFullPhoneNumber', () => {
    it('should combine prefix and phone number correctly', () => {
      expect(getFullPhoneNumber('+1', '2345678')).toBe('+12345678');
    });

    it('should add plus to prefix if missing', () => {
      expect(getFullPhoneNumber('1', '2345678')).toBe('+12345678');
    });

    it('should handle empty phone number', () => {
      expect(getFullPhoneNumber('+1', '')).toBe('+1');
    });
  });

  describe('getFullMaskPhoneNumber', () => {
    it('should generate correct mask array for US number', () => {
      const result = getFullMaskPhoneNumber('+1', 'US');
      const expected = ['+', /\d/, ' ', ...maskPerCountry['US']];
      expect(result).toEqual(expected);
    });

    it('should generate correct mask array for multi-digit calling code', () => {
      const result = getFullMaskPhoneNumber('+44', 'GB');
      const expected = ['+', /\d/, /\d/, ' ', ...maskPerCountry['GB']];
      expect(result).toEqual(expected);
    });

    it('should handle calling code without plus', () => {
      const result = getFullMaskPhoneNumber('1', 'US');
      const expected = [/\d/, ' ', ...maskPerCountry['US']];
      expect(result).toEqual(expected);
    });
  });
});
