import React from 'react';
import { COLORS, FONTS } from './constants';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import CitySelector from './CitySelector';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const HeaderCitySearch = ({ onPress }) => {

  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', marginTop: hp(1) }}>
      <CitySelector />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.inputMain, { marginTop: 10 }]}>
        <TextInput
          style={[styles.textInput, {}]}
          placeholder={'Search by Area, Genre, Artist or Club'}
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          editable={false}
        // onChangeText={onChangeText}
        // value={value}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            ('');
          }}>
          <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export default HeaderCitySearch;

const styles = StyleSheet.create({
  inputMain: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16,
    marginHorizontal: 10,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
    flexBasis: '50%',
  },
  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    padding: 0,
    height: hp(6),
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