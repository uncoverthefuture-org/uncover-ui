import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { font } from "utilities/fonts";
import { widthPixel } from "utilities/pxToDpConvert";
import { useThemeMode } from "@providers/hooks";
import { BottomText, InputWrapper, Label } from "./styled";
import { InputColorState, PrimaryInputProps } from "./main";
import { useExtendedStyle } from "hooks/extended_style_hook";


export interface PrimaryPhoneInputProps extends Omit<PrimaryInputProps, 'onChange'> {
    showBottomText?: boolean;
    singleCountry?: boolean;
    onChange?: (text: string) => void;
}

export const PrimaryPhoneInput: React.FC<PrimaryPhoneInputProps> = ({
    ...rest
}) => {
    const { colors } = useThemeMode();
    const { primaryPhoneInput: props } = useExtendedStyle({ primaryPhoneInput: { 
        placeholder: "Phone Number",
        ...rest
      } });
    const [active, setActive] = useState<boolean>();
    const phoneInput = useRef<PhoneInput>(null);

    return (
        <>
            {props?.label ? (
                <Label color={colors.label} {...props?.labelProps}>
                    {props?.label}
                </Label>
            ) : null}
            <InputWrapper
                style={{ paddingVertical: 0, ...(InputColorState(colors, active, props?.inputError)), ...props?.containerStyle }}
            >
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={props?.value}
                    defaultCode="NG"
                    disableArrowIcon={props?.singleCountry}
                    layout="first"
                    containerStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
                    textContainerStyle={{ backgroundColor: 'transparent', paddingLeft: widthPixel(10) }}
                    codeTextStyle={{ fontFamily: font.bold }}
                    textInputStyle={{ fontFamily: font.regular }}
                    textInputProps={{ placeholderTextColor: "#828282" }}
                    flagButtonStyle={{ width: widthPixel(50) }}
                    onChangeFormattedText={props?.onChange}
                    {...props}
                />

            </InputWrapper>
            {(props?.bottomText && props?.showBottomText) || (props?.bottomText && props?.inputError) ? (
                <BottomText color={props?.inputError ? colors.danger : colors.text}>
                    {props?.bottomText}
                </BottomText>
            ) : null}
        </>
    );
};