import React, {useEffect} from 'react';
import {Image, ImageBackground, View, StatusBar} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import Geolocation from '@react-native-community/geolocation';
import {getData} from '../../Components/Helper';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import BackgroundTimer from 'react-native-background-timer';

const Splash_Screen = props => {
  useEffect(() => {
    getData('userData').then(userdata => {
      console.log('userdatauserdata:-------- ', userdata);
      if (!userdata) {
        setTimeout(() => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Explore'}],
          });
        }, 2000);
      } else {
        setTimeout(() => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'BottomTab'}],
          });
        }, 1000);
      }
    });
  });
  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      checkLocation();
    }, 3000);
    BackgroundTimer.start();
  }, []);

  async function checkLocation() {
    await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      }),
    ).then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            let obj = {};
            obj.latitude = position.coords.latitude;
            obj.longitude = position.coords.longitude;
            global.location = obj;
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
        return;
      } else {
        request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
          }),
        ).then(status => {
          if (status === 'granted') {
            Geolocation.getCurrentPosition(
              position => {
                let obj = {};
                obj.latitude = position.coords.latitude;
                obj.longitude = position.coords.longitude;
                global.location = obj;
              },
              error => {
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
            );
            return false;
          } else {
            console.log('-----error2:');
            setTimeout(() => {
              openSettings();
            }, 3000);
          }
        });
      }
    });
  }

  return (
    <View style={{flex: 1}}>
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
          source={ImagePath.star_logo}
          style={{width: 228, resizeMode: 'contain'}}
        />
      </ImageBackground>
    </View>
  );
};
export default Splash_Screen;
