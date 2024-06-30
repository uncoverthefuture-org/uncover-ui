import React from "react"
import { ActivityIndicator, ActivityIndicatorProps, ColorValue } from "react-native"
import { LoadingContainer, LoadingSection } from "./styled"
import { hp } from "@utilities/general"
import { useExtendedStyle } from "@hooks/extended_style_hook"


export interface LoadingViewProps {
    margin?: number,
    color?: ColorValue,
    bgColor?: ColorValue,
    loaderSize?: number | "small" | "large",
    lodaderProps?: ActivityIndicatorProps
}

export const LoadingView: React.FC<LoadingViewProps> = ({
    ...rest
}) => {
    const { loadingView: props } = useExtendedStyle({
        loadingView: {
            margin: 5,
            color: "#fff",
            ...rest
        }
    });

    return (
        <LoadingSection
            size={hp(props?.margin ?? 5)}
            backgroundColor={props?.bgColor}
            {...props}
        >
            <ActivityIndicator
                animating
                color={props?.color}
                size={props?.loaderSize}
                {...props?.lodaderProps}
            />
        </LoadingSection>
    )
}