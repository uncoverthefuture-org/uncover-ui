import { StyleProp, TextInputProps, TextProps, TextStyle, View, ViewStyle } from "react-native";
import { useEffect, useState } from "react";
import { Theme } from "@emotion/react";
import React from "react";
import { useThemeMode } from "@providers/hooks";
import { ActiveIconProp, InputBoxProps } from "./interface";
import { BottomText, InputBox, InputWrapper, Label } from "./styled";
import { useExtendedStyle } from "hooks/extended_style_hook";



export const InputColorState = (colors: Theme['colors'], active?: boolean, error?: boolean) => {
  let borderColor = active ? colors.primary : colors.border;
  let backgroundColor = active ? colors.white : colors.white;
  borderColor = error ? colors.danger : borderColor;
  backgroundColor = error ? colors.white : backgroundColor;

  return {
    borderColor,
    backgroundColor,
  };
}

export interface PrimaryInputProps extends TextInputProps, Omit<InputBoxProps, 'textAlign'> {
  leftIcon?: React.ReactElement | ActiveIconProp;
  rightIcon?: React.ReactElement | ActiveIconProp;
  editable?: boolean;
  label?: string;
  labelProps?: TextProps & { color: string };
  containerStyle?: ViewStyle;
  bottomText?: string;
  inputError?: boolean;
  bottomTextOnError?: boolean;
  textStyle?: TextStyle;
  solid?: boolean;
  isFocused?: (status: boolean) => void;
  onPress?: () => void;
}
export const PrimaryInput: React.FC<PrimaryInputProps> = ({
  ...rest
}) => {
  const { colors } = useThemeMode();
  const { primaryInput: props } = useExtendedStyle({
    primaryInput: {
      editable: true,
      bottomTextOnError: true,
      solid: false,
      placeholderTextColor: colors.placeholder,
      ...rest
    }
  });
  const [active, setActive] = useState<boolean>(Boolean(rest.value));

  useEffect(() => { props?.isFocused && props?.isFocused(active) }, [active]);

  return (
    <View style={{ flexGrow: 1 }}>
      {props?.label ? (
        <Label color={colors.label} {...props?.labelProps}>
          {props?.label}
        </Label>
      ) : null}
      <InputWrapper style={{ ...props?.containerStyle, ...(InputColorState(colors, active, props?.inputError)) }}>
        {((props?.leftIcon as ActiveIconProp)?.active) ? (
          (active) ? (props?.leftIcon as ActiveIconProp)?.active : (props?.leftIcon as ActiveIconProp)?.inActive
        ) : (props?.leftIcon as React.ReactElement)}
        <InputBox
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onPressIn={props?.onPress}
          hasIcon={Boolean(props?.leftIcon)}
          style={[{ ...(InputColorState(colors, active, props?.inputError)) }, props?.textStyle, rest?.style]}
          {...props}
        />
        {((props?.rightIcon as ActiveIconProp)?.active) ? (
          (active) ? (props?.rightIcon as ActiveIconProp)?.active : (props?.rightIcon as ActiveIconProp)?.inActive
        ) : (props?.rightIcon as React.ReactElement)}
      </InputWrapper>
      {(props?.bottomText && !props?.bottomTextOnError) ||
        (props?.bottomText && props?.bottomTextOnError && props?.inputError) ? (
        <BottomText color={props?.inputError ? colors.primary : colors.text}>
          {props?.bottomText}
        </BottomText>
      ) : null}
    </View>
  );
};


