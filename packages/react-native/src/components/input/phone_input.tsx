import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { widthPixel } from "@utilities/pxToDpConvert";
import { useThemeMode } from "@providers/hooks";
import { BottomText, InputWrapper, Label } from "./styled";
import { InputColorState, PrimaryInputProps } from "./main";
import { extendStyledProps } from "@themes/main";


export interface PrimaryPhoneInputProps extends Omit<PrimaryInputProps, 'onChange'> {
    showBottomText?: boolean;
    singleCountry?: boolean;
    onChange?: (text: string) => void;
}

export const PrimaryPhoneInput: React.FC<PrimaryPhoneInputProps> = ({
    ...rest
}) => {
    const { colors, fonts, styledProps } = useThemeMode();
    const { primaryPhoneInput: props } = extendStyledProps(styledProps, {
        primaryPhoneInput: {
            placeholder: "Phone Number",
            ...rest
        }
    });
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
                style={{ paddingVertical: 0, ...(InputColorState(colors, active, props?.inputError,  !props?.editable)), ...props?.containerStyle }}
            >
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={props?.value}
                    defaultCode="NG"
                    disableArrowIcon={props?.singleCountry}
                    layout="first"
                    containerStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
                    textContainerStyle={{ backgroundColor: 'transparent', paddingLeft: widthPixel(10) }}
                    codeTextStyle={{ fontFamily: fonts?.bold }}
                    textInputStyle={{ fontFamily: fonts?.regular }}
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