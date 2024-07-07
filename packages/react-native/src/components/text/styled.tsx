import styled from '@emotion/native';
import { TextProps, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontSize as fSize } from './sizes';

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
    fontFamily,
    fontSize: RFValue(fontSize),
    lineHeight: RFValue(lineHeight),
    color,
    ...TextStyles(rest)
  })
);

export const BoldText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.bold,
}));

export const SemiBoldText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.bold,
}));

export const ExtraBoldText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.extraBold,
}));

export const MediumText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.medium,
}));

export const BlackText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.black,
}));

export const LightText = styled(RegularText)(({ theme }) => ({
  fontFamily: theme.fonts?.light,
}));


