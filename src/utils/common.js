import {PixelRatio} from 'react-native';

export const responsiveFontSize = f => {
  return f * PixelRatio.getFontScale();
};
