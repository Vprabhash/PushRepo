import React from 'react';
import {COLORS, FONTS} from './constants';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import ImagePath from '../assets/ImagePath';
import CitySelector from './CitySelector';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderCitySearch = ({onPress}) => {
  return (
    <View
      style={{flexDirection: 'row', marginHorizontal: 20, marginTop: hp(1)}}>
      <CitySelector />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.inputMain]}>
        <Text numberOfLines={1} style={styles.textInput}>
          {'Search by Area, Genre, Artist or Club'}
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCitySearch;

const styles = StyleSheet.create({
  inputMain: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16,
    marginTop: 10,
    zIndex: 9999,
    marginLeft: 10,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
    width: wp(55),
  },
  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    // padding: 0,
    color: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  iconStyle: {
    tintColor: COLORS.black,
    width: 16,
    resizeMode: 'contain',
    height: 16,
  },
});
