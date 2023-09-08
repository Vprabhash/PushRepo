import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import ImagePath from '../../assets/ImagePath';
import CustomTextInput from '../../Components/TextInput_And_Button/CustomTextInput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import Header from '../Header';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EditProfile = props => {
  const navigation = useNavigation();
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const handleEditProfile = async () => {
    var data = {
      firstName: name?.firstName,
      lastName: name?.lastName,
      phoneNumber: number,
    };

    try {
      setLoading(true);
      const res = await ApiCall('api/user', 'POST', JSON.stringify(data));
      if (res.ok == true) {
        props.route?.params?.refresh();
        navigation.goBack();
      }
      Toast.showWithGravity(
        res?.message || res?.data?.message || 'Something went wrong',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const res = await ApiCall('api/user', 'GET');
      if (res != null) {
        setName({
          ...name,
          firstName: res?.data?.firstName,
          lastName: res?.data?.lastName,
        });
        setNumber(res?.data?.phoneNumber);
        setEmail(res?.data?.username);
      }
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: height * 1.1, width: width}}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 46,
            paddingBottom: 14,
            paddingHorizontal: 15,
          }}>
          <Header
            Back_Arrow={ImagePath.goBack}
            titalTwo="Edit Profile"
            iconHeight={13}
            iconWidth={30}
            onclick={() => {
              navigation.goBack();
            }}
          />
        </View>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />

        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{width: '45%'}}>
              <Text style={styles.labels}>First name</Text>
              <CustomTextInput
                title="First Name"
                //   iconPath={ImagePath.msgIcon}
                onChangeText={text => {
                  setName({...name, firstName: text});
                }}
                value={name.firstName}
              />
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.labels}>Last name</Text>
              <CustomTextInput
                title="Last Name"
                //   iconPath={ImagePath.msgIcon}
                onChangeText={text => {
                  setName({...name, lastName: text});
                }}
                value={name?.lastName}
              />
            </View>
          </View>
          <Text style={styles.labels}>Phone number</Text>
          <CustomTextInput
            // marginTop={10}
            maxLength={10}
            title="Phone Number"
            onChangeText={text => {
              setNumber(text);
            }}
            value={number}
          />
          {/* <Text style={styles.labels}>Email Address</Text>
          <CustomTextInput
            // marginTop={10}
            title=" Email Address"
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            editable={false}
            iconPath={ImagePath.msgIcon}
          /> */}
          <CustomButton
            onclick={handleEditProfile}
            top={150}
            title="Update Profile"
            bgColor="#000"
            textColor="#fff"
            isLoading={isLoading}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default EditProfile;
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
  labels: {
    fontFamily: FONTS.AxiformaMedium,
    fontSize: 16,
    color: '#202020',
    marginTop: 15,
    paddingLeft: 8,
  },
});
