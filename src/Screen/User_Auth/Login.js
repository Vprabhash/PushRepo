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
  Modal,
  ActivityIndicator,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../Components/constants';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
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
    setIsLoading(true);
    try {
      const res = await ApiCall('api/login', 'POST', data);
      console.log('---res--Login-----', res);
      if (res.ok == true) {
        await setData('userData', res?.data);
        await setData('userToken', res?.meta?.token);
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
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? ''
          : '234696942853-oqdts52ivfubr77cava8ah6095r74595.apps.googleusercontent.com',
      androidClientId:
        '234696942853-oqdts52ivfubr77cava8ah6095r74595.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  const signInFunction = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      setIsLoadingGoogle(true);
      console.log('lofuser data-------:', userInfo);
      // Alert.alert('success:' + JSON.stringify(userInfo));
      const data = {
        name: userInfo?.user?.name,
        firstName:userInfo?.user?.givenName,
        lastName:userInfo?.user?.familyName,
        email: userInfo?.user?.email,
        username: userInfo?.user?.email,
        profilePhotoUrl: userInfo?.user?.photo,
        phoneNumber: '',
        accessToken: userInfo?.idToken,
        accessTokenExpiresAt: '',
        pushNotificationToken: '',
      };
      ApiCall('api/oauth/google', 'POST', JSON.stringify(data))
        .then(async res => {
          console.log('google sign bydata ----', res.data);
          if (res?.ok == true) {
            await setData('userData', res?.data);
            await setData('userToken', res?.meta?.token);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          }
        })
        .catch(error => {
          Toast.show(error?.message, Toast.LONG, Toast.BOTTOM);
        })
        .finally(() => {
          setIsLoadingGoogle(false);
        });
    } catch (error) {
      setIsLoadingGoogle(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        // Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        console.log('Something went wrong', error.toString());
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
            onclick={signin}
            top={30}
            title="Sign in"
            bgColor="#000"
            textColor="#fff"
            isLoading={isLoading}
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
            signInFunction();
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
        <Modal
          visible={isLoadingGoogle}
          transparent={true}
          style={{flex: 1}}
          statusBarTranslucent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: wp(30),
                width: wp(30),
                borderRadius: 10,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          </View>
        </Modal>
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
