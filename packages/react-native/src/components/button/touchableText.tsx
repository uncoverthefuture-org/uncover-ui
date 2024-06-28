import React, { ReactNode } from "react"
import { ViewStyle } from "react-native";
import { RegularText, RegularTextProps } from "../text/styled"
import { StyledTouchable } from "./styled"
import { useExtendedStyle } from "hooks/extended_style_hook";


export interface TouchableTextProps extends RegularTextProps {
    value?: string;
    onPress?: () => void;
    containerStyle?: ViewStyle
}

export const TouchableText: React.FC<TouchableTextProps> = ({
    ...rest
}) => {
    const { touchableText: props } = useExtendedStyle({ touchableText: { ...rest } });

    return (
        <StyledTouchable
            onPress={props?.onPress}
            style={{ ...props?.containerStyle }}
            {...props}
        >
            <RegularText {...rest}>
                {props?.value}
            </RegularText>
        </StyledTouchable>
    )
}