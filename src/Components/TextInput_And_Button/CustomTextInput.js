import React, {memo} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../constants';

const CustomTextInput = ({
  title,
  value,
  marginTop = 0,
  iconPath,
  getSub,
  onClickEye,
  setRef,
  keyboardType,
  returnKeyType,
  onChangeText,
  secureTextEntry,
  editable,
  maxLength,
}) => {
  const containerStyle = {...styles.inputMain, marginTop};

  return (
    <View style={containerStyle}>
      <TextInput
        style={styles.textInput}
        placeholder={title}
        placeholderTextColor="rgba(0, 0, 0, 0.3);"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={getSub}
        ref={setRef}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        editable={editable}
        maxLength={maxLength}
      />
      {iconPath && (
        <TouchableOpacity activeOpacity={0.5} onPress={onClickEye}>
          <Image source={iconPath} style={styles.iconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputMain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5);',
    paddingHorizontal: wp(2),
    height: hp(6),
  },
  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    padding: 0,
    height: hp(6),
    flex: 1,
    color: '#000000',
  },
  iconStyle: {
    tintColor: '#000000',
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },
});

export default memo(CustomTextInput);
