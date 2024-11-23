import React, { useState } from "react";
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
  loaderComponennt?: React.ReactElement;
  focusedBackgroundColor?: string;
  disabled?: boolean;
  onPress?: ()=> void
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false)
  const { colors, styledProps } = useThemeMode();
  const { primaryButton: props } = extendStyledProps(styledProps, {
    primaryButton: {
      focusedBackgroundColor: colors.primary,
      backgroundColor: colors.primary,
      loadColor: colors.white,
      color: colors?.white,
      ...styledProps?.primaryButton,
      ...rest,
    }
  });
  const activeBackgroundColor = (props?.isLoading || pressed || props?.disabled) ? props?.focusedBackgroundColor : props?.backgroundColor;

  // console.log("button props: ", props)
  
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
        (children ?? props?.children) ?? (
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
  children,
  ...rest
}) => {
  const { colors, styledProps } = useThemeMode();
  const { primaryButton: props } = extendStyledProps(styledProps, {
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
        (children ?? props?.children) ?? (
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
