import styled from '@emotion/native';
import { ColorValue } from 'react-native';
import { FadeLoading } from 'react-native-fade-loading';
import { heightPixel, widthPixel } from '../../utility/pxToDpConvert';


export const LoadingContainer = styled.View({
  paddingTop: '50%'
});

export const LoadingSection = styled.View<{
  width?: number| string,
  size?: number,
  background?: ColorValue,
}>(({
  size = 20,
  width = '100%',
  background = "transparent"
}) => ({
  width,
  paddingVertical: heightPixel(size),
  paddingHorizontal: widthPixel(20),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: background
}))

export const LoadingAvatar = styled(FadeLoading)<{ height?: number, width?: number, radius?: number, right?: number }>(({
  height = 60,
  width = 60,
  radius = width * 2,
  right = 15
}) => ({
  height: heightPixel(height),
  width: widthPixel(width),
  borderRadius: radius,
  marginRight: widthPixel(right),
}))

export const LoadingText = styled(FadeLoading)<{ height?: number, width?: number, bottom?: number, right?: number }>(({
  height = 16,
  width = 100,
  bottom = 6,
  right = 15
}) => ({
  height: heightPixel(height),
  width: widthPixel(width),
  borderRadius: 20,
  marginBottom: heightPixel(bottom),
  marginRight: widthPixel(right),
}))

export const LoadingBox = styled(FadeLoading)<{ height?: number, width?: number, bottom?: number, right?: number, left?: number, radius?: number }>(({
  height = 100,
  width = 100,
  bottom = 6,
  right = 0,
  left = 0,
  radius = 10
}) => ({
  height: heightPixel(height),
  width: widthPixel(width),
  borderRadius: radius,
  marginBottom: heightPixel(bottom),
  marginRight: widthPixel(right),
  marginLeft: widthPixel(left)
}))


