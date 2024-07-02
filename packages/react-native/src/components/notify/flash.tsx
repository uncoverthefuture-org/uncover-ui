import FlashMessage, { FlashMessageProps } from "react-native-flash-message";
import { RFValue } from "react-native-responsive-fontsize";
import React from "react";
import { useExtendedStyle } from "@hooks/extended_style_hook";
import { useThemeMode } from "@providers/hooks";

export interface PrimaryFlashMessageProps extends FlashMessageProps {

}

export const PrimaryFlashMessage: React.FC<PrimaryFlashMessageProps> = ({
    ...rest
}) => {
    const { fonts } = useThemeMode();
    const { primaryFlashMessage: props } = useExtendedStyle({ primaryFlashMessage: { ...rest } });

    return (
        <FlashMessage
            position="top"
            textStyle={[{
                fontFamily: fonts?.regular,
                fontSize: RFValue(12),
            }, props?.textStyle]}
            titleStyle={[{
                fontFamily: fonts?.medium,
                fontSize: RFValue(13)
            }, props?.titleStyle]}
            floating={true}
            hideStatusBar={false}
            {...props}
        />
    )
};

