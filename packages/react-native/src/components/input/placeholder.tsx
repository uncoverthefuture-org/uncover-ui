import React, { useEffect, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { InputColorState, PrimaryInputProps } from "./main";
import { fontPixel } from 'utilities/pxToDpConvert';
import { RegularText } from "../text/styled";
import { useThemeMode } from "providers/hooks";
import { InputPlaceholderTextSection, InputPlaceholderPressable, Label } from "./styled";
import { useExtendedStyle } from "hooks/extended_style_hook";

export interface InputPlaceholderProps extends PrimaryInputProps {
    containerStyle?: ViewStyle,
    onPress?: () => void;
    rightComponent?: React.ReactElement,
    leftComponent?: React.ReactElement
}

export const InputPlaceholder: React.FC<InputPlaceholderProps> = ({
    onPress = () => { },
    ...rest
}) => {
    const { colors } = useThemeMode();
    const { inputPlaceholder: props } = useExtendedStyle({ inputPlaceholder: { ...rest } });
    const [active, setActive] = useState<boolean>(false);

    const onPlaceholderPress = () => {
        setActive(true);
        onPress();
    }

    useEffect(() => {
        if (active) {
            setActive(false);
        }
    }, [props?.value])

    return (
        <>
            {props?.label ? (
                <Label color={colors.black_2} {...props?.labelProps}>
                    {props?.label}
                </Label>
            ) : null}
            <InputPlaceholderPressable
                onPress={onPlaceholderPress}
                style={{ ...InputColorState(colors, active, props?.inputError), ...props?.containerStyle, }}
            >
                {props?.leftComponent}
                <InputPlaceholderTextSection>
                    <RegularText
                        style={{ fontSize: fontPixel(15), ...props?.textStyle }}
                    >
                        {(props?.value) ? props?.value : props?.placeholder}
                    </RegularText>
                </InputPlaceholderTextSection>
                {props?.rightComponent}
            </InputPlaceholderPressable>
        </>

    );
};

