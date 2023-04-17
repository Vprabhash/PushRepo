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
import {signUp} from '../../redux/reducers/authSlice';
import {FONTS} from '../../Components/constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const SignUp = props => {
  const [email, setEmail] = useState('');
  const [creatPassword, setCreatpassword] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);

  const handleSignUp = () => {
    // Email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    // Password validation
    const minPasswordLength = 6;
    if (creatPassword.length < minPasswordLength) {
      Alert.alert(
        'Invalid password',
        `Password must be at least ${minPasswordLength} characters long.`,
      );
      return;
    }
    if (creatPassword === password) {
      dispatch(signUp({email: email.toLowerCase(), password}))
        .unwrap()
        .then(response => {
          // TODO: handle response
          // props.navigation.navigate('Otp');
          console.log(response);
        })
        .catch(error => {
          Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
          console.error('Sign up error:', error.message);
        });
    } else {
      Alert.alert(
        "Passwords don't match",
        'Please make sure the passwords match.',
      );
    }
  };
  const [eyeShow, setEyeShow] = useState('');
  const [eyeShow2, setEyeShow2] = useState('');
  const onClickEye = value => {
    if (value === 'createPassword') {
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
            setCreatpassword(text);
          }}
          value={creatPassword}
          iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
          secureTextEntry={!eyeShow}
          onClickEye={() => {
            onClickEye('createPassword');
          }}
        />
        <CustomTextInput
          marginTop={20}
          title=" Enter password again"
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
          iconPath={eyeShow2 ? ImagePath.eyeIcon : ImagePath.closeEye}
          secureTextEntry={!eyeShow2}
          onClickEye={() => {
            onClickEye('password');
          }}
        />
        <CustomButton
          onclick={() => {
            props.navigation.navigate('Otp');
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
          marginHorizontal: wp(7),
        }}>
        <Image source={ImagePath.google} style={styles.googleLogo} />
        <Image source={ImagePath.apple} style={styles.googleLogo} />
      </View>
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
