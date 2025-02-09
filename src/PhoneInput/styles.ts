import { Dimensions, StyleSheet } from 'react-native';
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
const styles = StyleSheet.create({
  container: {
    width: wp(90),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    height: hp(7),
    minHeight: 56,
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
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropDownImage: {
    height: 16,
    width: 16,
    marginLeft: 4,
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
    paddingHorizontal: wp(4),
    fontSize: 15,
    color: '#1F2937',
    letterSpacing: 0.3,
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
