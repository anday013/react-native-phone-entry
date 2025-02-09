import React, { useCallback } from 'react';
import { Appearance, Image, TouchableOpacity, View } from 'react-native';
import CountryPicker, {
  CountryModalProvider,
  DARK_THEME,
  DEFAULT_THEME,
  Flag,
} from 'react-native-country-picker-modal';
import MaskInput from 'react-native-mask-input';
import { EXCLUDED_COUNTRIES } from './constants';
import type { PhoneInputProps } from './PhoneInput.types';
import styles from './styles';
import { usePhoneInput } from './usePhoneInput';

const isDarkTheme = Appearance.getColorScheme() === 'dark';
const dropDownImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const {
    models: { countryCode, phoneNumber, mask, inputRef },
    actions: { handleChangeText, onSelect },
    forms: { modalVisible, showModal, hideModal },
  } = usePhoneInput(props);

  const {
    theme: {
      enableDarkTheme = isDarkTheme,
      textInputStyle,
      flagButtonStyle,
      containerStyle,
      dropDownImageStyle,
    } = {},
    maskInputProps,
    autoFocus,
    hideDropdownIcon,
    renderCustomDropdown,
    countryPickerProps,
    flagProps,
    disabled,
    dropDownImageProps,
  } = props;

  const renderFlagButton = useCallback(
    () => (
      <Flag
        countryCode={countryCode}
        flagSize={flagProps?.flagSize || DEFAULT_THEME.flagSize}
        {...flagProps}
      />
    ),
    [countryCode, flagProps]
  );

  return (
    <CountryModalProvider>
      <View
        testID="phone-input-container"
        style={[styles.container, containerStyle]}
      >
        <TouchableOpacity
          testID="country-picker-button"
          style={[styles.flagButtonView, flagButtonStyle]}
          disabled={disabled}
          onPress={showModal}
        >
          <CountryPicker
            onSelect={onSelect}
            withEmoji
            withFilter
            withFlag
            withAlphaFilter
            filterProps={countryPickerProps?.filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabled}
            visible={modalVisible}
            theme={enableDarkTheme ? DARK_THEME : DEFAULT_THEME}
            renderFlagButton={renderFlagButton}
            excludeCountries={EXCLUDED_COUNTRIES}
            onClose={hideModal}
            {...countryPickerProps}
          />
          {!hideDropdownIcon &&
            (renderCustomDropdown || (
              <Image
                testID="dropdown-icon"
                source={{ uri: dropDownImage }}
                resizeMode="contain"
                style={[styles.dropDownImage, dropDownImageStyle]}
                {...dropDownImageProps}
              />
            ))}
        </TouchableOpacity>
        <MaskInput
          testID="phone-input"
          ref={(ref) => {
            inputRef.current = ref;
          }}
          style={[styles.numberText, textInputStyle]}
          mask={mask}
          onChangeText={handleChangeText}
          value={phoneNumber}
          editable={!disabled}
          selectionColor="black"
          keyboardAppearance={enableDarkTheme ? 'dark' : 'default'}
          keyboardType="number-pad"
          autoFocus={autoFocus}
          {...maskInputProps}
        />
      </View>
    </CountryModalProvider>
  );
};
