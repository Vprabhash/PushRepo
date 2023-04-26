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
  Alert,
  View,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../Components/constants';
import LinearGradient from 'react-native-linear-gradient';
import ApiCall from '../../redux/CommanApi';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ForgetPassword = ({route, navigation}) => {
  const [email, setEmail] = useState('');

  const forgotPassApi = async () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    var data = JSON.stringify({
      email: email,
    });
    const res = await ApiCall('api/forgot-password', 'POST', data);
    console.log('--resForgetpass-----', res);
    if (res.ok == true) {
      Toast.show(res.message, Toast.LONG, Toast.BOTTOM);

      navigation.navigate('Otp', {
        forgetmail: 'otp',
        email: email,
      });
    } else {
      Toast.show(res.message, Toast.LONG, Toast.BOTTOM);
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
          {/* <View
            style={{
              paddingHorizontal: 20,
              height: '100%',
              // backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
            <Text style={styles.signIn}>Forget Password</Text>
            <Text
              style={[
                styles.signIn,
                {
                  fontSize: 24,
                  fontFamily: FONTS.RobotoRegular,
                  marginBottom: 56,
                },
              ]}>
              Don't worry, we'll help you get back into your account in no time!
            </Text>
            <CustomTextInput
              title="Enter your email"
              value={email}
              iconPath={ImagePath.msgIcon}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <View>
              <CustomButton
                onclick={() => {
                  forgotPassApi();
                  // props.navigation.navigate('ResetPassword');
                }}
                top={30}
                title="Submit"
                bgColor="#000"
                textColor="#fff"
              />
            </View>
          </LinearGradient>
          {/* </View> */}
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default ForgetPassword;
const styles = StyleSheet.create({
  signIn: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 30,
    color: COLORS.black,
    marginBottom: 15,
  },
});
