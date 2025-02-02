import { cleanup } from '@testing-library/react-hooks';

// Configure react-hooks testing library
afterEach(() => {
  cleanup();
});

// Mock react-native-mask-input
jest.mock('react-native-mask-input', () => ({
  __esModule: true,
  default: 'MaskInput',
}));

// Mock react-native-country-picker-modal
jest.mock('react-native-country-picker-modal', () => ({
  __esModule: true,
  default: 'CountryPicker',
  Flag: 'Flag',
  CountryModalProvider: 'CountryModalProvider',
  DARK_THEME: {},
  DEFAULT_THEME: {
    flagSize: 24,
  },
}));

// Mock react-native
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
  TextInput: 'TextInput',
  Image: 'Image',
  TouchableOpacity: 'TouchableOpacity',
  View: 'View',
  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) => {
      if (Array.isArray(style)) {
        return Object.assign({}, ...style);
      }
      return style || {};
    },
  },
}));
