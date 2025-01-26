import { PhoneNumberUtil } from 'google-libphonenumber';
import type {
  CallingCode,
  CountryCode,
} from 'react-native-country-picker-modal';
import type { MaskArray } from 'react-native-mask-input';
import { maskPerCountry } from './constants';

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidNumber = (number: string, countryCode: string): boolean => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};

export const ensurePlusPrefix = (number?: string): string => {
  if (!number) return '';

  if (number.startsWith('+')) {
    return number;
  }
  return `+${number}`;
};

export const getFullPhoneNumber = (
  prefix: string,
  phoneNumber: string
): string => {
  return `${ensurePlusPrefix(prefix)}${phoneNumber}`;
};

const callingCodeToMaskArray = (callingCode: CallingCode): MaskArray =>
  callingCode.split('').map((char) => (char === '+' ? '+' : /\d/));

export const getFullMaskPhoneNumber = (
  callingCode: CallingCode,
  countryCode: CountryCode
) => [
  ...callingCodeToMaskArray(callingCode),
  ' ',
  ...maskPerCountry[countryCode],
];
