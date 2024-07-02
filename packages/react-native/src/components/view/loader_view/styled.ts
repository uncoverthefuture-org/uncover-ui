import styled from '@emotion/native';
import { FadeLoading } from 'react-native-fade-loading';
import { heightPixel, widthPixel } from '@utilities/pxToDpConvert';
import { StyledView, ViewStyles } from '../styled';
import { StyledViewProps } from '../interface';


export const LoadingContainer = styled.View({
  paddingTop: '50%'
});

export const LoadingSection = styled(StyledView)<{
  size?: number,
}>(({
  size = 20,
  width = '100%',
  backgroundColor = "transparent"
}) => ({
  width,
  paddingVertical: size,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor,
}))

export const StyledFadeLoading = styled(FadeLoading)<StyledViewProps>(({
  ...rest
}) => ({
  ...ViewStyles(rest)
}))

export const LoadingAvatar = styled(StyledFadeLoading)(({
  height = widthPixel(60),
  width = widthPixel(60),
  borderRadius = width * 2,
  marginRight = widthPixel(15)
}) => ({
  height,
  width,
  borderRadius,
  marginRight,
}))

export const LoadingText = styled(StyledFadeLoading)(({
  height = heightPixel(16),
  width = widthPixel(100),
  marginBottom = heightPixel(6),
  marginRight = 15,
  borderRadius = widthPixel(20)
}) => ({
  height,
  width,
  borderRadius,
  marginBottom,
  marginRight,
}))

export const LoadingBox = styled(StyledFadeLoading)(({
  height = heightPixel(100),
  width = widthPixel(100),
  marginBottom = heightPixel(6),
  marginRight = widthPixel(0),
  marginLeft = widthPixel(0),
  borderRadius = 10
}) => ({
  height: heightPixel(height),
  width: widthPixel(width),
  borderRadius,
  marginBottom,
  marginRight,
  marginLeft,
}))


