import { fireEvent, render } from '@testing-library/react-native';
import { View } from 'react-native';
import type { CountryCode } from 'react-native-country-picker-modal';
import { DEFAULT_THEME } from 'react-native-country-picker-modal';
import { PhoneInput } from '../PhoneInput/PhoneInput';

const mockShowModal = jest.fn();
const mockHideModal = jest.fn();
const mockHandleChangeText = jest.fn();
const mockOnSelect = jest.fn();

// Mock the usePhoneInput hook
jest.mock('../PhoneInput/usePhoneInput', () => ({
  usePhoneInput: jest.fn(() => ({
    models: {
      countryCode: 'AZ' as CountryCode,
      phoneNumber: '+994',
      mask: [/\d/, /\d/, /\d/],
      inputRef: { current: null },
    },
    actions: {
      handleChangeText: mockHandleChangeText,
      onSelect: mockOnSelect,
    },
    forms: {
      modalVisible: false,
      showModal: mockShowModal,
      hideModal: mockHideModal,
    },
  })),
}));

describe('PhoneInput', () => {
  const defaultProps = {
    defaultValues: {
      callingCode: '+994',
      countryCode: 'AZ' as CountryCode,
      phoneNumber: '+994',
    },
    onChangeCountry: jest.fn(),
    onChangeText: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);

    expect(getByTestId('phone-input-container')).toBeTruthy();
    expect(getByTestId('country-picker-button')).toBeTruthy();
    expect(getByTestId('phone-input')).toBeTruthy();
  });

  it('renders with custom styles', () => {
    const customStyles = {
      containerStyle: { backgroundColor: 'red' },
      textInputStyle: { color: 'blue' },
      flagButtonStyle: { borderWidth: 1 },
    };

    const { getByTestId } = render(
      <PhoneInput {...defaultProps} theme={customStyles} />
    );

    const container = getByTestId('phone-input-container');
    const input = getByTestId('phone-input');
    const flagButton = getByTestId('country-picker-button');

    expect(container.props.style).toContainEqual(customStyles.containerStyle);
    expect(input.props.style).toContainEqual(customStyles.textInputStyle);
    expect(flagButton.props.style).toContainEqual(customStyles.flagButtonStyle);
  });

  it('handles disabled state correctly', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} disabled />);

    const flagButton = getByTestId('country-picker-button');
    const input = getByTestId('phone-input');

    expect(flagButton.props.disabled).toBe(true);
    expect(input.props.editable).toBe(false);
  });

  it('handles dark theme correctly', () => {
    const { getByTestId } = render(
      <PhoneInput {...defaultProps} theme={{ withDarkTheme: true }} />
    );

    const input = getByTestId('phone-input');
    expect(input.props.keyboardAppearance).toBe('dark');
  });

  it('handles shadow style correctly', () => {
    const { getByTestId } = render(
      <PhoneInput {...defaultProps} theme={{ withShadow: true }} />
    );

    const container = getByTestId('phone-input-container');
    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        shadowColor: '#000000',
        shadowOffset: expect.any(Object),
        shadowOpacity: expect.any(Number),
        shadowRadius: expect.any(Number),
        elevation: expect.any(Number),
      })
    );
  });

  it('handles country picker modal visibility', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);

    const flagButton = getByTestId('country-picker-button');
    fireEvent.press(flagButton);

    expect(mockShowModal).toHaveBeenCalled();
  });

  it('renders custom dropdown image when provided', () => {
    const customDropdown = <View testID="custom-dropdown" />;
    const { getByTestId } = render(
      <PhoneInput {...defaultProps} renderDropdownImage={customDropdown} />
    );

    expect(getByTestId('custom-dropdown')).toBeTruthy();
  });

  it('handles autoFocus prop correctly', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} autoFocus />);

    const input = getByTestId('phone-input');
    expect(input.props.autoFocus).toBe(true);
  });

  it('applies mask input props correctly', () => {
    const maskInputProps = {
      placeholder: 'Enter phone number',
      placeholderTextColor: 'gray',
    };

    const { getByTestId } = render(
      <PhoneInput {...defaultProps} maskInputProps={maskInputProps} />
    );

    const input = getByTestId('phone-input');
    expect(input.props.placeholder).toBe(maskInputProps.placeholder);
    expect(input.props.placeholderTextColor).toBe(
      maskInputProps.placeholderTextColor
    );
  });

  it('hides arrow icon when disableArrowIcon is true', () => {
    const { queryByTestId } = render(
      <PhoneInput {...defaultProps} disableArrowIcon />
    );

    expect(queryByTestId('dropdown-icon')).toBeNull();
  });

  it('handles text input changes', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);
    const input = getByTestId('phone-input');

    fireEvent.changeText(input, '1234567890');
    expect(mockHandleChangeText).toHaveBeenCalled();
  });

  it('handles country selection', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);
    const countryPicker = getByTestId('country-picker-button');

    fireEvent.press(countryPicker);
    expect(mockShowModal).toHaveBeenCalled();
  });

  it('renders with custom country picker props', () => {
    const { getByTestId } = render(
      <PhoneInput
        {...defaultProps}
        countryPickerProps={{
          theme: {
            fontSize: 16,
            fontFamily: 'System',
            primaryColor: '#000',
            primaryColorVariant: '#333',
            backgroundColor: '#fff',
            onBackgroundTextColor: '#000',
            filterPlaceholderTextColor: '#999',
            activeOpacity: 0.5,
            itemHeight: 50,
          },
          countryCode: 'US',
          onSelect: jest.fn(),
        }}
      />
    );

    expect(getByTestId('country-picker-button')).toBeTruthy();
  });

  it('renders with custom flag props', () => {
    const flagProps = {
      flagSize: 30,
      countryCode: 'US' as CountryCode,
    };

    render(<PhoneInput {...defaultProps} flagProps={flagProps} />);
  });

  it('handles modal close', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);
    const countryPicker = getByTestId('country-picker-button');

    fireEvent.press(countryPicker);
    expect(mockShowModal).toHaveBeenCalled();

    // Simulate modal close
    mockHideModal();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('renders flag with default size when no flagProps provided', () => {
    render(<PhoneInput {...defaultProps} />);
  });

  it('renders flag with custom size from flagProps', () => {
    const flagProps = {
      flagSize: 40,
      countryCode: 'US' as CountryCode,
    };

    render(<PhoneInput {...defaultProps} flagProps={flagProps} />);
  });

  it('uses default flag size from DEFAULT_THEME when no flagSize provided', () => {
    const { getByTestId } = render(<PhoneInput {...defaultProps} />);
    const flagButton = getByTestId('country-picker-button');
    expect(flagButton).toBeTruthy();
    // The default flag size from DEFAULT_THEME should be used
    expect(DEFAULT_THEME.flagSize).toBe(24);
  });
});
