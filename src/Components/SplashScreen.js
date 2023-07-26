import React, {memo} from 'react';
import {Image, ImageBackground, View, StatusBar, Modal} from 'react-native';
import ImagePath from '../assets/ImagePath';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from './constants';

const SplashScreen = ({isVisible}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ImagePath.Azzir_AppIcon}
            style={{
              width: widthPercentageToDP(80),
              height: widthPercentageToDP(80),
              resizeMode: 'contain',
            }}
          />
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default memo(SplashScreen);
