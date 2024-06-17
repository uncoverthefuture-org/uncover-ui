import React from "react";
import { ColorValue, KeyboardAvoidingViewProps, Platform, ScrollView, ScrollViewProps, StatusBarStyle } from "react-native";
import { BaseViewContainer } from "./styled";
import { FocusAwareStatusBar } from "../status_bar";
import { useThemeMode } from "providers/hooks";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";


export interface BaseViewProps extends KeyboardAvoidingViewProps {
    focusBarStyle?: StatusBarStyle,
    backgroundColor?: ColorValue,
}

export const BaseView: React.FC<BaseViewProps> = ({
    focusBarStyle = 'dark-content',
    backgroundColor,
    children
}) => {
    const { colors } = useThemeMode();
    const focusBarScheme = focusBarStyle ?? "light-content";
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
            backgroundColor={colors.background ?? backgroundColor}
        >
            <FocusAwareStatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={focusBarScheme}
            />

            {children}
        </BaseViewContainer>
    )
}

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

export interface BaseSafeScrollViewProps extends ScrollViewProps {
    baseViewProps?: BaseViewProps;
    safeAreaViewProps?: SafeAreaViewProps;
}
export const BaseSafeScrollView: React.FC<BaseSafeScrollViewProps> = ({
    baseViewProps,
    safeAreaViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView baseViewProps={baseViewProps} {...safeAreaViewProps}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} {...rest}>
                {children}
            </ScrollView>
        </BaseSafeView>
    )
}