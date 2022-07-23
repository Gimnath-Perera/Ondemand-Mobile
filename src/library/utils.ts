import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const getScaledNumber = (size: number = 0) => {
  // based on iphone 11 Pro's scale
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  const nearestPixel = PixelRatio.roundToNearestPixel(newSize);

  if (Platform.OS === 'ios') return Math.round(nearestPixel);

  return Math.round(nearestPixel) - 2;
};

const getSVGDynamicHeightOrWidth = (
  height: number,
  width: number,
  valueTocalculate: number,
  ratioTo: 'Width' | 'Height',
) => {
  let aspectRatio;

  // given a static height calculate the dynamic width maintaining the aspect ratio
  if (ratioTo === 'Height') {
    aspectRatio = width / height;
    return Math.ceil(valueTocalculate * aspectRatio);
  }

  // given a static width calculate the dynamic height maintaining the aspect ratio
  aspectRatio = height / width;
  return Math.ceil(valueTocalculate * aspectRatio);
};

export {
  getScaledNumber,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  getSVGDynamicHeightOrWidth,
};
