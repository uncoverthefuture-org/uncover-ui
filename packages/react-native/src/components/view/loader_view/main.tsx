import React from "react"
import { ActivityIndicator, ActivityIndicatorProps, ColorValue, ViewProps } from "react-native"
import { LoadingSection } from "./styled";
import { hp } from "@utilities/general"
import { StyledViewProps } from "../interface"
import { useThemeMode } from "@providers/hooks"
import { extendStyledProps } from "@themes/main"


export interface LoadingViewProps extends StyledViewProps, ViewProps {
    margin?: number,
    color?: ColorValue,
    bgColor?: ColorValue,
    loaderSize?: number | "small" | "large",
    lodaderProps?: ActivityIndicatorProps
}

export const LoadingView: React.FC<LoadingViewProps> = ({
    children,
    ...rest
}) => {
    const { colors, styledProps } = useThemeMode();
    const { loadingView: props } = extendStyledProps(styledProps, {
        loadingView: {
            margin: 5,
            color: colors.white,
            ...rest
        }
    });

    return (
        <LoadingSection
            size={hp(props?.margin ?? 5)}
            backgroundColor={props?.bgColor}
            {...props}
        >
            {(children ?? props?.children) ?? (
                <ActivityIndicator
                    animating
                    color={props?.color}
                    size={props?.loaderSize}
                    {...props?.lodaderProps}
                />
            )}
        </LoadingSection>
    )
}