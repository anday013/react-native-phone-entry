import { PhoneNumberUtil } from 'google-libphonenumber';
import type { CountryCode } from 'react-native-country-picker-modal';
import type { Mask } from 'react-native-mask-input';

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

export const maskPerCountry: { [key in CountryCode]: Mask } = {
  BQ: ['+', '5', '9', '9', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BV: ['+', '4', '7', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  CW: ['+', '5', '9', '9', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  EH: ['+', '2', '1', '2', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HM: ['+', '6', '1', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  TF: ['+', '2', '6', '2', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  UM: ['+', '1', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],

  AF: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AX: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  AL: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  DZ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AS: ['(', '6', '8', '4', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AD: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  AO: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  AI: ['(', '2', '6', '4', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AQ: ['1', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  AG: ['(', '2', '6', '8', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AR: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  AM: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  AW: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AU: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  AT: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  AZ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  BS: ['(', '2', '4', '2', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BH: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BD: ['1', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  BB: ['(', '2', '4', '6', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BY: [
    '(',
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  BE: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  BZ: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BJ: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BM: ['(', '4', '4', '1', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BT: ['1', '7', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  BO: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BA: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BW: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  BR: [
    '(',
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  IO: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BN: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BG: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  BF: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BI: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  KH: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  CM: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CA: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  CV: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/],
  KY: ['(', '3', '4', '5', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CF: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TD: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  CL: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CN: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ],
  CX: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CC: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CO: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  KM: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  CG: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  CK: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
  CR: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HR: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  CU: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CY: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  CZ: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  CD: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  DK: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  DJ: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  DM: ['(', '7', '6', '7', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  DO: ['(', '8', '0', '9', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  EC: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  EG: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  SV: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  GQ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ER: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  EE: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SZ: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ET: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  FK: [/\d/, /\d/, /\d/, /\d/, /\d/],
  FO: [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  FJ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  FI: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  FR: [
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ],
  GF: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  PF: [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  GA: [/\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  GM: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  GE: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  DE: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  GH: ['0', '3', /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  GI: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  GR: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  GL: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  GD: ['(', '4', '7', '3', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  GP: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  GU: ['6', '7', '1', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  GT: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  GG: ['(', /\d/, /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  GN: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  GW: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  GY: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HT: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  VA: ['0', '6', ' ', '6', '9', '8', /\d/, /\d/, /\d/, /\d/, /\d/],
  HN: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HK: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HU: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  IS: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  IN: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ],
  ID: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  IR: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  IQ: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  IE: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  IM: ['(', /\d/, /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  IL: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  IT: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ],
  CI: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  JM: ['(', '8', '7', '6', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  JP: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  JE: ['(', /\d/, /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  JO: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  KZ: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ],
  KE: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  KI: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
  KP: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  KR: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  XK: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  KW: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  KG: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LA: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LV: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LB: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LS: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  LR: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LY: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LI: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  LT: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LU: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MO: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MG: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  MW: ['1', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MY: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MV: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ML: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MT: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MH: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MQ: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  MR: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MU: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  YT: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MX: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  FM: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MD: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MC: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MN: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ME: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MS: ['(', '6', '6', '4', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MA: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MZ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MM: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  NA: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NR: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NP: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  NL: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NC: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NZ: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  NI: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NE: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NG: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  NU: [/\d/, /\d/, /\d/, /\d/],
  NF: ['3', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MK: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  MP: ['(', '6', '7', '0', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  NO: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  OM: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PK: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  PW: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  PS: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  PA: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  PG: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PY: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PE: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PH: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  PN: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PL: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PT: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  PR: [
    '(',
    '7',
    '8',
    '7',
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  QA: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  RE: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  RO: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  RU: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  RW: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  BL: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  SH: [/\d/, /\d/, /\d/, /\d/],
  KN: ['(', '8', '6', '9', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  LC: ['(', '7', '5', '8', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  MF: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  PM: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  VC: ['(', '7', '8', '4', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  WS: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SM: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  ST: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
  SA: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SN: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  RS: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SC: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  SL: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  SG: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SX: ['(', '7', '2', '1', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SK: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  SI: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  SB: [/\d/, /\d/, /\d/, /\d/, /\d/],
  SO: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  ZA: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  GS: [/\d/, /\d/, /\d/, /\d/, /\d/],
  SS: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ES: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  LK: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SD: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SR: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  SJ: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  SE: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  CH: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SY: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  TW: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TJ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TZ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TH: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  TL: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TG: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  TK: [/\d/, /\d/, /\d/, /\d/],
  TO: [/\d/, /\d/, /\d/, /\d/, /\d/],
  TT: ['(', '8', '6', '8', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TN: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  TR: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  TM: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  TC: ['(', '2', '4', '9', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  TV: ['2', /\d/, /\d/, /\d/, /\d/],
  UG: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  UA: [
    '(',
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  AE: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  GB: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  US: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  UY: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  UZ: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  VU: [/\d/, /\d/, /\d/, /\d/, /\d/],
  VE: [
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  VN: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  VG: ['(', '2', '8', '4', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  VI: ['(', '3', '4', '0', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  WF: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  YE: [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  ZM: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  ZW: [/\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
};
