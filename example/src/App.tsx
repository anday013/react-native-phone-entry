import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PhoneInput,
  isValidNumber,
  type CallingCode,
  type CountryCode,
} from 'react-native-phone-entry';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [callingCode, setCallingCode] = useState<CallingCode>('+1');
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePhoneChange = (text: string | undefined) => {
    const newText = text || '';
    setPhoneNumber(newText);
    setIsValid(isValidNumber(newText, countryCode));
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      return !prev;
    });
  };

  const toggleDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Phone Number Input Demo
        </Text>

        {/* Default PhoneInput */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Basic Usage
          </Text>
          <PhoneInput
            value={phoneNumber}
            defaultValues={{
              countryCode,
              callingCode,
              phoneNumber: '+1',
            }}
            onChangeCountry={(country) => {
              console.log('Country changed:', country);
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0] || '');
            }}
            onChangeText={handlePhoneChange}
            disabled={isDisabled}
            theme={{
              enableDarkTheme: isDarkMode,
              containerStyle: styles.phoneInputContainer,
              textInputStyle: [
                styles.phoneInputText,
                isDarkMode && styles.darkText,
              ],
              codeTextStyle: [styles.codeText, isDarkMode && styles.darkText],
            }}
          />
        </View>

        {/* Validation Status */}
        <View style={styles.validationContainer}>
          <Text
            style={[
              styles.validationText,
              isDarkMode && styles.darkText,
              isValid ? styles.validText : styles.invalidText,
            ]}
          >
            {phoneNumber
              ? `Phone number is ${isValid ? 'valid' : 'invalid'}`
              : 'Enter a phone number'}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.darkButton]}
            onPress={toggleDisabled}
          >
            <Text style={styles.buttonText}>
              {isDisabled ? 'Enable Input' : 'Disable Input'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.darkButton]}
            onPress={toggleTheme}
          >
            <Text style={styles.buttonText}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Debug Info */}
        <View style={styles.debugContainer}>
          <Text style={[styles.debugText, isDarkMode && styles.darkText]}>
            Country Code: {countryCode}
            {'\n'}
            Calling Code: {callingCode}
            {'\n'}
            Phone Number: {phoneNumber}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  phoneInputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phoneInputText: {
    fontSize: 16,
  },
  codeText: {
    fontSize: 16,
  },
  darkText: {
    color: '#fff',
  },
  validationContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  validationText: {
    fontSize: 16,
  },
  validText: {
    color: '#4CAF50',
  },
  invalidText: {
    color: '#f44336',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  darkButton: {
    backgroundColor: '#3f51b5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  debugText: {
    fontFamily: 'monospace',
  },
});
