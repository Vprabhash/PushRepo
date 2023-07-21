import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  ImageBackground,
  View,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import Geolocation from '@react-native-community/geolocation';
import {getData} from '../../Components/Helper';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {addCoordinates} from '../../redux/reducers/clubLocationSlice';

import Disclamer from '../../Components/Disclamer';
import {
  currentCity,
  userCurrentCity,
} from '../../redux/reducers/citySelectorSlice';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CitySelector from '../../Components/CitySelector';
import {COLORS, FONTS} from '../../Components/constants';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import Toast from 'react-native-simple-toast';

const CitySelect = props => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  useEffect(() => {
    checkLocation();
  }, []);

  const onClick = () => {
    if (select) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    } else {
      Toast.showWithGravity('Please select the city', Toast.LONG, Toast.BOTTOM);
    }
  };

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
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={ImagePath.star_logo}
          style={{
            width: wp(50),
            height: wp(50),
            resizeMode: 'contain',
            marginTop: hp(20),
          }}
        />
        <View style={[styles.hedingTextMain, {marginTop: hp(4)}]}>
          <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
          <Text style={styles.cardText}>SELECT YOUR CITY</Text>
          <Image style={styles.hedingImg} source={ImagePath.rightLine} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: hp(1),
          }}>
          <CitySelector
            width={'100%'}
            height={hp(40)}
            isSelected={s => setSelect(s)}
          />
        </View>
        <View style={{flex: 1, width: '60%'}}>
          <CustomButton
            onclick={onClick}
            top={20}
            title="Continue"
            bgColor="#000"
            textColor="#fff"
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default CitySelect;

const styles = StyleSheet.create({
  hedingTextMain: {
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hedingImg: {width: '30%', resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
  },
});
