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
  Dimensions,
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
import {ARTIST} from '../../services/Apis';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeShow, setEyeShow] = useState('');
  const onClickEye = () => {
    setEyeShow(!eyeShow);
  };

  const signin = async () => {
    const res = await ApiCall(ARTIST, 'GET');
    console.log('---res--logIn--artist---', res);
  };
  useEffect(() => {
    signin();
  }, []);

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
              props.navigation.navigate('BottomTab');
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
            marginHorizontal: wp(7),
          }}>
          <Image source={ImagePath.google} style={styles.googleLogo} />
          <Image source={ImagePath.apple} style={styles.googleLogo} />
        </View>

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
