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
  TouchableOpacity,
  Image,
  FlatList,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {formatTimeRange} from '../../utils/common';
import HeartIcon from '../HeartIcon';
import {_renderItemClub} from '../../Screen/Listing/ClubListing';
import {artistListRenderItem} from '../../Screen/ArtistDetails/ArtistDetail';
import {logEvent, sendUXActivity} from '../../utils/AddFirebaseEvent';
import {_renderEventItem} from '../../Screen/Listing/EventListing';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Favorites = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('artists');
  useEffect(() => {
    getFavorites();
  }, []);
  const getFavorites = async () => {
    console.log('called');
    const {data} = await ApiCall('api/user/activities/likes', 'GET');
    setData(data);
    // console.log(data, 'favorites data===');
  };

  const EmptyListMessage = () => {
    return <Text style={styles.noDataText}>No Results Found</Text>;
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
            titalTwo="Favourites"
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
        <View style={{flexDirection: 'row'}}>
          {['clubs','artists',  'events'].map((tab, i) => (
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                style={[
                  styles.fllter,
                  {
                    backgroundColor:
                      tab !== selectedTab ? '#ffff' : COLORS.black,
                  },
                ]}
                activeOpacity={0.5}
                onPress={() => {
                  setSelectedTab(tab);
                  // console.log(data[selectedTab], selectedTab)
                }}>
                {/* <Image source={ImagePath.settingIcon} style={styles.iconStyle} /> */}
                <Text
                  style={[
                    styles.filtersText,
                    {
                      color: tab === selectedTab ? '#ffff' : COLORS.black,
                      textTransform: 'uppercase',
                    },
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <FlatList
          data={data[selectedTab]}
          renderItem={item =>
            _renderItem(item, navigation, logEvent, sendUXActivity, selectedTab)
          }
          keyExtractor={item => item._id.toString()}
          ListEmptyComponent={<EmptyListMessage />}
        />
      </ImageBackground>
    </View>
  );
};

export default Favorites;

const _renderItem = (
  item,
  navigation,
  logEvent,
  sendUXActivity,
  selectedTab,
) => {
  if (selectedTab === 'clubs') {
    return _renderItemClub(
      item,
      HeartIcon,
      navigation,
      logEvent,
      sendUXActivity,
    );
  }
  if (selectedTab === 'artists') {
    return artistListRenderItem(
      item,
      HeartIcon,
      navigation,
      logEvent,
      sendUXActivity,
    );
  }
  if (selectedTab === 'events') {
    return _renderEventItem(item, navigation, '', logEvent, sendUXActivity);
  }
};

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
  fllter: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    elevation: 9,
    width: wp(25),
    marginBottom: 20,
    // marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: 7,
    zIndex: 9,
  },
  iconStyle: {
    tintColor: COLORS.primary,
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },
  filtersText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.RobotoMedium,
  },
  noDataText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: hp(1),
    lineHeight: 20,
  },
});
