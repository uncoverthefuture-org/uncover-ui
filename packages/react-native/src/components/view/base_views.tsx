import React, { useMemo } from "react";
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
            imageBackgroundProps: {
                src: rest?.backgroundImageSrc,
                source: rest?.backgroundImage,
                backgroundColor: rest?.backgroundImageColor,
                resizeMode: rest?.resizeMode,
            },
            navHeaderProps: {
                onBackPress: rest?.onBackPress,
                title: rest?.headerTitle,
            },
        }
    });
    const _props = useMemo(() => ({ 
        ...props, 
        ...styledProps?.baseView, 
        ...rest
    }), [props, styledProps?.baseView, rest]);

    const focusBarScheme = useMemo(() => _props?.focusBarStyle, [_props]);

    return (
        <BaseViewContainer
            contentContainerStyle={[{ flex: 1 }, _props?.style]}
            style={_props?.style}
            behavior={Platform.select({ ios: 'height', android: undefined })}
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                // android: height + heightPixel(100)
            })}
            {..._props}
        >
            <FocusAwareStatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={focusBarScheme}
                {..._props?.focusStatusBarProps}
            />
            {(_props?.imageBackgroundProps?.src || _props?.imageBackgroundProps?.source || _props?.imageBackgroundProps?.defaultSource) ? (
                <ImageBackgroundViewContainer
                    resizeMode="cover"
                    source={TransparentImage}
                    {..._props?.imageBackgroundProps}
                >
                    {(_props?.showHeader) && (
                        <NavHeader
                            {..._props?.navHeaderProps}
                        />
                    )}
                    {children ?? _props?.children}
                </ImageBackgroundViewContainer>
            ) : (
                <>
                    {(_props?.showHeader) && (
                        <NavHeader
                            {..._props?.navHeaderProps}
                        />
                    )}

                    {children}
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

