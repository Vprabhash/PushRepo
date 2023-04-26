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
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import {useDispatch} from 'react-redux';
import {fetchProfile} from '../../redux/reducers/profileSlice';
import Toast from 'react-native-simple-toast';
import ApiCall from '../../redux/CommanApi';
const Profile = props => {
  const dispatch = useDispatch();
  const userProfile = async () => {
    // const data = await dispatch(fetchProfile()).then(data => {
    //   console.log('------profile data--------', data);
    // });
    // Email validation

    try {
      const res = await ApiCall(`api/user`, 'GET');
      console.log('---profile--user-----', res);

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
  };
  useEffect(() => {
    userProfile();
  }, []);
  const [accountList, setAccountList] = useState([
    {Title: 'Email Address', Icon: ImagePath.rightIcon},
    {Title: 'Password', Icon: ImagePath.rightIcon},
  ]);
  const accountListRenderItem = ({item, index}) => {
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
  const [notificationList, setNotificationList] = useState([
    {Title: 'Event Alerts', Icon: ImagePath.rightIcon},
    {Title: 'Event Reminders', Icon: ImagePath.rightIcon},
    {Title: 'Artist Updates', Icon: ImagePath.rightIcon},
  ]);
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
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 10,
          paddingTop: 46,
          paddingBottom: 14,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
        </View>
      </View>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 30,
                }}
                source={ImagePath.profileEdit}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: COLORS.black,
                fontFamily: FONTS.RobotoMedium,
                fontSize: 20,
              }}>
              Harry D’suza
            </Text>
            <Image
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
              }}
              source={ImagePath.EditIcon}
            />
          </View>
          <Text style={[styles.settingText, {marginTop: 22}]}>
            Account Settings
          </Text>
          <View style={styles.ProfileList}>
            <FlatList data={accountList} renderItem={accountListRenderItem} />
          </View>
          <Text style={styles.settingText}>Notification Settings</Text>
          <View style={styles.ProfileList}>
            <FlatList
              data={notificationList}
              renderItem={notificationListRenderItem}
            />
          </View>
          <Text style={styles.settingText}>Payment Settings</Text>

          <View style={[styles.ProfileList, {marginBottom: 20}]}>
            <FlatList data={paymentList} renderItem={paymentListRenderItem} />
          </View>
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
});
