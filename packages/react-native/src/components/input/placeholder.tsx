import React, { useEffect, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { InputColorState, PrimaryInputProps } from "./main";
import { fontPixel } from 'utilities/pxToDpConvert';
import { RegularText } from "../texts/styled";
import { useThemeMode } from "providers/hooks";
import { InputPlaceholderTextSection, InputPlaceholderPressable, Label } from "./styled";

export interface InputPlaceholderProps extends PrimaryInputProps {
    placeholder?: string;
    value?: string;
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
    inputError?: boolean;
    onPress?: () => void;
    rightComponent?: React.ReactElement,
    leftComponent?: React.ReactElement
}

export const InputPlaceholder: React.FC<InputPlaceholderProps> = ({
    label,
    labelProps,
    placeholder,
    value,
    containerStyle,
    textStyle,
    onPress = () => { },
    inputError,
    rightComponent,
    leftComponent
}) => {
    const { colors } = useThemeMode();
    const [active, setActive] = useState<boolean>(false);

    const onPlaceholderPress = () => {
        setActive(true);
        onPress();
    }

    useEffect(() => {
        if (active) {
            setActive(false);
        }
    }, [value])

    return (
        <>
            {label ? (
                <Label color={colors.black_2} {...labelProps}>
                    {label}
                </Label>
            ) : null}
            <InputPlaceholderPressable
                onPress={onPlaceholderPress}
                style={{ ...containerStyle, ...InputColorState(colors, active, inputError) }}
            >
                {leftComponent}
                <InputPlaceholderTextSection>
                    <RegularText style={{ fontSize: fontPixel(15), ...textStyle }}>
                        {(value) ? value : placeholder}
                    </RegularText>
                </InputPlaceholderTextSection>
                {rightComponent}
            </InputPlaceholderPressable>
        </>

    );
};

