import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from './constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Header = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 7,
        // marginHorizontal: 10,
        // paddingBottom: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 0.9}}>
        {props.Back_Arrow && (
          <TouchableOpacity
            onPress={props.onclick}
            style={{
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: props.iconHeight,
                width: props.iconWidth,
                resizeMode: 'contain',
              }}
              source={props.Back_Arrow}
            />
          </TouchableOpacity>
        )}
        <View style={{}}>
          {props.title && (
            <Text
              style={{
                color: COLORS.black,
                fontFamily: FONTS.AxiformaBold,
                fontSize: 16,
              }}>
              {props.title}
            </Text>
          )}
          {props.titalTwo && (
            <Text
              style={{
                color: COLORS.black,
                fontFamily: FONTS.AxiformaMedium,
                fontSize: 14,
              }}>
              {props.titalTwo}
            </Text>
          )}
        </View>

        {props.searchIcon && (
          <View style={[styles.inputMain, {marginLeft: 8}]}>
            <TextInput
              style={[styles.textInput, {color: '#A3A3A3'}]}
              placeholderTextColor="#A3A3A3"
              placeholder={props.placeholder}
              // onChangeText={onChangeText}
              // value={value}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <Image
                source={props.searchIcon}
                style={[styles.iconStyle, {tintColor: '#A3A3A3'}]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {props.profileIcon && (
        <TouchableOpacity
          style={{flex: 0.3, alignItems: 'flex-end'}}
          onPress={props.onProfileClick}>
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              borderRadius: 30,
            }}
            source={props.profileIcon}
          />
        </TouchableOpacity>
      )}
      {props.onShareClick && (
        <TouchableOpacity
          style={styles.shareWrapper}
          onPress={props.onShareClick}>
          <Image source={ImagePath.shareIcon} style={styles.shareIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  //

  inputMain: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 16,
    width: '100%',
    // marginHorizontal: wp(2.5),
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: 37,
  },

  textInput: {
    fontFamily: FONTS.AxiformaMedium,
    fontSize: hp(2),
    padding: 0,
    height: hp(6),
    flex: 1,
    fontSize: 16,
    paddingRight: 10,
  },
  iconStyle: {
    tintColor: '#000000',
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },
  shareIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  shareWrapper: {
    marginRight: 8,
    zIndex: 999999,
    borderRadius: 50,
  },
});
