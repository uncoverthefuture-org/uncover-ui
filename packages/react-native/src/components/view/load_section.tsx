import { RegularText } from "@components/text";
import { ActivityIndicator, View, ViewProps } from "react-native"
import { ViewContainer } from "./styled";
import { ViewContainerProps } from "./types";
import React from "react";

export interface LoadSectionProps extends ViewContainerProps{
    isLoading?: boolean;
    loadingColor?: string;
    loadingSize?: number | "large" | "small";
    text?: string;
    color?: string;
}

export const LoadSection: React.FC<LoadSectionProps> = ({
    isLoading = false,
    loadingColor,
    loadingSize = 'large',
    color = "#6e7dab",
    text = "",
    ...rest
}) => {
    return (
        <ViewContainer
            style={[{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }, rest?.style]}
            {...rest}
        >
            {(isLoading) ? (
                <ActivityIndicator
                    color={loadingColor}
                    size={loadingSize}
                />
            ) : (
                <RegularText
                    textAlign="center"
                    color={color}
                >{text}</RegularText>
            )}
        </ViewContainer>
    )
}