import styled from "@emotion/native";
import { Animated, ColorValue, DimensionValue, Platform, TouchableOpacity, ViewStyle } from "react-native";
import { wp, heightPixel, widthPixel, inInExpoEnv, hp, getViewSize } from "@utilities/index";
import { RFSpacingSize, spacingSize } from "./sizes";
import { StyledViewProps } from "./interface";
import { size } from "lodash";

export const LinearGradient = () => {
    if (inInExpoEnv()) {
        return require("expo-linear-gradient").LinearGradient;
    } else {
        return require("react-native-linear-gradient");
    }
}

export const ViewStyles = (rest: StyledViewProps) => ({
    paddingHorizontal: rest?.paddingHorizontal,
    paddingVertical: rest?.paddingVertical,
    borderRadius: rest?.borderRadius,
    alignItems: rest?.alignItems,
    justifyContent: rest?.justifyContent,
    backgroundColor: rest?.bgColor ?? rest?.backgroundColor,
    width: rest?.width,
    height: rest?.height,
    borderColor: rest?.borderColor,
    borderWidth: rest?.borderWidth,
    marginTop: rest?.mt ?? rest?.marginTop,
    marginBottom: rest?.mb ?? rest?.marginBottom,
    marginLeft: rest?.ml ?? rest?.marginLeft,
    marginRight: rest?.mr ?? rest?.marginRight,
    opacity: rest?.opacity,
    padding: rest?.padding,
    zIndex: rest?.zIndex,
    position: rest?.position,
    flex: rest?.flex,
    flexGrow: rest?.flexGrow,
})

export const StyledView = styled(Animated.View)<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledTouchableOpacity = styled.TouchableOpacity<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledImageBackgroundView = styled.ImageBackground<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledModal = styled.Modal<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledScrollView = styled.ScrollView<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledFlatList = styled.FlatList<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledSectionList = styled.SectionList<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))

export const StyledSafeAreaView = styled.SafeAreaView<StyledViewProps>(({
    ...rest
}) => ({
    ...ViewStyles(rest)
}))


export const Row = styled(StyledTouchableOpacity)<StyledViewProps>(({
    flexDirection = "row",
    position = "relative",
}) => ({
    flexDirection,
    position,
}))

export const Card = styled.Pressable<{
    backgroundColor?: ColorValue
    paddingVertical?: number
    paddingHorizontal?: number,
    borderRadius?: number,
    width?: DimensionValue
}>(({
    theme,
    width = "100%",
    backgroundColor = theme.colors.white,
    paddingVertical = 15,
    paddingHorizontal = 15,
    borderRadius = 12
}) => ({
    width,
    backgroundColor: backgroundColor ?? "#fff",
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical,
    borderRadius: borderRadius,
    position: "relative",
    display: "flex"
}))

export const ViewContainer = styled(StyledView)(({
    paddingVertical = 0,
    paddingHorizontal = RFSpacingSize.i20,
}) => ({
    paddingHorizontal,
    paddingVertical,
}));

export const ActionSheetViewContainer = styled(StyledKeyboardAvoidingView)(({
    paddingHorizontal = widthPixel(20),
    paddingTop = heightPixel(25),
    paddingBottom = heightPixel(50),
}) => ({
    paddingHorizontal,
    paddingTop,
    paddingBottom,
}));

export const BaseViewContainer = styled(StyledKeyboardAvoidingView)(({
    flex = 1,
}) => ({
    flex,
}));

export const BaseModal = styled(StyledModal)(({
}) => ({
}));

export const ScrollViewContainer = styled(StyledScrollView)(({
    flex = 1
}) => ({
    flex
}));

export const FlatListContainer = styled(StyledFlatList)(({
}) => ({
}));

export const SectionListContainer = styled(StyledSectionList)(({
}) => ({
}));

export const SafeAreaViewContainer = styled(StyledSafeAreaView)(({
    flex = 1
}) => ({
    flex
}));

export const ImageBackgroundViewContainer = styled(StyledImageBackgroundView)(({
    flex = 1,
}) => ({
    flex,
}));

export const OverlayContainer = styled(StyledView)(({
    flex = 1,
    position = 'absolute',
    width = wp(100),
    height = hp(100),
    zIndex = 99,
    backgroundColor = 'rgba(0,0,0,0.5)'
}) => ({
    flex,
    position,
    width,
    height,
    zIndex,
    backgroundColor,
}));


export const CenterViewContainer = styled(StyledKeyboardAvoidingView)(({
    flex = 1,
    alignItems = "center",
    justifyContent = "center"
}) => ({
    flex,
    alignItems,
    justifyContent,
}));

export const BaseLGView = styled(LinearGradient)({
    flex: 1,
});

export const RoundedActionSheet = {
    borderTopLeftRadius: widthPixel(30),
    borderTopRightRadius: widthPixel(30),
};

export const Divider = styled(StyledView)(({
    height = heightPixel(spacingSize.i20),
    backgroundColor = "#b5b6b7",
}) => ({
    height,
    backgroundColor,
}));

export const Spacer = styled(StyledView)(({
    height = heightPixel(spacingSize.i20)
}) => ({
    height,
}));

export const HSpacer = styled(StyledView)(({
    width = widthPixel(spacingSize.i20)
}) => ({
    width,
}));

export const BottomContainer = styled(ViewContainer)(({
    position = "absolute",
    display = 'flex',
    bottom = 0,
    width = wp('100'),
    paddingTop = heightPixel(spacingSize.i10),
    paddingBottom = heightPixel(Platform.OS === "android" ? spacingSize.i40 : spacingSize.i32),
}) => ({
    paddingTop,
    paddingBottom,
    bottom,
    position,
    display,
    width,
}));