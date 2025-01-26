import { PhoneNumberUtil } from 'google-libphonenumber';
import type {
  CallingCode,
  CountryCode,
} from 'react-native-country-picker-modal';
import type { MaskArray } from 'react-native-mask-input';

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

export const callingCodePerCountryCode: { [key in CallingCode]: CountryCode } =
  {
    '+93': 'AF',
    '+355': 'AL',
    '+213': 'DZ',
    '+1684': 'AS',
    '+376': 'AD',
    '+244': 'AO',
    '+1264': 'AI',
    '+1268': 'AG',
    '+54': 'AR',
    '+374': 'AM',
    '+297': 'AW',
    '+61': 'CC',
    '+43': 'AT',
    '+994': 'AZ',
    '+1242': 'BS',
    '+973': 'BH',
    '+880': 'BD',
    '+1246': 'BB',
    '+375': 'BY',
    '+32': 'BE',
    '+501': 'BZ',
    '+229': 'BJ',
    '+1441': 'BM',
    '+975': 'BT',
    '+591': 'BO',
    '+387': 'BA',
    '+267': 'BW',
    '+55': 'BR',
    '+246': 'IO',
    '+1284': 'VG',
    '+673': 'BN',
    '+359': 'BG',
    '+226': 'BF',
    '+257': 'BI',
    '+855': 'KH',
    '+237': 'CM',
    '+1': 'US',
    '+238': 'CV',
    '+599': 'BQ',
    '+1345': 'KY',
    '+236': 'CF',
    '+235': 'TD',
    '+56': 'CL',
    '+86': 'CN',
    '+57': 'CO',
    '+269': 'KM',
    '+682': 'CK',
    '+506': 'CR',
    '+385': 'HR',
    '+53': 'CU',
    '+5999': 'CW',
    '+357': 'CY',
    '+420': 'CZ',
    '+243': 'CD',
    '+45': 'DK',
    '+253': 'DJ',
    '+1767': 'DM',
    '+1809': 'DO',
    '+593': 'EC',
    '+20': 'EG',
    '+503': 'SV',
    '+240': 'GQ',
    '+291': 'ER',
    '+372': 'EE',
    '+268': 'SZ',
    '+251': 'ET',
    '+500': 'GS',
    '+298': 'FO',
    '+679': 'FJ',
    '+358': 'AX',
    '+33': 'FR',
    '+594': 'GF',
    '+689': 'PF',
    '+241': 'GA',
    '+220': 'GM',
    '+995': 'GE',
    '+49': 'DE',
    '+233': 'GH',
    '+350': 'GI',
    '+30': 'GR',
    '+299': 'GL',
    '+1473': 'GD',
    '+590': 'MF',
    '+1671': 'GU',
    '+502': 'GT',
    '+44': 'GB',
    '+224': 'GN',
    '+245': 'GW',
    '+592': 'GY',
    '+509': 'HT',
    '+504': 'HN',
    '+852': 'HK',
    '+36': 'HU',
    '+354': 'IS',
    '+91': 'IN',
    '+62': 'ID',
    '+98': 'IR',
    '+964': 'IQ',
    '+353': 'IE',
    '+972': 'IL',
    '+39': 'IT',
    '+225': 'CI',
    '+1876': 'JM',
    '+81': 'JP',
    '+962': 'JO',
    '+7': 'RU',
    '+254': 'KE',
    '+686': 'KI',
    '+383': 'XK',
    '+965': 'KW',
    '+996': 'KG',
    '+856': 'LA',
    '+371': 'LV',
    '+961': 'LB',
    '+266': 'LS',
    '+231': 'LR',
    '+218': 'LY',
    '+423': 'LI',
    '+370': 'LT',
    '+352': 'LU',
    '+853': 'MO',
    '+389': 'MK',
    '+261': 'MG',
    '+265': 'MW',
    '+60': 'MY',
    '+960': 'MV',
    '+223': 'ML',
    '+356': 'MT',
    '+692': 'MH',
    '+596': 'MQ',
    '+222': 'MR',
    '+230': 'MU',
    '+262': 'RE',
    '+52': 'MX',
    '+691': 'FM',
    '+373': 'MD',
    '+377': 'MC',
    '+976': 'MN',
    '+382': 'ME',
    '+1664': 'MS',
    '+212': 'EH',
    '+258': 'MZ',
    '+95': 'MM',
    '+264': 'NA',
    '+674': 'NR',
    '+977': 'NP',
    '+31': 'NL',
    '+687': 'NC',
    '+64': 'PN',
    '+505': 'NI',
    '+227': 'NE',
    '+234': 'NG',
    '+683': 'NU',
    '+672': 'NF',
    '+850': 'KP',
    '+1670': 'MP',
    '+47': 'NO',
    '+968': 'OM',
    '+92': 'PK',
    '+680': 'PW',
    '+970': 'PS',
    '+507': 'PA',
    '+675': 'PG',
    '+595': 'PY',
    '+51': 'PE',
    '+63': 'PH',
    '+48': 'PL',
    '+351': 'PT',
    '+1787': 'PR',
    '+974': 'QA',
    '+242': 'CG',
    '+40': 'RO',
    '+250': 'RW',
    '+290': 'SH',
    '+1869': 'KN',
    '+1758': 'LC',
    '+508': 'PM',
    '+1784': 'VC',
    '+685': 'WS',
    '+378': 'SM',
    '+966': 'SA',
    '+221': 'SN',
    '+381': 'RS',
    '+248': 'SC',
    '+232': 'SL',
    '+65': 'SG',
    '+1721': 'SX',
    '+421': 'SK',
    '+386': 'SI',
    '+677': 'SB',
    '+252': 'SO',
    '+27': 'ZA',
    '+82': 'KR',
    '+211': 'SS',
    '+34': 'ES',
    '+94': 'LK',
    '+249': 'SD',
    '+597': 'SR',
    '+4779': 'SJ',
    '+46': 'SE',
    '+41': 'CH',
    '+963': 'SY',
    '+239': 'ST',
    '+886': 'TW',
    '+992': 'TJ',
    '+255': 'TZ',
    '+66': 'TH',
    '+670': 'TL',
    '+228': 'TG',
    '+690': 'TK',
    '+676': 'TO',
    '+1868': 'TT',
    '+216': 'TN',
    '+90': 'TR',
    '+993': 'TM',
    '+1649': 'TC',
    '+688': 'TV',
    '+256': 'UG',
    '+380': 'UA',
    '+971': 'AE',
    '+1340': 'VI',
    '+598': 'UY',
    '+998': 'UZ',
    '+678': 'VU',
    '+3906698': 'VA',
    '+58': 'VE',
    '+84': 'VN',
    '+681': 'WF',
    '+967': 'YE',
    '+260': 'ZM',
    '+263': 'ZW',
  };

export const maskPerCountry: { [key in CountryCode]: MaskArray } = {
  BQ: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  BV: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  CW: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  EH: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  HM: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  TF: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  UM: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],

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
