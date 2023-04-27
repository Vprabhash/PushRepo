import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import {ARTIST, SIGN_IN} from '../../services/Apis';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setData} from '../../Components/Helper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeShow, setEyeShow] = useState('');
  const onClickEye = () => {
    setEyeShow(!eyeShow);
  };
  const signin = async () => {
    const minPasswordLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < minPasswordLength) {
      Alert.alert(
        'Invalid password',
        `Password must be at least ${minPasswordLength} characters long.`,
      );
      return;
    }
    var data = JSON.stringify({
      username: email,
      password: password,
      pushNotificationToken: '',
    });
    try {
      const res = await ApiCall('api/login', 'POST', data);
      console.log('---res--Login-----', res);
      if (res.ok == true) {
        setData('userData', res?.data);
        setData('userToken', res?.meta?.token);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab'}],
        });
        Toast.show(res?.message, Toast.LONG, Toast.BOTTOM);
      } else {
        Toast.show(res?.message, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      Toast.show(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({userInfo});
      Alert.alert(JSON.stringify(userInfo));
      console.log('google signIn===>', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: height * 1.1, width: width}}>
        <Image
          resizeMode={'cover'}
          source={ImagePath.dancePic}
          style={{
            width: width,
            height: height * 0.29,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
          }}
        />
        <View style={styles.dot}>
          <Image
            source={ImagePath.star_logo}
            style={{
              resizeMode: 'contain',
              height: 70,
              width: 70,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: -55}}>
          <Text style={[styles.signIn, {marginBottom: hp(4)}]}>Sign In</Text>
          <CustomTextInput
            title="Enter your email"
            iconPath={ImagePath.msgIcon}
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            keyboardType={'email-address'}
            returnKeyType={'next'}
          />
          <CustomTextInput
            marginTop={20}
            title="Enter password"
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
            secureTextEntry={eyeShow ? false : true}
            onClickEye={() => {
              onClickEye();
            }}
          />
          <CustomButton
            onclick={() => {
              signin();
            }}
            top={30}
            title="Sign in"
            bgColor="#000"
            textColor="#fff"
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              props.navigation.navigate('ForgetPassword');
            }}>
            <Text style={styles.forgetText}>Forgot password</Text>
          </TouchableOpacity>
          <Text style={[styles.withText, {color: '#797979', marginTop: hp(3)}]}>
            Or Sign in with
          </Text>
        </View>
        {/* <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            signIn();
          }}
          // disabled={this.state.isSigninInProgress}
        /> */}

        <TouchableOpacity
          onPress={() => {
            googleSignIn();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
            marginHorizontal: wp(7),
          }}>
          <Image source={ImagePath.google} style={styles.googleLogo} />
          {Platform.OS === 'ios' && (
            <Image source={ImagePath.apple} style={styles.googleLogo} />
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={styles.withText}>Don’t have an account </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}>
            <Text style={[styles.withText, {textDecorationLine: 'underline'}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -55,
  },
  signIn: {
    fontFamily: FONTS.AxiformaSemiBold,
    fontSize: 24,
    color: '#000000',
    marginBottom: 15,
  },

  googleLogo: {height: 90, width: 90, resizeMode: 'contain'},
  forgetText: {
    fontFamily: FONTS.RobotoMedium,
    fontSize: 14,
    color: '#797979',
    marginVertical: 20,
  },

  withText: {
    fontFamily: FONTS.RobotoMedium,
    fontSize: 14,
    alignSelf: 'center',
    color: '#000',
  },
});
