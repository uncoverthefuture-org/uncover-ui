import React, { useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ColorValue,
  StyleProp,
  TextStyle,
} from "react-native";
import { ButtonOutlineView, ButtonSolidView, ButtonText } from "./styled";
import { useThemeMode } from "@providers/hooks";
import { StyledTextProps } from "@components/text";
import { useExtendedStyle } from "@hooks/extended_style_hook";
import { ButtonStylePropsExtra } from "./interface";



export interface PrimaryButtonProps extends ButtonStylePropsExtra {
  text?: string;
  isLoading?: boolean;
  textProps?: StyledTextProps,
  color?: StyledTextProps['color'];
  textStyle?: StyleProp<TextStyle>;
  isTransparent?: boolean;
  loadColor?: ColorValue;
  icon?: React.ReactElement;
  loaderProps?: ActivityIndicatorProps;
  loaderComponennt?: React.ReactElement;  
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  ...rest
}) => {
  const { colors } = useThemeMode();
  const { primaryButton: props } = useExtendedStyle({
    primaryButton: {
      backgroundColor: colors.primary,
      focusedBackgroundColor: colors.primary,
      loadColor: colors.white,
      color: colors?.white,
      ...rest
    }
  });
  const [pressed, setPressed] = useState(false)
  const activeBackgroundColor = (props?.isLoading || pressed || props?.disabled) ? props?.focusedBackgroundColor : props?.backgroundColor;

  return (
    <ButtonSolidView
      activeOpacity={0.7}
      onPress={props?.onPress}
      disabled={props?.isLoading || props?.disabled}
      backgroundColor={activeBackgroundColor}
      borderColor={activeBackgroundColor}
      borderWidth={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      {!props?.isLoading ? (
        (props?.children) ? (props?.children) : (
          <>
            {props?.icon}
            <ButtonText
              color={props?.color}
              style={props?.textStyle}
              {...props?.textProps}
            >
              {props?.text}
            </ButtonText>
          </>
        )
      ) : ((props?.loaderComponennt) ?? (
        <ActivityIndicator
          color={props?.loadColor}
          animating={props?.isLoading}
          size="small"
          style={{ paddingVertical: 5 }}
          {...props?.loaderProps}
        />
      ))}
    </ButtonSolidView>
  );
};

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({
  ...rest
}) => {
  const { colors } = useThemeMode();
  const { primaryButton: props } = useExtendedStyle({
    primaryButton: {
      borderColor: colors?.primary,
      color: colors?.primary,
      loadColor: colors?.primary,
      ...rest
    }
  });


  return (
    <ButtonOutlineView
      backgroundColor="transparent"
      borderColor={props?.borderColor}
      activeOpacity={0.7}
      onPress={props?.onPress}
      borderWidth={3}
      {...rest}
    >
      {!props?.isLoading ? (
        (props?.children) ? (props?.children) : (
          <>
            {props?.icon}
            <ButtonText
              color={props?.color}
              style={props?.textStyle}
              {...props?.textProps}
            >
              {props?.text}
            </ButtonText>
          </>
        )
      ) : ((props?.loaderComponennt) ?? (
        <ActivityIndicator
          color={props?.loadColor}
          animating={props?.isLoading}
          size="small"
          {...props?.loaderProps}
        />
      ))}
    </ButtonOutlineView>
  );
};
