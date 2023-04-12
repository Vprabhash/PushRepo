import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomTextInput = (
  props,
  {
    title,
    value,
    marginTop,
    iconPath,
    getSub,
    onClickEye,
    setRef,
    keyboardType,
    returnKeyType,
    onChangeText,
    secureTextEntry,
  },
) => {
  return (
    <View style={[styles.inputMain, {marginTop: marginTop}]}>
      <TextInput
        style={[styles.textInput, {}]}
        placeholder={title}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={getSub}
        ref={setRef}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
      />
      <TouchableOpacity
        disabled={onClickEye ? false : true}
        activeOpacity={0.5}
        onPress={() => {
          onClickEye();
        }}>
        <Image source={iconPath} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
const styles = StyleSheet.create({
  inputMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: wp(2),
    height: hp(6),
  },
  textInput: {
    fontFamily: 'Metropolis-Regular',
    fontSize: hp(2),
    padding: 0,
    height: hp(6),
    flex: 1,
  },
  iconStyle: {
    tintColor: '#000000',
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },
});
