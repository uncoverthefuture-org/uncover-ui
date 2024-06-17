import React, { useRef } from "react";
import { fontPixel, heightPixel, widthPixel } from "utils";
import { StyleSheet } from "react-native";
import OTPTextInput from 'react-native-otp-textinput';
import styled from "@emotion/native";

const Container = styled.View({
    paddingHorizontal: widthPixel(10),
    marginVertical: heightPixel(20),
});

const styles = StyleSheet.create({
    roundedTextInput: {
        backgroundColor: "#E0E0E0",
        borderRadius: widthPixel(15),
        borderBottomWidth: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginBottom: heightPixel(10),
        fontSize: fontPixel(14),
        height: fontPixel(59),
        width: fontPixel(56)
    }
});

export interface OTPHandlerProp {
    cellsNum?: number;
    onInput?: (text: string) => void
}

export const OTPHandler: React.FC<OTPHandlerProp> = ({
    cellsNum = 4,
    onInput
}) => {
    const otpInput = useRef<any>(null);

    return (
        <Container>
            <OTPTextInput
                inputCellLength={1}
                textInputStyle={styles.roundedTextInput}
                inputCount={cellsNum}
                // secureTextEntry={false}
                // editable={true}
                handleTextChange={onInput}
                ref={otpInput}
            />
        </Container>
    )
}

