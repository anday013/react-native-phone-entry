import { act, renderHook } from '@testing-library/react-hooks';
import type { Country, CountryCode } from 'react-native-country-picker-modal';
import { usePhoneInput } from '../PhoneInput/usePhoneInput';
import { getFullMaskPhoneNumber } from '../PhoneInput/utils';

describe('usePhoneInput', () => {
  const mockProps = {
    defaultValues: {
      callingCode: '+994' as const,
      countryCode: 'AZ' as CountryCode,
      phoneNumber: '+994',
    },
    onChangeCountry: jest.fn(),
    onChangeText: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    expect(result.current.models.callingCode).toBe('+994');
    expect(result.current.models.countryCode).toBe('AZ');
    expect(result.current.models.phoneNumber).toBe('+994');
    expect(result.current.models.mask).toEqual(
      getFullMaskPhoneNumber('+994', 'AZ')
    );
    expect(result.current.forms.modalVisible).toBe(false);
  });

  it('should initialize with provided value', () => {
    const propsWithValue = {
      ...mockProps,
      value: '+1234567890',
    };

    const { result } = renderHook(() => usePhoneInput(propsWithValue));

    expect(result.current.models.phoneNumber).toBe('+1234567890');
  });

  it('should handle country selection', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    const mockCountry: Country = {
      callingCode: ['1'],
      cca2: 'US' as CountryCode,
      currency: ['USD'],
      flag: 'flag',
      name: 'United States',
      region: 'Americas',
      subregion: 'North America',
    };

    act(() => {
      result.current.actions.onSelect(mockCountry);
    });

    expect(result.current.models.countryCode).toBe('US');
    expect(result.current.models.callingCode).toBe('+1');
    expect(result.current.models.phoneNumber).toBe('+1');
    expect(result.current.models.mask).toEqual(
      getFullMaskPhoneNumber('+1', 'US')
    );
    expect(mockProps.onChangeCountry).toHaveBeenCalledWith(mockCountry);
  });

  it('should handle text change', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    act(() => {
      result.current.actions.handleChangeText('12345', '12345', '12345');
    });

    expect(result.current.models.phoneNumber).toBe('+12345');
    expect(mockProps.onChangeText).toHaveBeenCalledWith('+12345');
  });

  it('should update country based on calling code when typing', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    act(() => {
      result.current.actions.handleChangeText('+1', '1', '+1');
    });

    expect(result.current.models.countryCode).toBe('US');
    expect(result.current.models.callingCode).toBe('+1');
    expect(result.current.models.mask).toEqual(
      getFullMaskPhoneNumber('+1', 'US')
    );
  });

  it('should handle modal visibility', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    act(() => {
      result.current.forms.showModal();
    });

    expect(result.current.forms.modalVisible).toBe(true);

    act(() => {
      result.current.forms.hideModal();
    });

    expect(result.current.forms.modalVisible).toBe(false);
  });

  it('should maintain inputRef', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    expect(result.current.models.inputRef.current).toBeUndefined();
  });

  it('should not update country if invalid calling code is entered', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    act(() => {
      result.current.actions.handleChangeText('+999', '999', '+999');
    });

    expect(result.current.models.countryCode).toBe('AZ'); // Should maintain original country code
    expect(result.current.models.callingCode).toBe('+994'); // Should maintain original calling code
  });

  it('should handle empty input', () => {
    const { result } = renderHook(() => usePhoneInput(mockProps));

    act(() => {
      result.current.actions.handleChangeText('', '', '');
    });

    expect(result.current.models.phoneNumber).toBe('');
    expect(mockProps.onChangeText).toHaveBeenCalledWith('');
  });

  it('should initialize with default values when no props provided', () => {
    const { result } = renderHook(() => usePhoneInput({}));

    expect(result.current.models.callingCode).toBe('+994');
    expect(result.current.models.countryCode).toBe('AZ');
    expect(result.current.models.phoneNumber).toBe('+994');
  });

  it('should handle optional callbacks', () => {
    const { result } = renderHook(() => usePhoneInput({}));

    act(() => {
      result.current.actions.handleChangeText('12345', '12345', '12345');
    });

    const mockCountry: Country = {
      callingCode: ['1'],
      cca2: 'US' as CountryCode,
      currency: ['USD'],
      flag: 'flag',
      name: 'United States',
      region: 'Americas',
      subregion: 'North America',
    };

    act(() => {
      result.current.actions.onSelect(mockCountry);
    });

    // No errors should be thrown
    expect(result.current.models.countryCode).toBe('US');
  });
});
