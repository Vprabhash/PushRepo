import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import ApiCall from '../../redux/CommanApi';
import CustomButton from '../TextInput_And_Button/CustomButton';
import {removeData} from '../Helper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
const Profile = ({navigation}) => {
  // const dispatch = useDispatch();
  const [userProfileData, setUserProfileData] = useState({});
  const [img, setimg] = useState('');
  const [forgetEmail, setForgetEmail] = useState('');

  const accountList = [
    {
      Title: 'Edit Profile',
      Icon: ImagePath.rightIcon,
      onPress: () => {
        navigation.navigate('EditProfile', {refresh: userProfile});
      },
    },
    {
      Title: 'Reset Password',
      Icon: ImagePath.rightIcon,

      onPress: () => {
        console.log('userProfileData===', userProfileData?.email);
        navigation.navigate('ForgetPassword', {
          email: userProfileData?.email,
          isReset: true,
        });
      },
    },
    {
      Title: 'Delete Account',
      Icon: ImagePath.rightIcon,
      onPress: () => deacctivateAcc(),
    },
    {
      Title: 'Location Info',
      Icon: ImagePath.rightIcon,
      onPress: () => locationAlert(),
    },
    {
      Title: 'Terms & Conditions',
      Icon: ImagePath.rightIcon,
      onPress: () =>
        Linking.openURL('https://www.azzirevents.com/terms_conditions.html'),
    },
    {
      Title: 'Privacy Policy',
      Icon: ImagePath.rightIcon,
      onPress: () =>
        Linking.openURL('https://www.azzirevents.com/privacy_policy.html'),
    },
    {
      Title: 'Log out',
      Icon: ImagePath.rightIcon,
      onPress: () => logOut(),
      color: 'red',
    },
  ];

  const [notificationList, setNotificationList] = useState([
    {Title: 'Event Alerts', Icon: ImagePath.rightIcon},
    {Title: 'Event Reminders', Icon: ImagePath.rightIcon},
    {Title: 'Artist Updates', Icon: ImagePath.rightIcon},
  ]);
  const locationLatLong = useSelector(
    state => state.clubLocation.locationLatLong,
  );
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  useEffect(() => {
    userProfile();
  }, []);

  const locationAlert = () => {
    Alert.alert(
      'Location Info',
      `Latitude: ${locationLatLong?.latitude}${'\n'}Longitude: ${
        locationLatLong?.longitude
      }${'\n'}Selected City: ${selectedCity}${'\n'}Base City: ${userBaseCity}`,
    );
  };

  const userProfile = async () => {
    try {
      const res = await ApiCall(`api/user`, 'GET');
      console.log('---profile--user-----', res?.data);
      if (res?.data?.username) {
        setUserProfileData(res?.data);
        setimg(res?.data?.avatarUrl);
      } else {
        Toast.showWithGravity(
          res?.data?.message || 'Something went wrong',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  const logOut = async () => {
    GoogleSignin.signOut();
    LoginManager.logOut();
    await removeData('userToken');
    await removeData('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const deacctivateAcc = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: async () => {
            console.log('Deactivate pressed');
            try {
              const res = await ApiCall(`api/user/deactivate`, 'POST');
              console.log('---deactivate--user-----', res);
              if (res.ok) {
                Toast.showWithGravity(
                  'Account Deleted Successfully',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
                logOut();
              } else {
                Toast.showWithGravity(
                  res?.message || 'Something went wrong',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }
            } catch (error) {
              Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
            }
          },
        },
      ],
    );
  };
  const openPicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('selected image', response.assets?.[0]);
        setimg(response.assets?.[0]?.uri);
        uploadImage(response.assets?.[0]);
      }
    });
  };

  const uploadImage = async imageResponse => {
    try {
      const formData = new FormData();

      formData.append('file', {
        name: imageResponse.fileName || 'profileImage',
        type: imageResponse.type || 'jpg',
        uri:
          Platform.OS === 'android'
            ? imageResponse.uri
            : imageResponse.uri.replace('file://', ''),
      });
      // console.log('---profile--data-----', {
      //   name: imageResponse.fileName || 'profileImage',
      //   type: imageResponse.type || 'jpg',
      //   uri:
      //     Platform.OS === 'android'
      //       ? imageResponse.uri
      //       : imageResponse.uri.replace('file://', ''),
      // });

      console.log('---form--Data-----', typeof formData);
      const res = await ApiCall(`api/user/avatar`, 'POST', formData);
      // console.log('---profile--user-----', res?.data);

      if (res?.data?.username) {
        setUserProfileData(res?.data);
      } else {
        Toast.showWithGravity(
          res?.data?.message || 'Something went wrong',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };
  const accountListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={{
          flex: 1,
          marginTop: index == 0 ? 0 : 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: item?.color ?? COLORS.black,
            fontFamily: FONTS.RobotoRegular,
            fontSize: 16,
          }}>
          {item?.Title}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <Image
            style={[styles.rightIcon, {tintColor: item?.color ?? null}]}
            source={item?.Icon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const notificationListRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: index == 0 ? 0 : 23,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: COLORS.black,
            fontFamily: FONTS.RobotoRegular,
            fontSize: 16,
          }}>
          {item?.Title}
        </Text>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Image style={styles.rightIcon} source={item?.Icon} />
        </TouchableOpacity>
      </View>
    );
  };
  const [paymentList, setPaymentList] = useState([
    {Title: 'Payment Methods', Icon: ImagePath.rightIcon},
    {Title: 'Transaction History', Icon: ImagePath.rightIcon},
    {Title: 'Payment Security', Icon: ImagePath.rightIcon},
  ]);
  const paymentListRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: index == 0 ? 0 : 23,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: COLORS.black,
            fontFamily: FONTS.RobotoRegular,
            fontSize: 16,
          }}>
          {item?.Title}
        </Text>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Image style={styles.rightIcon} source={item?.Icon} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* <View
        style={{
          backgroundColor: '#fff',
          elevation: 10,
          paddingTop: 46,
          paddingBottom: 14,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            paddingTop: 46,
            paddingBottom: 14,
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Image
                style={{
                  height: 12,
                  width: 12,
                  resizeMode: 'contain',
                }}
                source={ImagePath.goBack}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: COLORS.black,
                fontFamily: FONTS.RobotoRegular,
                fontSize: 16,
              }}>
              My Account
            </Text>

            <Image
              style={{
                width: 21,
                height: 16,
                resizeMode: 'contain',
                borderRadius: 30,
              }}
              source={ImagePath.checkSelected}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: COLORS.black,
              fontFamily: FONTS.RobotoRegular,
              fontSize: 16,
            }}>
            My Account
          </Text>

          <Image
            style={{
              width: 21,
              height: 16,
              resizeMode: 'contain',
              borderRadius: 30,
            }}
            source={ImagePath.checkSelected}
          />
        </View>
      </View> */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%'}}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={styles.profileImgContainer}
                onPress={openPicker}>
                {img ? (
                  <Image style={styles.profileImg} source={{uri: img}} />
                ) : (
                  <Image
                    style={styles.profileIcon}
                    source={ImagePath.profile}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: wp(5),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: FONTS.AxiformaMedium,
                      fontSize: 20,
                    }}>
                    {userProfileData?.firstName || userProfileData?.lastName
                      ? `${userProfileData?.firstName || ''} ${
                          userProfileData?.lastName || ''
                        }`
                      : 'Anonymous'}
                  </Text>
                  {/* <Image
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: 'contain',
                      marginLeft: 5,
                    }}
                    source={ImagePath.EditIcon}
                  /> */}
                </View>
                {userProfileData?.email && (
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: FONTS.AxiformaMedium,
                      fontSize: 12,
                      width: wp(60),
                    }}>
                    {userProfileData?.email}
                  </Text>
                )}
                {userProfileData?.phoneNumber && (
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: FONTS.AxiformaMedium,
                      fontSize: 12,
                    }}>
                    {userProfileData?.phoneNumber}
                  </Text>
                )}
              </View>
            </View>

            <Text style={[styles.settingText, {marginTop: 22}]}>
              Account Settings
            </Text>
            <View style={styles.ProfileList}>
              <FlatList data={accountList} renderItem={accountListRenderItem} />
            </View>
            {/* <Text style={styles.settingText}>Notification Settings</Text>
          <View style={styles.ProfileList}>
            <FlatList
              data={notificationList}
              renderItem={notificationListRenderItem}
            />
          </View>
          <Text style={styles.settingText}>Payment Settings</Text>

          <View style={[styles.ProfileList, {marginBottom: 10}]}>
            <FlatList data={paymentList} renderItem={paymentListRenderItem} />
          </View> */}
            {/* <View style={{marginHorizontal: 20, marginBottom: 40}}>
              <CustomButton
                onclick={logOut}
                top={30}
                title="Log out"
                bgColor="#000"
                textColor="#fff"
              />
            </View> */}
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  ProfileList: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    paddingLeft: 15,
    paddingRight: 25,
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 10,
    elevation: 10,
  },
  rightIcon: {
    height: 15,
    width: 9,
    tintColor: '#000000',
    resizeMode: 'cover',
  },
  settingText: {
    color: '#424242',
    fontSize: 20,
    fontFamily: FONTS.RobotoBold,
    marginHorizontal: 15,
    marginTop: 30,
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
  profileIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
});
