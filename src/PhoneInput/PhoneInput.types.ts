import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type {
  CallingCode,
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import type { CountryFilterProps } from 'react-native-country-picker-modal/lib/CountryFilter';
import type { MaskInputProps } from 'react-native-mask-input';

export type PhoneInputProps = {
  withDarkTheme?: boolean;
  withShadow?: boolean;
  autoFocus?: boolean;
  value?: string;
  defaultValues?: {
    countryCode: CountryCode;
    callingCode: CallingCode;
    phoneNumber: string;
  };
  disabled?: boolean;
  disableArrowIcon?: boolean;
  placeholder?: string;
  onChangeCountry?: (country: Country) => void;
  onChangeText?: (text: string) => void;
  renderDropdownImage?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  maskInputProps?: MaskInputProps;
  textInputStyle?: StyleProp<TextStyle>;
  codeTextStyle?: StyleProp<TextStyle>;
  flagButtonStyle?: StyleProp<ViewStyle>;
  countryPickerButtonStyle?: StyleProp<ViewStyle>;
  layout?: 'first' | 'second';
  filterProps?: CountryFilterProps;
  countryPickerProps?: any;
};
