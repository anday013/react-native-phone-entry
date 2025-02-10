import type {
  ImageProps,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type {
  CallingCode,
  Country,
  CountryCode,
  Flag,
} from 'react-native-country-picker-modal';
import CountryPicker from 'react-native-country-picker-modal';

import type { MaskInputProps } from 'react-native-mask-input';

export type PhoneInputProps = {
  autoFocus?: boolean;
  value?: string;
  defaultValues?: {
    countryCode: CountryCode;
    callingCode: CallingCode;
    phoneNumber: string;
  };
  disabled?: boolean;
  hideDropdownIcon?: boolean;
  onChangeCountry?: (country: Country) => void;
  onChangeText?: (text: string) => void;
  renderCustomDropdown?: JSX.Element;
  theme?: Theme;
  maskInputProps?: MaskInputProps;
  countryPickerProps?: Parameters<typeof CountryPicker>[0];
  flagProps?: Parameters<typeof Flag>[0];
  isCallingCodeEditable?: boolean;
  dropDownImageProps?: ImageProps;
};
interface Theme {
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  codeTextStyle?: StyleProp<TextStyle>;
  flagButtonStyle?: StyleProp<ViewStyle>;
  dropDownImageStyle?: StyleProp<ImageStyle>;
  enableDarkTheme?: boolean;
}
