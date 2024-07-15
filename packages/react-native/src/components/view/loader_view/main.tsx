import React from "react"
import { ActivityIndicator, ActivityIndicatorProps, ColorValue, ViewProps } from "react-native"
import { StyledViewProps } from "../interface"
import { useThemeMode } from "@providers/hooks"
import { extendStyledProps } from "@themes/main"
import { CenterViewContainer, OverlayContainer } from "../styled";


export interface LoadingViewProps extends StyledViewProps, ViewProps {
    margin?: number,
    color?: ColorValue,
    isLoading?: boolean;
    showLoadedState?: boolean;
    loaderSize?: number | "small" | "large",
    lodaderProps?: ActivityIndicatorProps;
    loadingComponent?: React.ReactElement;
    loadedComponent?: React.ReactElement;
    centerContainerProps?: StyledViewProps & ViewProps;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
    children,
    ...rest
}) => {
    const { colors, styledProps } = useThemeMode();
    const { loadingView: props } = extendStyledProps(styledProps, {
        loadingView: {
            color: colors.border,
            ...rest
        }
    });

    return (
        <>
            {(props?.isLoading || props?.showLoadedState) && (
                <OverlayContainer
                    {...props}
                >
                    <CenterViewContainer
                        {...props?.centerContainerProps}
                    >
                        {(props?.loadingComponent && props?.isLoading) ?? (
                            <ActivityIndicator
                                animating
                                color={props?.color}
                                size={props?.loaderSize}
                                {...props?.lodaderProps}
                            />
                        )}

                        {(props?.loadedComponent && !props?.isLoading) ?? (
                            <>
                                {props?.loadedComponent}
                            </>
                        )}
                    </CenterViewContainer>
                </OverlayContainer>
            )}
            {/* child component always in view */}
            {children}
        </>
    )
}

export const LoadingOverlay = LoadingView;