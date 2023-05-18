import React, {useEffect} from 'react';
import {Image, ImageBackground, View, StatusBar, Alert} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {addCoordinates} from '../../redux/reducers/clubLocationSlice';

import Disclamer from '../../Components/Disclamer';

const Splash_Screen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    getData('userData').then(userdata => {
      console.log('userdata: ===', userdata);
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

    // BackgroundTimer.start();
    // BackgroundTimer.runBackgroundTimer(() => {
    //   checkLocation();
    // }, 3000);
    checkLocation();
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
            if (position.coords) {
              console.log('location data:', position.coords);
              let obj = {};
              obj.latitude = position.coords.latitude;
              obj.longitude = position.coords.longitude;
              dispatch(addCoordinates(obj));
            }
          },
          error => {
            console.log('location error', error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000},
        );
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
                if (position.coords) {
                  obj.latitude = position.coords.latitude;
                  obj.longitude = position.coords.longitude;
                  dispatch(addCoordinates(obj));
                }
              },
              error => {
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 15000},
            );
          } else {
            console.log('-----error2:');
            Alert.alert(
              'Welcome to Azzir!',
              'Please give the location permission to continue. \nAzzir collects location data for the following. \n - To detect your current location. \n - Recommending clubs near your location.',
              [
                {text: 'Confirm', onPress: () => openSettings()},
                {
                  text: 'Cancel',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
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
