import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {memo, useState} from 'react';
import ImagePath from '../assets/ImagePath';
import ApiCall from '../redux/CommanApi';
import {COLORS} from './constants';

const HeartIcon = ({isLiked = true, style, size, item, endpoint,HandlePress}) => {
  const [heart, setHeart] = useState(isLiked);
  const handleOnPress = async () => {
    setHeart(!heart);

    const url = heart ? endpoint : endpoint.replace('likes', 'dislikes');

    try {
      const res = await ApiCall(url, 'POST');
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
      setHeart(isLiked);
    }
  };

  const value=(HandlePress)=>{
return (HandlePress!=undefined)?isLiked:heart
  }

  return (
    <View style={styles.iconContainer(style)}>
      <TouchableOpacity activeOpacity={0.5} onPress={(HandlePress!=undefined)?HandlePress:handleOnPress}>
        <Image
          source={value(HandlePress) ? ImagePath.emptyHeart : ImagePath.filledHeart}
          style={styles.iconStyle(size, value(HandlePress))}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HeartIcon);

const styles = StyleSheet.create({
  iconContainer: style => ({
    zIndex: 9,
    position: 'absolute',
    top: '6%',
    right: '6%',
    ...style,
  }),
  iconStyle: (size, status) => ({
    tintColor: status ? COLORS.white : COLORS.red,
    width: 30,
    resizeMode: 'contain',
    height: 30,
    ...size,
  }),
});
