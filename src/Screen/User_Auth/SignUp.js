import React, {useEffect, useState} from 'react';
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
  Alert,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setData} from '../../Components/Helper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const SignUp = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (confirmPassword === password) {
      const data = {
        email: email,
      };
      try {
        const res = await ApiCall('api/send-otp', 'POST', JSON.stringify(data));
        console.log('---res--otp-----', res);
        if (res.ok == true) {
          Toast.show(res.message, Toast.LONG, Toast.BOTTOM);
          props.navigation.navigate('Otp', {
            email: email,
            password: password,
          });
        } else {
          Toast.show(res.message, Toast.LONG, Toast.BOTTOM);
        }
      } catch (error) {
        Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
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
      //     Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
      //     console.error('Sign up error:', error.message);
      //   });
    } else {
      Alert.alert(
        "Passwords don't match",
        'Please make sure the passwords match.',
      );
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
      console.log('lofuser data-------:', userInfo);

      const data = {
        name: userInfo?.user?.name,
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
          setData('userData', res?.data);
          setData(
            'userToken',
            res?.data?.connectedAuthProviders?.google?.accessToken,
          );
          props.navigation.reset({
            index: 0,
            routes: [{name: 'BottomTab'}],
          });
        }
      } catch (error) {
        Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
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
    <ImageBackground
      source={ImagePath.Azzir_Bg}
      resizeMode="cover"
      style={{height: height * 1.1, width: width}}>
      <StatusBar
        barStyle="dark-content"
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
          title="Enter your email"
          iconPath={ImagePath.msgIcon}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
        />
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
        <CustomButton
          onclick={() => {
            handleSignUp();
          }}
          top={30}
          title="Sign up"
          bgColor="#000"
          textColor="#fff"
          isLoading={authStatus === 'loading'}
        />
      </View>
      <Text style={[styles.withText, {color: '#797979', marginTop: hp(4)}]}>
        Or Sign up with
      </Text>

      <TouchableOpacity
        onPress={() => {
          signInFunction();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
          marginHorizontal: wp(7),
        }}>
        <Image source={ImagePath.google} style={styles.googleLogo} />
        {Platform.OS === 'ios' && (
          <Image source={ImagePath.apple} style={styles.googleLogo} />
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={[styles.withText, {color: '#000000'}]}>
          Already have an account{' '}
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
    </ImageBackground>
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
