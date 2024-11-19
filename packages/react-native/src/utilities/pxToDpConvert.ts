import { PixelRatio, Dimensions, ScaledSize } from 'react-native';

const { width, height }: ScaledSize = Dimensions.get('window');


export enum BASEDIMENSIONS {
  HEIGHT = 'height',
  WIDTH = 'width'
}

enum baseScreen {
  WIDTH = 414,
  HEIGHT = 896
}

const widthBaseScale = width / baseScreen.WIDTH;
const heightBaseScale = height / baseScreen.HEIGHT;

export const calcDevicePx = (px: number, base: BASEDIMENSIONS = BASEDIMENSIONS.WIDTH): number => {
  const newSize =
    base === BASEDIMENSIONS.HEIGHT ? px * heightBaseScale : px * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
export const widthPixel = (size: number) => {
  return calcDevicePx(size, BASEDIMENSIONS.WIDTH);
};

//for height  pixel
export const heightPixel = (size: number) => {
  return calcDevicePx(size, BASEDIMENSIONS.HEIGHT);
};

//for font  pixel
export const fontPixel = (size: number) => {
  return widthPixel(size);
};
