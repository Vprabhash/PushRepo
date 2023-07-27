import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {getHash, startOtpListener, useOtpVerify} from 'react-native-otp-verify';

import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import {setData} from '../../Components/Helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = props => {
  const forgetotp = props?.route?.params?.forgetmail || '';
  const forgetmail = props?.route?.params?.email || '';
  const [Otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const email = props.route?.params?.email || '';
  const phone = props?.route?.params || '';
  const password = props.route?.params?.password || '';
  // console.log('props signOtp--------', props.route.params);

  // useEffect(() => {
  //   startOtpListener(message => {
  //     // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
  //     const otp = /(\d{6})/g.exec(message)[1];
  //     setOtp(otp);
  //   });
  //   return () => removeListener();
  // }, []);

  const OtpApi = async () => {
    if (Otp.length < 6) {
      Toast.showWithGravity('Enter valid OTP', Toast.LONG, Toast.BOTTOM);
    } else {
      const data = {
        email: email,
        otp: Otp,
        password: password,
      };
      setLoading(true);
      try {
        console.log('calling api for otp verify');
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
          Toast.showWithGravity(
            'Something went wrong',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
      } catch (error) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setLoading(false);
      }
    }
  };
  const phoneOTPVerify = async () => {
    if (Otp.length < 6) {
      Toast.showWithGravity('Enter valid OTP', Toast.LONG, Toast.BOTTOM);
    } else {
      const data = {
        otp: Otp,
        username_type: 'phoneNumber',
        username: phone?.phone,
      };
      setLoading(true);
      try {
        const res = await ApiCall(
          'api/login/verify-otp',
          'POST',
          JSON.stringify(data),
        );
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
          Toast.showWithGravity(
            res?.errors?.length && res?.errors[0]?.msg
              ? res?.errors[0]?.msg
              : 'Something went wrong',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
      } catch (error) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setLoading(false);
      }
    }
  };
  const resendOtp = async () => {
    let data = {};
    if (phone?.isPhoneNumber) {
      data.phoneNumber = phone?.phone;
    } else {
      data.email = email;
    }
    try {
      const res = await ApiCall('api/send-otp', 'POST', JSON.stringify(data));
      console.log('---send-------', res);
      Toast.showWithGravity(
        res.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (error) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  const resendforgetmailOtp = async () => {
    var data = JSON.stringify({
      email: email,
    });
    try {
      const res = await ApiCall('api/forgot-password', 'POST', data);
      console.log('--resForgetpass-----', res);
      Toast.showWithGravity(
        res.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (error) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{marginLeft: 10, marginTop: getStatusBarHeight() + 10}}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={ImagePath.goBack}
            />
          </TouchableOpacity>
          {/* <View
          style={{
            // paddingHorizontal: 20,
            // height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.5)',
            justifyContent: 'center',
          }}> */}
          <LinearGradient
            style={{
              paddingHorizontal: 20,
              height: height - getStatusBarHeight() + 10,
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
              {phone?.isPhoneNumber
                ? `Check your phone, we’ve sent you the OTP at ${phone?.phone}`
                : `Check your email, we’ve sent you the OTP at ${email}`}
            </Text>
            <OTPInputView
              style={{width: '100%', height: 100, color: COLORS.black}}
              pinCount={6}
              code={Otp}
              autoFocusOnLoad={false}
              onCodeChanged={code => setOtp(code)}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
            <CustomButton
              onclick={() => {
                if (forgetotp == 'otp') {
                  if (Otp.length == 6) {
                    props.navigation.navigate('ResetPassword', {
                      otp: Otp,
                      email: email,
                    });
                  } else {
                    Toast.showWithGravity(
                      'Enter valid OTP',
                      Toast.LONG,
                      Toast.BOTTOM,
                    );
                  }
                } else if (phone?.isPhoneNumber) {
                  phoneOTPVerify();
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
              <Text style={[styles.withText]}>Didn’t receive OTP? </Text>
              <TouchableOpacity
                onPress={() => {
                  if (forgetotp == 'otp') {
                    resendforgetmailOtp();
                  } else {
                    resendOtp();
                  }
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
      </KeyboardAwareScrollView>
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
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.black,
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: 'gray',
    color: COLORS.black,
    fontFamily: FONTS.AxiformaMedium,
    fontSize: 22,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.black,
  },
});
