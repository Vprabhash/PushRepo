import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setData} from '../../Components/Helper';
import appleAuth from '@invertase/react-native-apple-authentication';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const SignUp = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState({
    active: false,
    value: '',
  });
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);
  const handleSignUp = async () => {
    // Email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    // Password validation
    const minPasswordLength = 6;
    if (confirmPassword.length < minPasswordLength) {
      Alert.alert(
        'Invalid password',
        `Password must be at least ${minPasswordLength} characters long.`,
      );
      return;
    }
    Keyboard.dismiss();
    if (confirmPassword === password) {
      const data = {
        email: email,
      };
      setIsLoading(true);
      try {
        const res = await ApiCall('api/send-otp', 'POST', JSON.stringify(data));
        console.log('---res--otp-----', res);
        if (res.ok == true) {
          Toast.showWithGravity(res.message, Toast.LONG, Toast.BOTTOM);
          props.navigation.navigate('Otp', {
            email: email,
            password: password,
          });
        } else {
          Toast.showWithGravity(res.message, Toast.LONG, Toast.BOTTOM);
        }
      } catch (error) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setIsLoading(false);
      }
      // dispatch(
      //   signUp({
      //     email: email.toLowerCase(),
      //     password,
      //   }),
      // )
      //   .unwrap()
      //   .then(response => {
      //     // TODO: handle response
      //     props.navigation.navigate('Otp', {email: email});
      //     console.log('---responsesignUp----', response);
      //   })
      //   .catch(error => {
      //     Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      //     console.error('Sign up error:', error.message);
      //   });
    } else {
      Alert.alert(
        "Passwords don't match",
        'Please make sure the passwords match.',
      );
    }
  };

  const loginWithMobile = async () => {
    Keyboard.dismiss();
    var data = JSON.stringify({
      phoneNumber: isPhoneNumber.value,
    });
    setIsLoading(true);
    try {
      const res = await ApiCall('api/send-otp', 'POST', data);
      console.log('---res--Login-----', res);
      if (res.ok == true) {
        Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);
        props.navigation.navigate('Otp', {
          phone: isPhoneNumber?.value,
          isPhoneNumber: true,
        });
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
      setLoadingGoogle(true);
      console.log('lofuser data-------:', userInfo);
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
      try {
        const res = await ApiCall(
          'api/oauth/google',
          'POST',
          JSON.stringify(data),
        );
        // setClubNearby(res?.data);
        console.log('google sign bydata ----', res.data);
        if (res?.ok == true) {
          await setData('userData', res?.data);
          await setData('userToken', res?.meta?.token);
          props.navigation.reset({
            index: 0,
            routes: [{name: 'BottomTab'}],
          });
        }
      } catch (error) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setLoadingGoogle(false);
      }
    } catch (error) {
      setLoadingGoogle(false);
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
      setLoadingGoogle(true);
      ApiCall(
        'api/oauth/apple',
        'POST',
        JSON.stringify(appleAuthRequestResponse),
      )
        .then(async res => {
          setLoadingGoogle(false);
          console.log('apple sign bydata ----', res);
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
          Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
        })
        .finally(() => {
          setLoadingGoogle(false);
        });
    } else {
      if (isEmpty(appleAuthRequestResponse?.identityToken)) {
        Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  const [eyeShow, setEyeShow] = useState('');
  const [eyeShow2, setEyeShow2] = useState('');
  const onClickEye = value => {
    if (value === 'password') {
      setEyeShow(!eyeShow);
    } else {
      setEyeShow2(!eyeShow2);
    }
  };
  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
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
          <Text style={styles.signIn}>Sign Up</Text>
          <CustomTextInput
            title={
              isPhoneNumber.active
                ? 'Enter your mobile number'
                : 'Enter your email'
            }
            iconPath={isPhoneNumber.active ? null : ImagePath.msgIcon}
            onChangeText={text => {
              isPhoneNumber.active
                ? setIsPhoneNumber({...isPhoneNumber, value: text})
                : setEmail(text);
            }}
            value={isPhoneNumber.active ? isPhoneNumber.active : email}
            keyboardType={isPhoneNumber.active ? 'phone-pad' : 'email-address'}
          />
          {!isPhoneNumber.active && (
            <>
              <CustomTextInput
                marginTop={20}
                title="Create password"
                onChangeText={text => {
                  setPassword(text);
                }}
                value={password}
                iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                secureTextEntry={!eyeShow}
                onClickEye={() => {
                  onClickEye('password');
                }}
              />
              <CustomTextInput
                marginTop={20}
                title=" Enter password again"
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
                value={confirmPassword}
                iconPath={eyeShow2 ? ImagePath.eyeIcon : ImagePath.closeEye}
                secureTextEntry={!eyeShow2}
                onClickEye={() => {
                  onClickEye('confirmPassword');
                }}
              />
            </>
          )}
          <CustomButton
            onclick={() => {
              isPhoneNumber?.active ? loginWithMobile() : handleSignUp();
            }}
            top={30}
            title="Sign up"
            bgColor="#000"
            textColor="#fff"
          />
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            if (isPhoneNumber?.active) {
              setIsPhoneNumber({...isPhoneNumber, active: false});
              return;
            }
            setIsPhoneNumber({...isPhoneNumber, active: true});
          }}>
          <Text style={[styles.withText, {color: '#797979', marginTop: hp(4)}]}>
            Sign up with {isPhoneNumber?.active ? 'Email' : 'Mobile Number'}
          </Text>
        </TouchableOpacity> */}
        <Text style={[styles.withText, {color: '#797979', marginTop: hp(1)}]}>
          Or Sign up with
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Platform.OS === 'ios' ? '65%' : null,
            alignSelf: 'center',
            marginHorizontal: wp(7),
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={signInFunction}>
            <Image source={ImagePath.google} style={styles.googleLogo} />
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={onAppleSignIn}>
              <Image source={ImagePath.apple} style={styles.googleLogo} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[styles.withText, {color: '#000000'}]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <Text style={[styles.withText, {textDecorationLine: 'underline'}]}>
              Sign In
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
    </KeyboardAwareScrollView>
  );
};
export default SignUp;
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
    fontWeight: '400',
    fontSize: 14,
    color: '#797979',
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
  withText: {
    fontFamily: FONTS.RobotoMedium,
    fontSize: 14,
    alignSelf: 'center',
    color: '#000',
  },
});
