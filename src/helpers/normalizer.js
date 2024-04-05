import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const FIGMA_MOBILE_WIDTH = 360;
const FIGMA_MOBILE_HEIGHT = 640;

const wscale = SCREEN_WIDTH / FIGMA_MOBILE_WIDTH;
const hscale = SCREEN_HEIGHT / FIGMA_MOBILE_HEIGHT;

const n = (size, landscape = false) => {
  const newSize = landscape ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export default n;
export {SCREEN_HEIGHT, SCREEN_WIDTH};
