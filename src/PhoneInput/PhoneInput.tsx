import React, { useCallback, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
import { maskPerCountry } from './utils';

const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const {
    models: { code, countryCode, phoneNumber },
    actions: { handleChangeText, onSelect },
    forms: { modalVisible, setModalVisible },
  } = usePhoneInput(props);

  const {
    withShadow,
    withDarkTheme,
    codeTextStyle,
    maskInputProps,
    textInputStyle,
    autoFocus,
    placeholder = 'Phone Number',
    disableArrowIcon,
    flagButtonStyle,
    containerStyle,
    textContainerStyle,
    renderDropdownImage,
    countryPickerProps = {},
    filterProps = {},
    countryPickerButtonStyle,
    layout = 'first',
    disabled,
  } = props;

  const _renderDropdownImage = useMemo(() => {
    return (
      <Image
        source={{ uri: dropDown }}
        resizeMode="contain"
        style={styles.dropDownImage}
      />
    );
  }, []);

  const renderFlagButton = useCallback(
    (flagProps: any) => {
      const flagSize = countryPickerProps.flagSize || DEFAULT_THEME.flagSize;
      if (layout === 'first') {
        return (
          <Flag countryCode={countryCode} flagSize={flagSize} {...flagProps} />
        );
      }
      return <View />;
    },
    [countryCode, countryPickerProps.flagSize, layout]
  );

  return (
    <CountryModalProvider>
      <View
        style={[
          styles.container,
          withShadow ? styles.shadow : {},
          containerStyle,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.flagButtonView,
            layout === 'second' ? styles.flagButtonExtraWidth : {},
            flagButtonStyle,
            countryPickerButtonStyle,
          ]}
          disabled={disabled}
          onPress={() => setModalVisible(true)}
        >
          <CountryPicker
            onSelect={onSelect}
            withEmoji
            withFilter
            withFlag
            filterProps={filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabled}
            visible={modalVisible}
            theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
            renderFlagButton={renderFlagButton}
            onClose={() => setModalVisible(false)}
            {...countryPickerProps}
          />
          {code && layout === 'second' && (
            <Text style={[styles.codeText, codeTextStyle]}>{`+${code}`}</Text>
          )}
          {!disableArrowIcon &&
            (renderDropdownImage || <>{_renderDropdownImage}</>)}
        </TouchableOpacity>
        <View style={[styles.textContainer, textContainerStyle]}>
          {code && layout === 'first' && (
            <Text style={[styles.codeText, codeTextStyle]}>{`+${code}`}</Text>
          )}
          <MaskInput
            style={[styles.numberText, textInputStyle]}
            mask={maskPerCountry[countryCode]}
            placeholder={placeholder}
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
