import React from "react"
import { ActivityIndicator, ActivityIndicatorProps, ColorValue } from "react-native";
import { useThemeMode } from "@providers/hooks"
import { extendStyledProps } from "@themes/main"
import { PrimaryModal, PrimaryModalProps } from "./main"


export interface LoadingModalProps extends PrimaryModalProps {
    loaderColor?: ColorValue,
    loaderSize?: number | "small" | "large",
    lodaderProps?: ActivityIndicatorProps
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
    children,
    ...rest
}) => {
    const { colors, styledProps } = useThemeMode();
    const { loadingModal: props } = extendStyledProps(styledProps, {
        loadingModal: {
            loaderColor: colors.border,
            ...rest
        }
    });

    return (
        <PrimaryModal
            flex={1}
            justifyContent="center"
            alignItems="center"
            {...props}
        >
            {(children ?? props?.children) ?? (
                <ActivityIndicator
                    animating
                    color={props?.loaderColor}
                    size={props?.loaderSize}
                    {...props?.lodaderProps}
                />
            )}
        </PrimaryModal>
    )
}