import { StyleSheet, View } from 'react-native';
import { PhoneInput } from 'react-native-phone-entry';

export default function App() {
  return (
    <View style={styles.container}>
      <PhoneInput
        onChangeCountry={(country) => console.log('country changed:', country)}
        onChangeText={(text) => console.log('text changed:', text)}
        callingCodeEditable={false}
        theme={{
          withShadow: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
