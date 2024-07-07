import React from "react";
import {
    ImageBackgroundProps,
    KeyboardAvoidingViewProps,
    Platform,
    StatusBarProps,
    StatusBarStyle,
} from "react-native";
import { BaseViewContainer, ImageBackgroundViewContainer } from "./styled";
import { FocusAwareStatusBar } from "../status_bar";
import { useThemeMode } from "@providers/hooks";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { StyledViewProps } from "./interface";
import { extendStyledProps } from "@themes/main";


export interface BaseViewProps extends KeyboardAvoidingViewProps, StyledViewProps {
    focusBarStyle?: StatusBarStyle,
    focusStatusBarProps?: StatusBarProps;
    useImageBackground?: boolean;
    imageBackgroundProps?: ImageBackgroundProps & StyledViewProps
}

export const BaseView: React.FC<BaseViewProps> = ({
    children,
    ...rest
}) => {
    const { colors, styledProps } = useThemeMode();
    const { baseView: props } = extendStyledProps(styledProps, {
        baseView: {
            focusBarStyle: 'dark-content',
            backgroundColor: colors.background,
            ...rest
        }
    });
    const focusBarScheme = props?.focusBarStyle ?? "light-content";

    return (
        <BaseViewContainer
            contentContainerStyle={{ flex: 1 }}
            behavior={Platform.select({ ios: 'height', android: undefined })}
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                // android: height + heightPixel(100)
            })}
            {...props}
        >

            <FocusAwareStatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={focusBarScheme}
                {...props?.focusStatusBarProps}
            />
            {(props?.useImageBackground) ? (
                <ImageBackgroundViewContainer
                    resizeMode="cover"
                    {...props?.imageBackgroundProps}
                >
                    {children ?? props?.children}
                </ImageBackgroundViewContainer>
            ) : (
                <>{children ?? props?.children}</>
            )}
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

