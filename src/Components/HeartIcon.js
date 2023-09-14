import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ImagePath from '../assets/ImagePath';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const HeartIcon = ({state, setState, onPress}) => {
  const [heart, setHeart] = useState(true);
  return (
    <View
      style={{
        zIndex: 9,
        position: 'absolute',
        top: '6%',
        bottom: 0,
        // left:0,
        right: '6%',
       
      }}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setHeart(!heart)}>
        <Image
          source={heart ? ImagePath.emptyHeart : ImagePath.filledHeart}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeartIcon;

const styles = StyleSheet.create({
  iconStyle: {
    tintColor: '#fff',
    width: 30,
    resizeMode: 'contain',
    height: 30,
  },
});
