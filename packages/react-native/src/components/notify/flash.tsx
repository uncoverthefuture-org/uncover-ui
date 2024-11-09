import FlashMessage, { FlashMessageProps } from "react-native-flash-message";
import { RFValue } from "react-native-responsive-fontsize";
import React, { Ref } from "react";
import { useThemeMode } from "@providers/hooks";
import { extendStyledProps } from "@themes/main";

export interface PrimaryFlashMessageProps extends FlashMessageProps {
    innerRef?: Ref<FlashMessage>;
}

export const PrimaryFlashMessage: React.FC<PrimaryFlashMessageProps> = ({
    ...rest
}) => {
    const { fonts, styledProps } = useThemeMode();
    const { primaryFlashMessage: props } = extendStyledProps(styledProps, { primaryFlashMessage: { ...rest } });

    return (
        <FlashMessage
            ref={props?.innerRef}
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

