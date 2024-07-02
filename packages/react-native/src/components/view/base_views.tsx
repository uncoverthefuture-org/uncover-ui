import React from "react";
import { KeyboardAvoidingViewProps, Platform, StatusBarProps, StatusBarStyle } from "react-native";
import { BaseViewContainer } from "./styled";
import { FocusAwareStatusBar } from "../status_bar";
import { useThemeMode } from "@providers/hooks";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { useExtendedStyle } from "@hooks/extended_style_hook";
import { StyledViewProps } from "./interface";


export interface BaseViewProps extends KeyboardAvoidingViewProps,StyledViewProps {
    focusBarStyle?: StatusBarStyle,
    focusStatusBarProps?: StatusBarProps;
}

export const BaseView: React.FC<BaseViewProps> = ({
    ...rest
}) => {
    const { colors } = useThemeMode();
    const { baseView: props } = useExtendedStyle({ baseView: {
        focusBarStyle: 'dark-content',
        backgroundColor: colors.background,
         ...rest 
    } });
    const focusBarScheme = props?.focusBarStyle ?? "light-content";

    // const height = useHeaderHeight();

    return (
        <BaseViewContainer
            contentContainerStyle={{ flex: 1 }}
            behavior={Platform.select({ ios: 'height', android: undefined })}
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                // android: height + heightPixel(100)
            })}
            enabled={true}
            backgroundColor={props?.backgroundColor}
            {...props}
        >
            <FocusAwareStatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={focusBarScheme}
                {...props?.focusStatusBarProps}
            />

            {props?.children}
        </BaseViewContainer>
    )
}

// base safe view
export interface BaseSafeViewProps extends SafeAreaViewProps {
    baseViewProps?: BaseViewProps;
}

export const BaseSafeView: React.FC<BaseSafeViewProps> = ({
    baseViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseView {...baseViewProps}>
            <SafeAreaView style={{ flex: 1 }} {...rest}>
                {children}
            </SafeAreaView>
        </BaseView>
    )
}

