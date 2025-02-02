import React, { useCallback, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import CountryPicker, {
  CountryModalProvider,
  DARK_THEME,
  DEFAULT_THEME,
  Flag,
} from 'react-native-country-picker-modal';
import MaskInput from 'react-native-mask-input';
import type { PhoneInputProps } from './PhoneInput.types';
import styles from './styles';
import { usePhoneInput } from './usePhoneInput';

const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const {
    models: { countryCode, phoneNumber, mask, inputRef },
    actions: { handleChangeText, onSelect },
    forms: { modalVisible, showModal, hideModal },
  } = usePhoneInput(props);

  const {
    theme: {
      withDarkTheme,
      withShadow,
      textInputStyle,
      flagButtonStyle,
      containerStyle,
      countryPickerButtonStyle,
    } = {},
    maskInputProps,
    autoFocus,
    disableArrowIcon,
    renderDropdownImage,
    countryPickerProps,
    flagProps,
    disabled,
  } = props;

  const _renderDropdownImage = useMemo(() => {
    return (
      <Image
        testID="dropdown-icon"
        source={{ uri: dropDown }}
        resizeMode="contain"
        style={styles.dropDownImage}
      />
    );
  }, []);

  const renderFlagButton = useCallback(() => {
    const flagSize = flagProps?.flagSize || DEFAULT_THEME.flagSize;
    return (
      <Flag countryCode={countryCode} flagSize={flagSize} {...flagProps} />
    );
  }, [countryCode, flagProps]);

  return (
    <CountryModalProvider>
      <View
        testID="phone-input-container"
        style={[
          styles.container,
          withShadow ? styles.shadow : {},
          containerStyle,
        ]}
      >
        <TouchableOpacity
          testID="country-picker-button"
          style={[
            styles.flagButtonView,
            flagButtonStyle,
            countryPickerButtonStyle,
          ]}
          disabled={disabled}
          onPress={showModal}
        >
          <CountryPicker
            onSelect={onSelect}
            withEmoji
            withFilter
            withFlag
            filterProps={countryPickerProps?.filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabled}
            visible={modalVisible}
            theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
            renderFlagButton={renderFlagButton}
            onClose={hideModal}
            {...countryPickerProps}
          />
          {!disableArrowIcon &&
            (renderDropdownImage || <>{_renderDropdownImage}</>)}
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
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
            keyboardAppearance={withDarkTheme ? 'dark' : 'default'}
            keyboardType="number-pad"
            autoFocus={autoFocus}
            {...maskInputProps}
          />
        </View>
      </View>
    </CountryModalProvider>
  );
};
