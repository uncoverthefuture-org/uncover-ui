import { TextInput, TextInputProps, TextProps, TextStyle, View, ViewStyle } from "react-native";
import { useEffect, useState } from "react";
import { Theme } from "@emotion/react";
import React from "react";
import { useThemeMode } from "@providers/hooks";
import { ActiveIconProp, InputBoxProps } from "./interface";
import { BottomText, InputBox, InputWrapper, Label } from "./styled";
import { extendStyledProps } from "@themes/main";
import { StyledTextProps } from "@components/text";
import { ViewContainer } from "@components/view";
import { StyledViewProps } from "@components/view/interface";



export const InputColorState = (colors: Theme['colors'], active?: boolean, error?: boolean, disabled?: boolean) => {
  let color = colors?.text;
  let borderColor = active ? colors.primary : colors.border;
  let backgroundColor = active ? colors.white : colors.white;
  borderColor = error ? colors.danger : borderColor;
  backgroundColor = error ? colors.white : backgroundColor;
  color = disabled ? colors.label : color;
  borderColor = disabled ? colors.border : borderColor;
  backgroundColor = disabled ? colors.disabled : backgroundColor;


  return {
    color,
    borderColor,
    backgroundColor,
  };
}

export interface PrimaryInputProps extends TextInputProps, Omit<InputBoxProps, 'textAlign'> {
  inputRef?: React.Ref<TextInput>;
  leftIcon?: React.ReactElement | ActiveIconProp;
  rightIcon?: React.ReactElement | ActiveIconProp;
  editable?: boolean;
  disabledOpacity?: InputBoxProps['opacity'],
  label?: string;
  labelProps?: StyledTextProps;
  containerProps?: StyledViewProps;
  wrapperProps?: StyledViewProps;
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
  const { colors, styledProps } = useThemeMode();
  const { primaryInput: props } = extendStyledProps(styledProps, {
    primaryInput: {
      editable: true,
      bottomTextOnError: true,
      solid: false,
      placeholderTextColor: colors.placeholder,
      disabledOpacity: 0.7,
      ...styledProps?.primaryInput,
      ...rest
    }
  });
  const [active, setActive] = useState<boolean>(Boolean(rest.value));

  useEffect(() => { props?.isFocused && props?.isFocused(active) }, [active]);

  return (
    <ViewContainer
      paddingHorizontal={0}
      flexGrow={1}
      {...props?.containerProps}
    >
      {props?.label ? (
        <Label color={colors.label} {...props?.labelProps}>
          {props?.label}
        </Label>
      ) : null}
      <InputWrapper
        style={{ ...props?.containerStyle, ...(InputColorState(colors, active, props?.inputError, !props?.editable)) }}
        {...props?.wrapperProps}
      >

        {((props?.leftIcon as ActiveIconProp)?.active || (props?.leftIcon as ActiveIconProp)?.inActive) ? (
          (active && (props?.leftIcon as ActiveIconProp)?.active) ? (props?.leftIcon as ActiveIconProp)?.active : (props?.leftIcon as ActiveIconProp)?.inActive
        ) : (props?.leftIcon as React.ReactElement)}

        <InputBox
          ref={props?.inputRef}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onPressIn={props?.onPress}
          hasIcon={Boolean(props?.leftIcon)}
          style={[{ ...(InputColorState(colors, active, props?.inputError, !props?.editable)) }, props?.textStyle, rest?.style]}
          {...props}
        />
        {((props?.rightIcon as ActiveIconProp)?.active || (props?.rightIcon as ActiveIconProp)?.inActive) ? (
          (active && (props?.rightIcon as ActiveIconProp)?.active) ? (props?.rightIcon as ActiveIconProp)?.active : (props?.rightIcon as ActiveIconProp)?.inActive
        ) : (props?.rightIcon as React.ReactElement)}
      </InputWrapper>

      {(props?.bottomText && !props?.bottomTextOnError) ||
        (props?.bottomText && props?.bottomTextOnError && props?.inputError) ? (
        <BottomText color={props?.inputError ? colors.danger : colors.text}>
          {props?.bottomText}
        </BottomText>
      ) : null}
    </ViewContainer>
  );
};


