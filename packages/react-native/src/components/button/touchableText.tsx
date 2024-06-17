import React, { ReactNode } from "react"
import { ViewStyle } from "react-native";
import { RegularText, RegularTextProps } from "../text/styled"
import { StyledTouchable } from "./styled"


interface TouchableTextProps extends RegularTextProps {
    value?: string;
    onPress?: () => void;
    containerStyle?: ViewStyle
}

export const TouchableText: React.FC<TouchableTextProps>= ({
    value,
    onPress,
    containerStyle,
    ...rest
}) => {
    return (
        <StyledTouchable
         onPress={onPress} 
         style={{ ...containerStyle}}
         >
            <RegularText {...rest}>
                {value}
            </RegularText>
        </StyledTouchable>
    )
}