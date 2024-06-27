import { BoldText, RFFontSize, RFLineHeight } from "@components/texts";
import styled from "@emotion/native";
import { ColorValue, TouchableOpacity, ViewStyle } from "react-native";
import { widthPixel } from "utilities/pxToDpConvert";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonStylePropsExtra } from "./interface";
import { font } from "utilities/fonts";
import { StyledTouchableOpacity } from "components/views/styled";
import { spacingSize } from "@components/views/sizes";

export const ButtonSolidView = styled(StyledTouchableOpacity)<ButtonStylePropsExtra>(({
    backgroundColor, borderColor, width, borderWidth
}) => ({
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor,
    borderColor,
    paddingVertical: 12,
    width: width,
    borderWidth,
})
);

export const ButtonText = styled(BoldText)({
    textAlign: "center",
}, (props) => ({
    color: props.color,
    fontSize: RFFontSize.sm,
    lineHeight: RFLineHeight.sm,
    fontFamily: font.medium,
    paddingVertical: widthPixel(spacingSize.i5),
    paddingHorizontal: widthPixel(spacingSize.i20),
})
);

export const ButtonOutlineView = styled(ButtonSolidView)({
    borderWidth: 1.7,
});

export const StyledTouchable = styled.TouchableOpacity<{
    paddingHorizontal?: number,
    paddingVertical?: number,
}>(({
    theme,
    paddingHorizontal = spacingSize.i10,
    paddingVertical = spacingSize.i10,
}) => ({
    paddingHorizontal,
    paddingVertical,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
}))

export const ThemedButtonOuter = styled.TouchableOpacity<{ borderColor?: ColorValue }>(({
    theme,
    borderColor = "#000"
}) => ({
    borderTopWidth: 0,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: borderColor,
    paddingBottom: 5,
    backgroundColor: "transparent",
    position: "absolute",
    width: '100%',
    height: '110%'
}))

export const ThemedButtonInner = styled.View<{
    outlined?: boolean,
    isLoading?: boolean,
    borderColor?: ColorValue,
}>(({
    outlined = false,
    theme,
    borderColor = "#000",
    isLoading,
}) => ({
    borderWidth: 2,
    borderRadius: 12,
    marginTop: -1.5,
    borderColor: borderColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: (!outlined) ? "#000000" : "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
}))

export const FloatingTouchableOpacity = styled.TouchableOpacity<{ 
    backgroundColor: string 
}>(({ 
    backgroundColor 
}) => ({
        backgroundColor,
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        padding: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        zIndex: 999,
        shadowColor: '#c4c4c4',
        shadowOpacity: 0.3,
        bottom: 30,
        right: wp(5),
        position: 'absolute'
    })
);

export const IconButton = styled.TouchableOpacity<ViewStyle>(({
    minHeight = 50,
    minWidth = 50,
    ...rest
}) => ({
    minHeight: (typeof minHeight === 'number') ? widthPixel(minHeight) : minHeight,
    minWidth: (typeof minWidth === 'number') ? widthPixel(minWidth) : minWidth,
    padding: rest?.padding,
    height: rest?.height ?? 'auto',
    width: rest?.width ?? 'auto',
    flexDirection: rest?.flexDirection ?? 'row',
    alignItems: rest?.alignItems ?? 'center',
    justifyContent: rest?.justifyContent ?? 'center',
    borderRadius: rest?.borderRadius ?? 5, 
    borderWidth: rest?.borderWidth, 
    borderColor: rest?.borderColor, 
    marginHorizontal: rest?.marginHorizontal, 

}));