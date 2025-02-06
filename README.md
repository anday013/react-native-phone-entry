# react-native-phone-entry

<!-- [![npm version](https://badge.fury.io/js/react-native-phone-entry.svg?&kill_cache=1)](https://badge.fury.io/js/react-native-phone-entry)
[![npm](https://img.shields.io/npm/dm/react-native-phone-entry.svg?&kill_cache=1)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg?&kill_cache=1)](https://github.com/anday013/react-native-phone-entry/blob/main/LICENSE) -->

`react-native-phone-entry` is a simple and fully modifiable Phone Number Input Component for React Native that provides an intuitive interface for entering and validating international phone numbers. It includes country code selection, number formatting, and validation features.

## Features

- 🌍 International phone number input with country picker
- 📱 Automatic phone number formatting based on country
- 🔍 Dynamic country and mask adaptation based on typed country code
- ✨ Highly customizable appearance and styling
- 🎯 Phone number validation using Google's libphonenumber
- 🎨 Dark theme support
- ♿ Accessibility support
- 💪 Written in TypeScript

## TODO

- [ ] Fix defaultProp issue with picker library
- [ ] Make similar UI with OTP lib
- [ ] Add Error state
- [ ] Make fully customizable

## Installation

```sh
npm install react-native-phone-entry

# or

yarn add react-native-phone-entry
```

## Usage

1. Import the PhoneInput component:

```jsx
import { PhoneInput } from 'react-native-phone-entry';
```

2. Basic usage:

```jsx
export default function App() {
  return (
    <PhoneInput
      defaultValues={{
        countryCode: 'US',
        callingCode: '+1',
        phoneNumber: '',
      }}
      onChangeText={(text) => console.log('Phone number:', text)}
      onChangeCountry={(country) => console.log('Country:', country)}
    />
  );
}
```

3. Advanced usage with customization:

```jsx
<PhoneInput
  defaultValues={{
    countryCode: 'US',
    callingCode: '+1',
    phoneNumber: '',
  }}
  withShadow
  withDarkTheme
  autoFocus
  placeholder="Enter phone number"
  containerStyle={styles.phoneContainer}
  textContainerStyle={styles.textInput}
  textInputStyle={styles.input}
  flagButtonStyle={styles.flagButton}
  countryPickerButtonStyle={styles.countryPicker}
  layout="second"
  onChangeText={(text) => console.log('Phone number:', text)}
  onChangeCountry={(country) => console.log('Country:', country)}
/>
```

## Props

| Prop                       | Type                         | Description                                                     |
| -------------------------- | ---------------------------- | --------------------------------------------------------------- |
| `defaultValues`            | `object`                     | Default values for country code, calling code, and phone number |
| `value`                    | `string`                     | Controlled value for the phone number input                     |
| `onChangeText`             | `(text: string) => void`     | Callback when phone number changes                              |
| `onChangeCountry`          | `(country: Country) => void` | Callback when selected country changes                          |
| `withShadow`               | `boolean`                    | Adds shadow to the input container                              |
| `withDarkTheme`            | `boolean`                    | Enables dark theme                                              |
| `autoFocus`                | `boolean`                    | Automatically focuses the input when mounted                    |
| `placeholder`              | `string`                     | Placeholder text for the phone number input                     |
| `disabled`                 | `boolean`                    | Disables the input                                              |
| `layout`                   | `'first' \| 'second'`        | Layout style for the country picker and input                   |
| `containerStyle`           | `StyleProp<ViewStyle>`       | Style for the main container                                    |
| `textContainerStyle`       | `StyleProp<ViewStyle>`       | Style for the text input container                              |
| `textInputStyle`           | `StyleProp<TextStyle>`       | Style for the text input                                        |
| `flagButtonStyle`          | `StyleProp<ViewStyle>`       | Style for the flag button                                       |
| `countryPickerButtonStyle` | `StyleProp<ViewStyle>`       | Style for the country picker button                             |
| `countryPickerProps`       | `CountryPickerProps`         | Props for the country picker modal                              |
| `filterProps`              | `object`                     | Props for the country filter                                    |
| `maskInputProps`           | `MaskInputProps`             | Props for the masked input component                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
