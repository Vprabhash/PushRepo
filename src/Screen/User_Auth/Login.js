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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showLoader} from '../../redux/reducers/loaderSlice';
import {useDispatch, useSelector} from 'react-redux';
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
import {appleAuth} from '@invertase/react-native-apple-authentication';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Login = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.isLoading);
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
        Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);
      } else {
        Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
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
      offlineAccess: false,
    });
    return (
      appleAuth.isSupported &&
      appleAuth.onCredentialRevoked(async () => {
        console.log(
          'If this function executes, User Credentials have been Revoked',
        );
      })
    );
  }, []);
  const signInFunction = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      if(Platform.OS == 'android'){
        dispatch(showLoader(true));
      }
      // setIsLoadingGoogle(true);
      console.log('lofuser data-------:', userInfo);
      // Alert.alert('success:' + JSON.stringify(userInfo));
      const data = {
        name: userInfo?.user?.name,
        firstName: userInfo?.user?.givenName,
        lastName: userInfo?.user?.familyName,
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
            await setData('userToken', res?.meta?.token);
            await setData('userData', res?.data);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          }
        })
        .catch(error => {
          dispatch(showLoader(false));
          Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
        })
        .finally(() => {
          // dispatch(showLoader(false));
          // setIsLoadingGoogle(false);
        });
    } catch (error) {
      dispatch(showLoader(false));
      // setIsLoadingGoogle(false);
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

  const onAppleSignIn = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleAuthRequestResponse, '===');
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log(credentialState, 'this is credentialState');
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      // setApple(true);
      // socialLogin(appleAuthRequestResponse?.identityToken, 'apple');
      // setIsLoadingGoogle(true);
      // dispatch(showLoader(true));
      ApiCall(
        'api/oauth/apple',
        'POST',
        JSON.stringify(appleAuthRequestResponse),
      )
        .then(async res => {
          // setIsLoadingGoogle(false);
          // dispatch(showLoader(false));
          console.log('apple sign bydata ----', res);
          if (res?.ok == true) {
            await setData('userToken', res?.meta?.token);
            await setData('userData', res?.data);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          }
        })
        .catch(error => {
          dispatch(showLoader(false));
          Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
        })
        .finally(() => {
          // dispatch(showLoader(false));
          // setIsLoadingGoogle(false);
        });
    } else {
      if (isEmpty(appleAuthRequestResponse?.identityToken)) {
        Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: height + StatusBar.currentHeight, width: width}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Platform.OS === 'ios' ? '65%' : null,
            alignSelf: 'center',
            marginHorizontal: wp(7),
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              signInFunction();
            }}>
            <Image source={ImagePath.google} style={styles.googleLogo} />
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={() => {
                onAppleSignIn();
              }}>
              <Image source={ImagePath.apple} style={styles.googleLogo} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={styles.withText}>Don’t have an account? </Text>
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
          visible={loader}
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
    </KeyboardAwareScrollView>
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
