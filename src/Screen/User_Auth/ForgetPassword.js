import React, {useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Image,
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
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ForgetPassword = ({route, navigation}) => {
  const [email, setEmail] = useState(route?.params?.email || '');
  const [isLoading, setLoading] = useState(false);
  const isReset = route.params?.isReset;
  const forgotPassApi = async () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    var data = {
      email: email,
    };
    setLoading(true);
    try {
      const res = await ApiCall(
        'api/forgot-password',
        'POST',
        JSON.stringify(data),
      );
      if (res.ok == true) {
        Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);

        navigation.navigate('Otp', {
          forgetmail: 'otp',
          email: email,
        });
      } else {
        Toast.showWithGravity(res?.message, Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setLoading(false);
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
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginLeft: 10, marginTop: getStatusBarHeight() + 10}}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={ImagePath.goBack}
            />
          </TouchableOpacity>
          {/* <View
            style={{
              // justifyContent: 'center',
              height: '100%',
            }}> */}
          <LinearGradient
            style={{
              paddingHorizontal: 20,
              height: height - getStatusBarHeight() + 10,
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
            <Text style={styles.signIn}>{`${
              isReset ? 'Reset' : 'Forget'
            } Password`}</Text>
            <Text
              style={[
                styles.signIn,
                {
                  fontSize: 22,
                  fontFamily: FONTS.RobotoRegular,
                  marginBottom: 56,
                },
              ]}>
              {`Don't worry, we'll help you ${
                isReset
                  ? 'in resetting your password'
                  : 'get back into your account'
              } in no time!`}
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
                isLoading={isLoading}
              />
            </View>
          </LinearGradient>
          {/* </View> */}
        </ImageBackground>
      </KeyboardAwareScrollView>
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
