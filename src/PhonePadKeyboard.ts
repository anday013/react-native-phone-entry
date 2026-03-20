import { NativeModules, Platform } from 'react-native';

const { RNPhonePadKeyboard } = NativeModules;

/**
 * Activates the iPhone-style phone-pad keyboard for iPad.
 *
 * Call this **once** at app startup (e.g. at the top level of `App.tsx`).
 * After calling this, any `TextInput` with `keyboardType="phone-pad"` will
 * show a full 12-key dial-pad on iPad instead of the system floating keyboard.
 *
 * On iPhone this is a no-op — the native phone-pad keyboard is already used.
 *
 * Requires the Expo config plugin to be added in app.json:
 *   { "plugins": ["react-native-phone-entry"] }
 */
export function configureIPadPhonePad(): void {
  if (Platform.OS !== 'ios') return;

  if (!RNPhonePadKeyboard) {
    if (__DEV__) {
      console.warn(
        '[react-native-phone-entry] configureIPadPhonePad: native module not found. ' +
          'Add "react-native-phone-entry" to the plugins array in app.json and run ' +
          'expo prebuild.'
      );
    }
    return;
  }

  RNPhonePadKeyboard.configure();
}
