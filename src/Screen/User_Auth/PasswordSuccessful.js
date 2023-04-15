import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../Components/constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const PasswordSuccessful = props => {
  return (
    <View style={{flex: 1}}>
      {/* <ScrollView contentContainerStyle={{flexGrow:1}}> */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View
          style={{
            paddingHorizontal: 20,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            paddingTop: 122,
          }}>
          <Text style={[styles.signIn, {textAlign: 'center', lineHeight: 52}]}>
            Password Reset{'\n'}Successful
          </Text>
          <Text
            style={[
              styles.signIn,
              {
                fontFamily: FONTS.RobotoRegular,
                fontSize: 24,
                // letterSpacing: 0.3,
                textAlign: 'center',
              },
            ]}>
            Now you can login
          </Text>
          <Image
            source={ImagePath.doneIcon}
            style={{
              height: 140,
              width: 140,
              alignSelf: 'center',
              marginTop: hp(10),
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            flex: 1,
            right: 20,
            left: 20,
          }}>
          <CustomButton
            onclick={() => {
              props.navigation.navigate('Login');
            }}
            // flex={1}
            top={30}
            title="Done"
            bgColor="#000"
            textColor="#fff"
          />
        </View>
      </ImageBackground>
      {/* </ScrollView> */}
    </View>
  );
};
export default PasswordSuccessful;
const styles = StyleSheet.create({
  signIn: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 30,
    color: COLORS.black,
    marginBottom: 15,
  },
});
