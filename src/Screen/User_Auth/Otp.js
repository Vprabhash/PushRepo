import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import Helper from '../../Components/Helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = props => {
  console.log('props signOtp--------', props.route.params);
  const [Otp, setOtp] = useState('');
  const [password, setPassword] = useState(props?.route?.params?.password);
  const [email, setemail] = useState(props?.route?.params?.email);
  console.log(email, '-------');
  const OtpApi = async () => {
    var data = JSON.stringify({
      email: email,
      password: password,
    });
    const res = await ApiCall('api/register', 'POST', data);
    console.log('---res--otp-----', res);
    if (res.ok == true) {
      Helper.setData('userData', res);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    }
  };
  const resendOtp = async () => {
    var data = {
      email: email,
    };
    const res = await ApiCall('api/send-otp', 'POST', JSON.stringify(data));
    console.log('---send--otp-----', res);
    if (res.ok == true) {
      Toast.show(res.message, Toast.LONG, Toast.BOTTOM);
    } else {
      Toast.show(res.message, Toast.LONG, Toast.BOTTOM);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%', justifyContent: 'center'}}>
        {/* <View
          style={{
            paddingHorizontal: 20,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            justifyContent: 'center',
          }}> */}
        <LinearGradient
          style={{
            paddingHorizontal: 20,
            height: height * 0.7,
            justifyContent: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.1)',
          ]}>
          <Text style={styles.signIn}>Enter OTP</Text>
          <Text
            style={[
              styles.signIn,
              {
                fontSize: 22,
                fontFamily: FONTS.DMSansRegular,
                marginBottom: 20,
                lineHeight: 30,
              },
            ]}>
            Check your email, we’ve sent you the pin at {email}
          </Text>
          <OTPTextInput
            textInputStyle={{width: 40}}
            inputCount={6}
            returnKeyType={'next'}
            handleTextChange={text => setOtp(text)}
            defaultValue={Otp}
            tintColor={'gray'}
            borderBottomWidth={1}
          />
          <CustomButton
            onclick={() => {
              OtpApi();
              // props.navigation.navigate('Login');
            }}
            top={30}
            title="Otp"
            bgColor="#000"
            textColor="#fff"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(4.2),
            }}>
            <Text style={[styles.withText]}>Didn’t received pin </Text>
            <TouchableOpacity
              onPress={() => {
                resendOtp();
              }}>
              <Text
                style={[
                  styles.withText,
                  {color: COLORS.black, textDecorationLine: 'underline'},
                ]}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* </View> */}
      </ImageBackground>
    </View>
  );
};
export default Otp;
const styles = StyleSheet.create({
  withText: {
    fontFamily: FONTS.DMSansRegular,
    fontSize: 14,
    alignSelf: 'center',
    color: '#979797',
  },
  signIn: {
    fontFamily: FONTS.AxiformaSemiBold,
    fontSize: 30,
    color: COLORS.black,
    marginBottom: 15,
  },

  // signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 28, color: '#000000', marginBottom: 15 },
});
