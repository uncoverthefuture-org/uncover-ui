import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { font } from "utilities/fonts";
import { widthPixel } from "utilities/pxToDpConvert";
import { useThemeMode } from "providers/hooks";
import { BottomText, InputWrapper, Label } from "./styled";
import { InputColorState, PrimaryInputProps } from "./main";


export interface PrimaryPhoneInputProps extends Omit<PrimaryInputProps, 'onChange'> {
    showBottomText?: boolean;
    singleCountry?: boolean;
    onChange?: (text: string) => void;
}

export const PrimaryPhoneInput: React.FC<PrimaryPhoneInputProps> = ({
    label,
    labelProps,
    placeholder = "Phone Number",
    inputError,
    bottomText,
    showBottomText,
    value,
    singleCountry,
    onChange,
    ...rest
}) => {
    const [active, setActive] = useState<boolean>();
    const { colors } = useThemeMode();
    const phoneInput = useRef<PhoneInput>(null);

    return (
        <>
            {label ? (
                <Label color={colors.black_2} {...labelProps}>
                    {label}
                </Label>
            ) : null}
            <InputWrapper
                style={{ paddingVertical: 0, ...(InputColorState(colors, active, inputError)) }}
            >
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    placeholder={placeholder}
                    defaultCode="NG"
                    disableArrowIcon={singleCountry}
                    layout="first"
                    containerStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
                    textContainerStyle={{ backgroundColor: 'transparent', paddingLeft: widthPixel(10) }}
                    codeTextStyle={{ fontFamily: font.bold }}
                    textInputStyle={{ fontFamily: font.regular }}
                    textInputProps={{ placeholderTextColor: "#828282" }}
                    flagButtonStyle={{ width: widthPixel(50) }}
                    onChangeFormattedText={onChange}
                    {...rest}
                />

            </InputWrapper>
            {(bottomText && showBottomText) || (bottomText && inputError) ? (
                <BottomText color={inputError ? colors.danger : colors.text}>
                    {bottomText}
                </BottomText>
            ) : null}
        </>
    );
};