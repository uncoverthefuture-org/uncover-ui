import React, { Ref, useRef } from "react";
import { fontPixel, heightPixel, hp, widthPixel } from "@utilities/index";
import { StyleSheet } from "react-native";
import OTPTextInput from 'react-native-otp-textinput';
import styled from "@emotion/native";
import { ViewContainer } from "@components/view";
import { StyledViewProps } from "@components/view/interface";


export type OTPTextInputDefaultProps = Partial<OTPTextInput['props']>
export interface OTPHandlerProp extends OTPTextInputDefaultProps {
    value?: string;
    innerRef?: Ref<OTPTextInput>;
    containerProps?: StyledViewProps;
}

export const OTPHandler: React.FC<OTPHandlerProp> = ({
    value,
    innerRef,
    containerProps,
    ...rest
}) => {
    const otpInput = useRef<any>(null);

    return (
        <ViewContainer {...containerProps}>
            <OTPTextInput
                defaultValue={value}
                inputCellLength={1}
                inputCount={4}
                ref={otpInput}
                autoFocus={true}
                textInputStyle={{
                    height: hp(10),
                    width: hp(10),
                }}
                {...rest}
            />
        </ViewContainer>
    )
}


export const TextInput = () => {
    return (
        <OTPHandler
            defaultValue=""
            inputCount={4}
            inputCellLength={1}
        />
    )
}