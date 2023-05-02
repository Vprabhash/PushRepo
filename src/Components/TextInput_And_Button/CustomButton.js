import React, {memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../constants';

const CustomButton = ({
  onclick,
  title,
  bgColor,
  textColor,
  flex,
  top,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onclick}
      disabled={isLoading}
      style={{
        flex: flex,
        marginTop: top,
        backgroundColor: bgColor,
        borderWidth: 1,
        height: hp('5.5%'),
        borderRadius: hp(1),
        borderColor: '#00000',
        justifyContent: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.3,
  },
});
