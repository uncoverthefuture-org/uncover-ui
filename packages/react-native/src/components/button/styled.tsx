import { BoldText, RFFontSize, RFLineHeight } from "@components/text";
import styled from "@emotion/native";
import { ColorValue } from "react-native";
import { widthPixel } from "@utilities/pxToDpConvert";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyledTouchableOpacity } from "@components/view/styled";
import { spacingSize } from "@components/view/sizes";

export const ButtonSolidView = styled(StyledTouchableOpacity)(({
    borderRadius = 8,
    justifyContent = "center",
    alignItems = "center",
    paddingVertical = 12,
}) => ({
    borderRadius,
    justifyContent,
    alignItems,
    paddingVertical,
}));

export const ButtonText = styled(BoldText)({
    textAlign: "center",
}, (props) => ({
    color: props.color,
    fontSize: RFFontSize.sm,
    lineHeight: RFLineHeight.sm,
    fontFamily: props?.theme?.fonts?.medium,
    paddingVertical: widthPixel(spacingSize.i5),
    paddingHorizontal: widthPixel(spacingSize.i20),
})
);

export const ButtonOutlineView = styled(ButtonSolidView)({
    borderWidth: 1.7,
});

export const StyledTouchable = styled(StyledTouchableOpacity)(({
    paddingHorizontal = spacingSize.i10,
    paddingVertical = spacingSize.i10,
}) => ({
    paddingHorizontal,
    paddingVertical,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
}))

export const ThemedButtonOuter = styled(StyledTouchableOpacity)(({
    borderColor = "#000"
}) => ({
    borderTopWidth: 0,
    borderWidth: 2,
    borderRadius: 12,
    borderColor,
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

export const FloatingTouchableOpacity = styled(StyledTouchableOpacity)(({
    backgroundColor,
    width = wp(12),
    height = wp(12),
    borderRadius = wp(6),
    padding = 5,
    borderWidth = 1,
    borderColor = 'transparent',
    justifyContent = 'center',
    alignItems = 'center',
    elevation = 30,
    zIndex = 999,
    shadowColor = '#c4c4c4',
    shadowOpacity = 0.3,
    bottom = 30,
    right = wp(5),
    position = 'absolute'
}) => ({
    backgroundColor,
    width,
    height,
    borderRadius,
    padding,
    borderWidth,
    borderColor,
    justifyContent,
    alignItems,
    elevation,
    zIndex,
    shadowColor,
    shadowOpacity,
    bottom,
    right,
    position
}));

export const IconButton = styled(StyledTouchableOpacity)(({
    minHeight = 50,
    minWidth = 50,
    ...rest
}) => ({
    minHeight: (typeof minHeight === 'number') ? widthPixel(minHeight) : minHeight,
    minWidth: (typeof minWidth === 'number') ? widthPixel(minWidth) : minWidth,
    height: rest?.height ?? 'auto',
    width: rest?.width ?? 'auto',
    flexDirection: rest?.flexDirection ?? 'row',
    alignItems: rest?.alignItems ?? 'center',
    justifyContent: rest?.justifyContent ?? 'center',
    borderRadius: rest?.borderRadius ?? 5,
}));