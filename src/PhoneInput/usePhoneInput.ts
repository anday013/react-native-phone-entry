import { useCallback, useEffect, useState } from 'react';
import {
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import type { PhoneInputProps } from './PhoneInput.types';

export const usePhoneInput = ({
  defaultCode,
  disabled,
  value,
  defaultValue,
  onChangeCountry,
  onChangeFormattedText,
  onChangeText,
}: PhoneInputProps) => {
  const [code, setCode] = useState<string | undefined>(
    defaultCode ? undefined : '994'
  );
  const [number, setNumber] = useState<string>(value || defaultValue || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    defaultCode || 'AZ'
  );
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
    if (value !== undefined && value !== number) {
      setNumber(value);
    }
  }, [disabled, number, value]);

  const onSelect = useCallback(
    (country: Country) => {
      setCountryCode(country.cca2);
      setCode(country.callingCode[0]);
      if (onChangeCountry) {
        onChangeCountry(country);
      }
      if (onChangeFormattedText) {
        if (country.callingCode[0]) {
          onChangeFormattedText(`+${country.callingCode[0]}${number}`);
        } else {
          onChangeFormattedText(number);
        }
      }
    },
    [onChangeCountry, onChangeFormattedText, number]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setNumber(text);
      onChangeText?.(text);
      if (code) {
        onChangeFormattedText?.(text.length > 0 ? `+${code}${text}` : text);
      } else {
        onChangeFormattedText?.(text);
      }
    },
    [onChangeText, onChangeFormattedText, code]
  );

  return {
    models: { countryCode, code, number, isDisabled },
    actions: { onSelect, handleChangeText },
    forms: { modalVisible, setModalVisible },
  };
};
