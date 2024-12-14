import styled from '@emotion/native';
import { TextProps, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontSize, fontSize as fSize, lineHeight } from './sizes';

export interface StyledTextProps extends TextStyle, TextProps {

}

export const TextStyles = (rest: StyledTextProps) => ({
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
  textAlign: rest?.textAlign,
  textTransform: rest?.textTransform,
  fontFamily: rest?.fontFamily,
  fontWeight: rest?.fontWeight,
  fontSize: rest?.fontSize,
  color: rest?.color,
  lineHeight: rest?.lineHeight,
})

export const RegularText = styled.Text<StyledTextProps>(
  ({
    theme,
    fontSize = fSize.xs,
    lineHeight = fontSize * 1.6,
    color = theme.colors.text,
    fontFamily = theme.fonts?.regular,
    ...rest
  }) => ({
    ...TextStyles({
      color,
      fontFamily,
      fontSize: RFValue(fontSize),
      lineHeight: RFValue(lineHeight),
      ...rest
    })
  })
);

export const BoldText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.bold,
}) => ({
  fontFamily,
}));

export const SemiBoldText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.semiBold,
}) => ({
  fontFamily,
}));

export const ExtraBoldText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.extraBold,
}) => ({
  fontFamily,
}));

export const MediumText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.medium,
}) => ({
  fontFamily,
}));

export const BlackText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.black,
}) => ({
  fontFamily,
}));

export const LightText = styled(RegularText)(({
  theme,
  fontFamily = theme?.fonts?.light,
}) => ({
  fontFamily,
}));


