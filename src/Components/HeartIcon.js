import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ImagePath from '../assets/ImagePath';
import ApiCall from '../redux/CommanApi';
import { COLORS } from './constants';

const HeartIcon = ({state, setState, style, size, item, endpoint}) => {
  const [heart, setHeart] = useState(!false);
  const handleOnPress = async status => {
    setHeart(!status);
    const url = status ? endpoint : endpoint.replace('likes', 'dislikes');
    console.log(url, 'posting====');
    const res = await ApiCall(url, 'POST');
    console.log(res);
  };
  return (
    <View style={styles.iconContainer(style)}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handleOnPress(heart)}>
        <Image
          source={heart ? ImagePath.emptyHeart : ImagePath.filledHeart}
          style={styles.iconStyle(size, heart)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeartIcon;

const styles = StyleSheet.create({
  iconContainer: style => ({
    zIndex: 9,
    position: 'absolute',
    top: '6%',
    right: '6%',
    ...style,
  }),
  iconStyle: (size,status) => ({
    tintColor:status? COLORS.white:COLORS.red,
    width: 30,
    resizeMode: 'contain',
    height: 30,
    ...size,
  }),
});
