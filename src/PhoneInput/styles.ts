import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    height: 60,
    borderWidth: 1,
    borderColor: '#DFDFDE',
  },
  flagButtonView: {
    width: '25%',
    minWidth: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    paddingHorizontal: 8,
  },
  dropDownImage: {
    height: 16,
    width: 16,
    marginLeft: Platform.select({ android: 0, default: 2 }),
    opacity: 0.9,
  },
  codeText: {
    fontSize: 15,
    marginRight: 8,
    fontWeight: '500',
    color: '#374151',
    letterSpacing: 0.3,
  },
  numberText: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1F2937',
    letterSpacing: 0.3,
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
