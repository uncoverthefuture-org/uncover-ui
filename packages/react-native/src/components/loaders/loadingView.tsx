import React from "react"
import { ActivityIndicator, ColorValue } from "react-native"
import { LoadingContainer, LoadingSection } from "."
import { hp } from "../../utility/general"

export const LoadingView: React.FC<{
    margin?: number,
    color?: ColorValue,
    bgColor?: ColorValue,
    size?: number | "small" | "large"
}>= ({
    margin = 5,
    color = "#fff", 
    bgColor,
    size
}) => {
    return (
        <LoadingSection size={hp(margin)} background={bgColor}>
            <ActivityIndicator
                animating
                color={color}
                size={size}
            />
        </LoadingSection>
    )
}