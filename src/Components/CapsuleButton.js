import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {memo, useState} from 'react';
import {COLORS, FONTS} from './constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CapsuleButton = ({lable, icon, isSelected, onPress}) => {
  const [selected, setSelected] = useState(isSelected);
  return (
    <TouchableOpacity
      style={[
        styles.fllter,
        {
          backgroundColor: selected ? COLORS.black : COLORS.white,
        },
      ]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Image
        source={icon}
        style={[
          styles.iconStyle,
          {
            tintColor: selected ? COLORS.white : COLORS.black,
          },
        ]}
      />
      <Text
        style={[
          styles.filtersText,
          {
            color: selected ? COLORS.white : COLORS.black,
          },
        ]}>
        {lable}
      </Text>
    </TouchableOpacity>
  );
};

export default CapsuleButton;

const styles = StyleSheet.create({
  fllter: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(25),
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: 7,
  },
  iconStyle: {
    tintColor: COLORS.black,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  filtersText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.RobotoMedium,
  },
});
