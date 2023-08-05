import React, {useState} from 'react';
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
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';
import Toast from 'react-native-simple-toast';
import ApiCall from '../../redux/CommanApi';
import {removeData} from '../../Components/Helper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ResetPassword = ({route, navigation}) => {
  const [email, setEmail] = useState(route.params?.email);
  const Otp = route.params?.otp;
  const [creatPassword, setCreatPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [eyeShow, setEyeShow] = useState('');
  const [eyeShow2, setEyeShow2] = useState('');
  const onClickEye = value => {
    if (value === 'creatPassword') {
      setEyeShow(!eyeShow);
    } else {
      setEyeShow2(!eyeShow2);
    }
  };
  const logOut = async () => {
    GoogleSignin.signOut();
    await removeData('userToken');
    await removeData('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'PasswordSuccessful'}],
    });
  };
  const resetPassApi = async () => {
    const minPasswordLength = 6;
    if (creatPassword.length < minPasswordLength) {
      Alert.alert(
        'Invalid password',
        `Password must be at least ${minPasswordLength} characters long.`,
      );
      return;
    }
    if (creatPassword === newPassword) {
      var data = {
        email: email,
        otp: Otp,
        password: newPassword,
      };
      try {
        const res = await ApiCall(
          'api/reset-password',
          'POST',
          JSON.stringify(data),
        );
        if (res.ok == true) {
          Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);
          logOut();
        }
      } catch (error) {
        Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
      }
    } else {
      Alert.alert(
        "Passwords don't match",
        'Please make sure the passwords match.',
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%', justifyContent: 'center'}}>
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
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.1)',
            ]}>
            <Text style={styles.signIn}>Reset Password </Text>
            <Text
              style={[
                styles.signIn,
                {
                  fontSize: 24,
                  fontFamily: FONTS.DMSansRegular,
                  marginBottom: 40,
                  lineHeight: 30,
                },
              ]}>
              Your new password must be different from previous password
            </Text>
            <CustomTextInput
              title="Create new password"
              onChangeText={text => {
                setCreatPassword(text);
              }}
              value={creatPassword}
              iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
              secureTextEntry={eyeShow ? false : true}
              onClickEye={() => {
                onClickEye('creatPassword');
              }}
            />
            <CustomTextInput
              marginTop={20}
              title="Enter new password again"
              onChangeText={text => {
                setNewPassword(text);
              }}
              value={newPassword}
              iconPath={eyeShow2 ? ImagePath.eyeIcon : ImagePath.closeEye}
              secureTextEntry={eyeShow2 ? false : true}
              onClickEye={() => {
                onClickEye('newPassword');
              }}
            />
            <CustomButton
              onclick={() => {
                resetPassApi();
                // props.navigation.navigate('PasswordSuccessful');
              }}
              top={40}
              title="Submit"
              bgColor="#000"
              textColor={COLORS.white}
            />
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default ResetPassword;
const styles = StyleSheet.create({
  signIn: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 30,
    color: COLORS.black,
    marginBottom: 15,
  },
});
