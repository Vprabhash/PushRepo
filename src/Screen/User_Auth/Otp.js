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

import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = props => {
  console.log('props signOtp--------', props.route.params);
  const [Otp, setOtp] = useState('');
  const [password, setPassword] = useState(props?.route?.params?.password);
  const [email, setemail] = useState(props?.route?.params?.email);
  console.log(email, '-------');
  const OtpApi = async () => {
    fetch('https://api.azzirevents.com/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.ok == true) {
          props.navigation.navigate('Login');
        } else {
          alert('Invalid username or password.');
        }
        console.log('Response msgg======= -> ' + JSON.stringify(responseData));
      });

    // var data = {
    //   email: email,
    //   password: password,
    // };
    // console.log('---data', data);

    // const res = await ApiCall('api/register', 'POST', data);
    // console.log('---res--otp-----', res);
    // if (res.ok == true) {
    //   props.navigation.navigate('LogIn');
    // }
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
                props.navigation.navigate('Login');
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
