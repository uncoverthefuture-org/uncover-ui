import FlashMessage from "react-native-flash-message";
import { StyleSheet } from "react-native";
import { font } from "utils/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import React from "react";

const CustomFlash = StyleSheet.create({
    text: {
        fontFamily: font.regular,
        fontSize: RFValue(12)
    },
    title: {
        fontFamily: font.medium,
        fontSize: RFValue(13)
    }
});

export const CustomFlashMessage = () => {
    return (
        <FlashMessage 
            position="top"
            textStyle={CustomFlash.text}
            titleStyle={CustomFlash.title}
            floating={true}
            hideStatusBar={false}
        />
    )
};

