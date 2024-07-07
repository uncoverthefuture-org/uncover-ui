import { RFFontSize, RFLineHeight, RegularText } from "@components/text";
import styled from "@emotion/native";
import { heightPixel, widthPixel } from "@utilities/index";
import { Platform } from "react-native";
import { StyledInputProps, InputBoxProps } from "./interface";
import { spacingSize } from "@components/view";



export const StyledInput = styled.TextInput<StyledInputProps>(({
  ...rest
}) => ({
  paddingHorizontal: rest?.paddingHorizontal,
  paddingVertical: rest?.paddingVertical,
  borderRadius: rest?.borderRadius,
  alignItems: rest?.alignItems,
  justifyContent: rest?.justifyContent,
  backgroundColor: rest?.backgroundColor,
  width: rest?.width,
  height: rest?.height,
  borderColor: rest?.borderColor,
  borderWidth: rest?.borderWidth,
  marginTop: rest?.marginTop,
  marginBottom: rest?.marginBottom,
  marginLeft: rest?.marginLeft,
  marginRight: rest?.marginRight,
  opacity: rest?.opacity,
  padding: rest?.padding,
  zIndex: rest?.zIndex,
  position: rest?.position,
  flex: rest?.flex,
  flexGrow: rest?.flexGrow,
  textTransform: rest?.textTransform,
  fontSize: rest?.fontSize,
  fontFamily: rest?.fontFamily,
  lineHeight: rest?.lineHeight,
  color: rest?.color,
}))

export const InputBox = styled(StyledInput)<InputBoxProps>(({
  theme,
  hasIcon = false,
  fontSize = RFFontSize.sm,
  lineHeight = fontSize * 1.2,
  fontFamily = theme?.fonts?.medium,
  color = theme.colors.text
}) => ({
  paddingLeft: widthPixel((!hasIcon) ? 0 : spacingSize.i10),
  fontSize: fontSize,
  fontFamily: fontFamily,
  borderWidth: 0,
  flexGrow: 1,
  lineHeight,
  backgroundColor: "transparent",
  color
}));

export const InputWrapper = styled.View<{

}>(({

}) => ({
  paddingHorizontal: widthPixel(spacingSize.i14),
  paddingVertical: heightPixel(Platform.OS == "android" ? spacingSize.i12 : spacingSize.i14),
  marginBottom: heightPixel(spacingSize.i10),
  borderWidth: 1,
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const BottomText = styled(RegularText)({
  paddingLeft: 15,
  paddingBottom: 10,
  fontSize: RFFontSize.xs
});

export const Label = styled(RegularText)(({
  color,
  theme
}) => ({
  fontFamily: theme?.fonts?.medium,
  fontSize: RFFontSize.xs,
  lineHeight: RFLineHeight.xs,
  paddingBottom: heightPixel(spacingSize.i10),
  color,
  // paddingLeft: widthPixel(15),
}));

export const InputIconBox = styled.View({
  paddingHorizontal: widthPixel(spacingSize.i10)
})

export const InputPlaceholderTextSection = styled.View({
  flexGrow: 1,
})

export const InputPlaceholderPressable = styled.Pressable<{

}>(({

}) => ({
  paddingHorizontal: widthPixel(spacingSize.i14),
  paddingVertical: heightPixel(Platform.OS == "android" ? spacingSize.i12 : spacingSize.i14),
  marginBottom: heightPixel(spacingSize.i10),
  borderWidth: 1,
  borderRadius: 8,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))