import { useCallback, useState } from 'react';
import {
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import type { PhoneInputProps } from './PhoneInput.types';
import { ensurePlusPrefix, getFullPhoneNumber } from './utils';

export const usePhoneInput = ({
  defaultCode,
  value,
  defaultValue,
  onChangeCountry,
  onChangeFormattedText,
  onChangeText,
}: PhoneInputProps) => {
  const [callingCode, setCallingCode] = useState<string | undefined>(
    defaultCode ? undefined : '+994'
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
      console.log('ON COUNTRY SELECT CALLED', country);
      const newCallingCode = country.callingCode[0];
      setCountryCode(country.cca2);
      setCallingCode(ensurePlusPrefix(newCallingCode));
      onChangeCountry?.(country);
      if (newCallingCode) {
        onChangeFormattedText?.(
          getFullPhoneNumber(newCallingCode, phoneNumber)
        );
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
      if (callingCode) {
        onChangeFormattedText?.(
          unmasked.length > 0
            ? getFullPhoneNumber(callingCode, unmasked)
            : unmasked
        );
      } else {
        onChangeFormattedText?.(unmasked);
      }
    },
    [onChangeText, onChangeFormattedText, callingCode]
  );

  return {
    models: { countryCode, callingCode, phoneNumber },
    actions: { onSelect, handleChangeText },
    forms: { modalVisible, setModalVisible },
  };
};
