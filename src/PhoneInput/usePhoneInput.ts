import { useCallback, useState } from 'react';
import {
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import type { PhoneInputProps } from './PhoneInput.types';

export const usePhoneInput = ({
  defaultCode,
  value,
  defaultValue,
  onChangeCountry,
  onChangeFormattedText,
  onChangeText,
}: PhoneInputProps) => {
  const [code, setCode] = useState<string | undefined>(
    defaultCode ? undefined : '994'
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    value || defaultValue || ''
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    defaultCode || 'AZ'
  );

  const onSelect = useCallback(
    (country: Country) => {
      console.log('ON COUNTRY SELECT CALLED');
      setCountryCode(country.cca2);
      setCode(country.callingCode[0]);
      onChangeCountry?.(country);
      if (country.callingCode[0]) {
        onChangeFormattedText?.(`+${country.callingCode[0]}${phoneNumber}`);
      } else {
        onChangeFormattedText?.(phoneNumber);
      }
    },
    [onChangeCountry, onChangeFormattedText, phoneNumber]
  );

  const handleChangeText = useCallback(
    (_masked: string, unmasked: string, _obfuscated: string) => {
      setPhoneNumber(unmasked);
      onChangeText?.(unmasked);
      if (code) {
        onChangeFormattedText?.(
          unmasked.length > 0 ? `+${code}${unmasked}` : unmasked
        );
      } else {
        onChangeFormattedText?.(unmasked);
      }
    },
    [onChangeText, onChangeFormattedText, code]
  );

  return {
    models: { countryCode, code, phoneNumber },
    actions: { onSelect, handleChangeText },
    forms: { modalVisible, setModalVisible },
  };
};
