import React from "react";
import {
    ImageBackgroundProps,
    KeyboardAvoidingViewProps,
    Platform,
    StatusBarProps,
    StatusBarStyle,
} from "react-native";
import { SafeAreaViewContainer, BaseViewContainer, ImageBackgroundViewContainer } from "./styled";
import { FocusAwareStatusBar } from "../status_bar";
import { useThemeMode } from "@providers/hooks";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { StyledViewProps } from "./interface";
import { extendStyledProps } from "@themes/main";
import { NavHeader, NavHeaderProps } from "@components/header";
import TransparentImage from '@assets/images/transparent-img.png';


export interface BaseViewProps extends KeyboardAvoidingViewProps, StyledViewProps {
    focusBarStyle?: StatusBarStyle,
    focusStatusBarProps?: StatusBarProps;
    backgroundImageSrc?: ImageBackgroundProps['src'];
    backgroundImage?: ImageBackgroundProps['source'];
    backgroundImageColor?: StyledViewProps['backgroundColor'];
    resizeMode?: ImageBackgroundProps['resizeMode'];
    imageBackgroundProps?: Partial<ImageBackgroundProps> & StyledViewProps;
    showHeader?: boolean;
    headerTitle?: NavHeaderProps['title'];
    onBackPress?: NavHeaderProps['onBackPress'];
    navHeaderProps?: NavHeaderProps;
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
            ...rest,
            imageBackgroundProps: {
                src: rest?.backgroundImageSrc,
                source: rest?.backgroundImage,
                backgroundColor: rest?.backgroundImageColor,
                resizeMode: rest?.resizeMode,
                ...rest?.imageBackgroundProps
            },
            navHeaderProps: {
                onBackPress: rest?.onBackPress,
                title: rest?.headerTitle,
                ...rest?.navHeaderProps
            },
        }
    });
    const focusBarScheme = props?.focusBarStyle ?? "light-content";

    return (
        <BaseViewContainer
            contentContainerStyle={[{ flex: 1 }, props?.style]}
            style={props?.style}
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
            {(props?.imageBackgroundProps?.src || props?.imageBackgroundProps?.source || props?.imageBackgroundProps?.defaultSource) ? (
                <ImageBackgroundViewContainer
                    resizeMode="cover"
                    source={TransparentImage}
                    {...props?.imageBackgroundProps}
                >
                    {(props?.showHeader) && (
                        <NavHeader
                            {...props?.navHeaderProps}
                        />
                    )}
                    {children ?? props?.children}
                </ImageBackgroundViewContainer>
            ) : (
                <>
                    {(props?.showHeader) && (
                        <NavHeader
                            {...props?.navHeaderProps}
                        />
                    )}

                    {children ?? props?.children}
                </>
            )}
        </BaseViewContainer>
    )
}

// base safe view
export interface BaseSafeViewProps extends BaseViewProps {
    safeAreaViewProps?: SafeAreaViewProps & StyledViewProps
}

export const BaseSafeView: React.FC<BaseSafeViewProps> = ({
    safeAreaViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseView {...rest}>
            <SafeAreaViewContainer style={{ flex: 1 }} {...safeAreaViewProps}>
                {children}
            </SafeAreaViewContainer>
        </BaseView>
    )
}

