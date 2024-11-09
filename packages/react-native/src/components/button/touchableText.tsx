import React, { ReactNode } from "react"
import { ViewStyle } from "react-native";
import { RegularText, StyledTextProps } from "../text/styled"
import { StyledTouchable } from "./styled"
import { useExtendedStyle } from "@hooks/extended_style_hook";
import { useThemeMode } from "@providers/hooks";
import { extendStyledProps } from "@themes/main";


export interface TouchableTextProps extends StyledTextProps {
    value?: string;
    onPress?: () => void;
    containerStyle?: ViewStyle
}

export const TouchableText: React.FC<TouchableTextProps> = ({
    ...rest
}) => {
    const { styledProps } = useThemeMode();
    const { touchableText: props } = extendStyledProps(styledProps, { touchableText: { ...rest } });

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