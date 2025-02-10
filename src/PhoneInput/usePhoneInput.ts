import { useCallback, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  type CallingCode,
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import type { Mask } from 'react-native-mask-input';
import { CALLING_CODE_PER_COUNTRY_CODE } from './constants';
import type { PhoneInputProps } from './PhoneInput.types';
import { ensurePlusPrefix, getFullMaskPhoneNumber } from './utils';

export const usePhoneInput = ({
  defaultValues,
  value,
  onChangeCountry,
  onChangeText,
  isCallingCodeEditable = true,
}: PhoneInputProps) => {
  const inputRef = useRef<TextInput | null>();
  const [callingCode, setCallingCode] = useState<CallingCode>(
    defaultValues?.callingCode || '+994'
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    value || defaultValues?.phoneNumber || '+994'
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    defaultValues?.countryCode || 'AZ'
  );
  const [mask, setMask] = useState<Mask>(
    getFullMaskPhoneNumber(callingCode, countryCode)
  );

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const updateCountryOnType = useCallback((inputText: string) => {
    if (CALLING_CODE_PER_COUNTRY_CODE?.[inputText]) {
      setCallingCode(inputText);
      const newCountryCode = CALLING_CODE_PER_COUNTRY_CODE?.[inputText];
      setCountryCode(newCountryCode);
      setMask(getFullMaskPhoneNumber(inputText, newCountryCode));
    }
  }, []);

  const onSelect = useCallback(
    (country: Country) => {
      const newCallingCode = ensurePlusPrefix(country.callingCode[0]);
      setCountryCode(country.cca2);
      setCallingCode(newCallingCode);
      setPhoneNumber(newCallingCode);
      setMask(getFullMaskPhoneNumber(newCallingCode, country.cca2));
      onChangeCountry?.(country);
    },
    [onChangeCountry]
  );

  const handleChangeText = useCallback(
    (_masked: string, unmasked: string, _obfuscated: string) => {
      const text = ensurePlusPrefix(unmasked);
      if (!isCallingCodeEditable && text.length < callingCode.length) return;
      updateCountryOnType(text);
      setPhoneNumber(text);
      onChangeText?.(text);
    },
    [
      isCallingCodeEditable,
      callingCode.length,
      updateCountryOnType,
      onChangeText,
    ]
  );

  return {
    models: {
      countryCode,
      callingCode,
      phoneNumber,
      mask,
      inputRef,
    },
    actions: { onSelect, handleChangeText, setMask },
    forms: { modalVisible, showModal, hideModal },
  };
};
