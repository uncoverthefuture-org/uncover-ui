import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ColorValue,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from "react-native";
import { ButtonOutlineView, ButtonSolidView, ButtonText } from "./styled";
import { useThemeMode } from "@providers/hooks";
import { StyledTextProps } from "@components/text";
import { extendStyledProps } from "@themes/main";



export interface PrimaryButtonProps extends ViewStyle, Omit<ViewProps, 'hitSlop'>, TouchableOpacityProps {
  text?: string;
  isLoading?: boolean;
  textProps?: StyledTextProps,
  color?: StyledTextProps['color'];
  textStyle?: StyleProp<TextStyle>;
  isTransparent?: boolean;
  loadColor?: ColorValue;
  icon?: React.ReactElement;
  loaderProps?: ActivityIndicatorProps;
  loaderComponent?: React.ReactElement;
  inactiveBackgroundColor?: string;
  focusedBackgroundColor?: string;
  inactiveBorderColor?: string;
  focusedBorderColor?: string;
  focusedOpacity?: string;
  disabled?: boolean;
  onPress?: () => void
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false)
  const { colors, styledProps } = useThemeMode();
  const { primaryButton: props } = extendStyledProps(styledProps, {
    primaryButton: {
      inactiveBackgroundColor: colors.disabled,
      focusedBackgroundColor: colors.primary,
      backgroundColor: colors.primary,
      inactiveBorderColor: colors.disabled,
      focusedBorderColor: colors.primary,
      borderColor: colors.primary,
      loadColor: colors.white,
      color: colors?.white,
      activeOpacity: 0.7,
      // ...styledProps?.primaryButton,
      // ...rest,
    }
  });
  const _props = useMemo(() => ({
    ...props,
    ...styledProps?.primaryButton,
    ...rest
  }), [props, styledProps?.primaryButton, rest]);

  const isDisabled = useMemo(() => (_props?.isLoading || _props?.disabled), [_props]);

  const backgroundColor = useMemo(() => {
    if(_props?.disabled) return _props?.inactiveBackgroundColor;
    if(pressed || _props?.isLoading ) return _props?.focusedBackgroundColor;

    return _props?.backgroundColor;
  }, [_props]);

  const borderColor = useMemo(() => {
    if(_props?.disabled) return _props?.inactiveBorderColor;
    if(pressed || _props?.isLoading ) return _props?.focusedBorderColor;

    return _props?.borderColor;
  }, [_props]);

  // console.log("button props: ", props)

  return (
    <ButtonSolidView
      opacity={isDisabled ? _props?.activeOpacity : 1}
      onPress={props?.onPress}
      disabled={props?.isLoading || props?.disabled}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {..._props}
    >
      {(!_props?.isLoading) ? (
        (children ?? _props?.children) ?? (
          <>
            {_props?.icon}
            <ButtonText
              color={_props?.color}
              style={_props?.textStyle}
              {..._props?.textProps}
            >
              {_props?.text}
            </ButtonText>
          </>
        )
      ) : ((_props?.loaderComponent) ?? (
        <ActivityIndicator
          color={_props?.loadColor}
          animating={_props?.isLoading}
          size="small"
          style={{ paddingVertical: 5 }}
          {..._props?.loaderProps}
        />
      ))}
    </ButtonSolidView>
  );
};

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...rest
}) => {
  const { colors } = useThemeMode();


  return (
    <PrimaryButton
      backgroundColor={colors.transparent}
      color={colors.primary}
      {...rest}
    />
  );
};
