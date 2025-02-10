import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { CountryCode } from 'react-native-country-picker-modal';
import { PhoneInput, isValidNumber } from 'react-native-phone-entry';

export default function App() {
  const [callingCode, setCallingCode] = useState<CountryCode>('AZ');
  return (
    <View style={styles.container}>
      <PhoneInput
        onChangeCountry={(country) => {
          console.log('country changed:', country);
          setCallingCode(country.cca2);
        }}
        onChangeText={(text) =>
          console.log(
            'text changed:',
            text,
            'isValidNumber:',
            isValidNumber(text, callingCode)
          )
        }
        // isCallingCodeEditable={false}
        theme={
          {
            // enableShadow: true,
          }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    // backgroundColor: 'black',
  },
});
