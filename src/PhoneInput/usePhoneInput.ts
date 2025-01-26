import { useCallback, useEffect, useState } from 'react';
import {
  type CallingCode,
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import type { Mask } from 'react-native-mask-input';
import { callingCodePerCountryCode } from './constants';
import type { PhoneInputProps } from './PhoneInput.types';
import { ensurePlusPrefix, getFullMaskPhoneNumber } from './utils';

export const usePhoneInput = ({
  defaultValues,
  value,
  onChangeCountry,
  onChangeText,
}: PhoneInputProps) => {
  const [callingCode, setCallingCode] = useState<CallingCode>(
    defaultValues?.callingCode || '+994'
  ); // TODO: Get rid of calling code in the future
  const [phoneNumber, setPhoneNumber] = useState<string>(
    value || defaultValues?.phoneNumber || ''
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    defaultValues?.countryCode || 'AZ'
  );
  const [mask, setMask] = useState<Mask>(
    getFullMaskPhoneNumber(callingCode, countryCode)
  );

  useEffect(() => {
    setPhoneNumber(callingCode);
    console.log('callingCode changed', callingCode);
  }, [callingCode]);

  const updateCountryOnType = useCallback((inputText: string) => {
    if (callingCodePerCountryCode?.[inputText]) {
      setCallingCode(inputText);
      const newCountryCode = callingCodePerCountryCode?.[inputText];
      setCountryCode(newCountryCode);
      setMask(getFullMaskPhoneNumber(inputText, newCountryCode));
    }
  }, []);

  const onSelect = useCallback(
    (country: Country) => {
      const newCallingCode = ensurePlusPrefix(country.callingCode[0]);
      setCountryCode(country.cca2);
      setCallingCode(newCallingCode);
      setMask(getFullMaskPhoneNumber(newCallingCode, country.cca2));
      onChangeCountry?.(country);
    },
    [onChangeCountry]
  );

  const handleChangeText = useCallback(
    (_masked: string, unmasked: string, _obfuscated: string) => {
      const text = ensurePlusPrefix(unmasked);
      updateCountryOnType(text);
      setPhoneNumber(text);
      onChangeText?.(text);
    },
    [updateCountryOnType, onChangeText]
  );

  return {
    models: { countryCode, callingCode, phoneNumber, mask },
    actions: { onSelect, handleChangeText, setMask },
    forms: { modalVisible, setModalVisible },
  };
};
