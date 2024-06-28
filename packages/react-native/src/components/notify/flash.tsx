import FlashMessage, {FlashMessageProps} from "react-native-flash-message";
import { StyleSheet } from "react-native";
import { font } from "utilities/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import React from "react";
import { useExtendedStyle } from "hooks/extended_style_hook";

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

export interface PrimaryFlashMessgeProps extends FlashMessageProps{

}

export const PrimaryFlashMessge: React.FC<PrimaryFlashMessgeProps> = ({
    ...rest
}) => {
    const { primaryFlashMessge: props } = useExtendedStyle({ primaryFlashMessge: { ...rest } });

    return (
        <FlashMessage 
            position="top"
            textStyle={CustomFlash.text}
            titleStyle={CustomFlash.title}
            floating={true}
            hideStatusBar={false}
            {...props}
        />
    )
};

