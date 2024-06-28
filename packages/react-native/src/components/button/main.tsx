import React, { useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ColorValue, StyleProp,
  TextStyle, TouchableOpacityProps
} from "react-native";
import { ButtonOutlineView, ButtonSolidView, ButtonText } from "./styled";
import { useThemeMode, useUncover } from "@providers/hooks";
import { StyledViewProps } from "@components/view";
import { RegularTextProps } from "@components/text";
import { useExtendedStyle } from "hooks/extended_style_hook";



export interface PrimaryButtonProps extends TouchableOpacityProps, StyledViewProps {
  text?: string;
  isLoading?: boolean;
  textProps?: RegularTextProps,
  color?: RegularTextProps['color'];
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
  const { primaryButton: props } = useExtendedStyle({
    primaryButton: {
      loadColor: "#fff",
      ...rest
    }
  });
  const { colors } = useThemeMode();
  const [pressed, setPressed] = useState(false)
  const activeBackgroundColor = (props?.isLoading || pressed) ? colors.secondary_dark_shade : colors.primary;

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
              color={props?.color ?? colors.white}
              style={props?.textStyle}
              {...props?.textProps}
            >
              {props?.text}
            </ButtonText>
          </>
        )
      ) : ((props?.loaderComponennt) ?? (
        <ActivityIndicator
          color={props?.loadColor ?? colors.white}
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
  const { primaryButton: props } = useExtendedStyle({ primaryButton: { ...rest } });
  const { colors } = useThemeMode();

  return (
    <ButtonOutlineView
      backgroundColor="transparent"
      borderColor={"#fff"}
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
              color={colors.white}
              style={props?.textStyle}
              {...props?.textProps}
            >
              {props?.text}
            </ButtonText>
          </>
        )
      ) : ((props?.loaderComponennt) ?? (
        <ActivityIndicator
          animating={props?.isLoading}
          size="small"
          {...props?.loaderProps}
        />
      ))}
    </ButtonOutlineView>
  );
};
