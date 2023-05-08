import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
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
import {setData} from '../../Components/Helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = props => {
  const forgetotp = props?.route?.params?.forgetmail;
  const forgetmail = props?.route?.params?.email;
  const [Otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const email = props.route?.params?.email;
  const password = props.route?.params?.password;
  console.log('props signOtp--------', props.route.params);
  const OtpApi = async () => {
    if (Otp.length < 6) {
      Toast.show('Enter valid OTP', Toast.LONG, Toast.BOTTOM);
    } else {
      const data = {
        email: email,
        otp: Otp,
        password: password,
      };
      setLoading(true);
      try {
        console.log("calling api for otp verify")
        const res = await ApiCall('api/register', 'POST', JSON.stringify(data));
        console.log('---res--registerotp-----', res);
        if (res.ok == true) {
          await setData('userData', res?.data);
          await setData('userToken', res?.meta?.token);
          if (forgetmail == 'otp') {
            props.navigation.navigate('ResetPassword', {
              otp: Otp,
              email: forgetmail,
            });
          } else {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          }
        } else {
          Toast.show('Something went wrong', Toast.LONG, Toast.BOTTOM);
        }
      } catch (error) {
        Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setLoading(false);
      }
    }
  };
  const resendOtp = async () => {
    console.log('email=================', email);
    const data = {
      email: email,
    };
    try {
      const res = await ApiCall('api/send-otp', 'POST', JSON.stringify(data));
      console.log('---send-------', res);
      Toast.show(
        res.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (error) {
      Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  const resendforgetmailOtp = async () => {
    var data = JSON.stringify({
      email: email,
    });
    try {
      const res = await ApiCall('api/forgot-password', 'POST', data);
      console.log('--resForgetpass-----', res);
      Toast.show(
        res.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (error) {
      Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
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
              if (forgetotp == 'otp'  ) {
                if(Otp.length == 6){
                props.navigation.navigate('ResetPassword', {
                  Otp: Otp,
                  email: email,
                })}else{
                  Toast.show('Enter valid OTP', Toast.LONG, Toast.BOTTOM);
                }
              } else {
                OtpApi();
              }
              // props.navigation.navigate('Login');
            }}
            top={30}
            title="Submit OTP"
            bgColor="#000"
            textColor="#fff"
            isLoading={isLoading}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(4.2),
            }}>
            <Text style={[styles.withText]}>Didn’t receive pin </Text>
            <TouchableOpacity
              onPress={() => {
                if (forgetotp == 'otp') {
                  // Alert.alert('ok');
                  resendforgetmailOtp();
                } else {
                  // Alert.alert('orrrk');
                  resendOtp();
                }
                // resendOtp();
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
