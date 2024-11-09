import { BaseImage } from "@components/image/styled";
import { BoldText, MediumText } from "@components/text";
import styled from "@emotion/native";
import { fontPixel } from "@utilities/pxToDpConvert";
import { getViewSize } from "@utilities/sizes";
import { DimensionValue } from "react-native";
import { AvatarImageStyleProps } from "./interface";
import { Row } from "@components/view";


export const AvatarImage = styled(BaseImage)<AvatarImageStyleProps>(({
    size = 10,
    height= (getViewSize(size) as DimensionValue),
    width = (getViewSize(size) as DimensionValue),
    borderRadius = 100,
    resizeMode = "cover"
}) => ({
    height,
    width,
    borderRadius,
    resizeMode
}))

export const AvatarContainer = styled(Row)<AvatarImageStyleProps>(({ 
    size = 10,
    height= (getViewSize(size) as DimensionValue),
    width = (getViewSize(size) as DimensionValue),
    borderRadius = 100,
    theme 
}) => ({
    height,
    width,
    borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingTop: 3
}));


export const AvatarText = styled(BoldText)(({
    theme,
}) => ({
    justifyContent: "center",
    alignItems: "center",
    textTransform: 'uppercase',
    lineHeight: 24,
}));

export const Name = styled(MediumText)({
    fontSize: fontPixel(14),
    lineHeight: 20,
    marginTop: 4
});
