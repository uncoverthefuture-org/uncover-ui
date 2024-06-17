import { PixelRatio, Dimensions, ScaledSize } from 'react-native';

enum BASE {
  HEIGHT = 'height',
  WIDTH = 'width'
}

const { width, height }: ScaledSize = Dimensions.get('window');
enum baseScreen {
  WIDTH = 414,
  HEIGHT = 896
}

const widthBaseScale = width / baseScreen.WIDTH;
const heightBaseScale = height / baseScreen.HEIGHT;

export const calcDevicePx = (px: number, base: BASE = BASE.WIDTH): number => {
  const newSize =
    base === BASE.HEIGHT ? px * heightBaseScale : px * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
export const widthPixel = (size: number) => {
  return calcDevicePx(size, BASE.WIDTH);
};

//for height  pixel
export const heightPixel = (size: number) => {
  return calcDevicePx(size, BASE.HEIGHT);
};

//for font  pixel
export const fontPixel = (size: number) => {
  return widthPixel(size);
};
