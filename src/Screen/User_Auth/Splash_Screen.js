import React, {useEffect} from 'react';
import {Image, ImageBackground, View, StatusBar, Alert} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import Geolocation from '@react-native-community/geolocation';
import {getData, setData} from '../../Components/Helper';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {addCoordinates} from '../../redux/reducers/clubLocationSlice';

import Disclamer from '../../Components/Disclamer';
import {
  currentCity,
  userCurrentCity,
} from '../../redux/reducers/citySelectorSlice';
import ApiCall from '../../redux/CommanApi';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const Splash_Screen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    getData('userData').then(userdata => {
      // console.log('userdata: ===', userdata);
      // setData('currentCity', null);
      global.currentCity = null;
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
    checkLocation();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          console.log('location data:', position.coords);
          let obj = {};
          obj.latitude = position.coords.latitude;
          obj.longitude = position.coords.longitude;

          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.latitude},${obj.longitude}&key=AIzaSyBn_zzWboMdWJrkM4qamsjKfdX418xDNRA`,
          )
            .then(response => response.json())
            .then(data => {
              dispatch(addCoordinates(obj));
              if (data.results && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                for (const component of addressComponents) {
                  if (component.types.includes('locality')) {
                    console.log('Current city:', component.long_name);
                    dispatch(currentCity(component.long_name));
                    dispatch(userCurrentCity(component.long_name));
                    // ApiCall('api/cities', 'GET')
                    //   .then(res => {
                    //     console.log('Current city:', res);
                    //     if (res?.data?.length) {
                    //       if (
                    //         res?.data?.some(
                    //           e => e?.name === component.long_name,
                    //         ) == false
                    //       ) {
                    //         props.navigation.navigate('CitySelect');
                    //       }
                    //     }
                    //   })
                    //   .catch(err => {
                    //     console.error(err, 'this is an error');
                    //   });
                    break;
                  }
                }
              }
            })
            .catch(error => {
              console.log('geocoding error:', error);
            });
        }
      },
      error => {
        console.log('location error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  const checkLocation = async () => {
    await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      }),
    ).then(result => {
      if (result === 'granted') {
        getCurrentPosition();
      } else {
        request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
          }),
        ).then(status => {
          if (status === 'granted') {
            getCurrentPosition();
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
  };

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
          source={ImagePath.Azzir_AppIcon}
          style={{
            width: widthPercentageToDP(80),
            height: widthPercentageToDP(80),
            resizeMode: 'contain',
          }}
        />
      </ImageBackground>
    </View>
  );
};
export default Splash_Screen;
