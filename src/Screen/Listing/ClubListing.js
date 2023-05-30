import React, {useState, useEffect, useReducer} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import ImagePath from '../../assets/ImagePath';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import FilterScreen from '../../Components/Filter/FilterScreen';
import HeaderCitySearch from '../../Components/HeaderCitySearch';
import {useSelector} from 'react-redux';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import { SafeAreaView } from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ClubListing = ({navigation, route}) => {
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const locationLatLong = useSelector(
    state => state.clubLocation.locationLatLong,
  );
  const [clubs, setClubs] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valuekey, setValuekey] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [dontCall, setDontCall] = useState(false);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState('');
  const [isCall, setIsCall] = useState(true);

  useEffect(() => {
    setLoader(true);
    list(page);
    forceUpdate();
    console.log('Page', page, selectedCity);
  }, [page, filteredData, selectedCity, userBaseCity]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // console.log('this is params', route?.params);
      // const routes = navigation.getState().routes;
      // const prevRoute = routes[routes.length - 2];
      // // console.log('this is params prevRoute', routes);
      // if (route?.params?.screenName !== 'ClubListing') {
      //   console.log('this is params', route?.params);
      //   setPage(0);
      //   setFilteredData({});
      // }
      setDontCall(false);
      setFilterComponent(false);
    });
  }, []);

  function areAllKeysEmpty(obj) {
    return Object.values(obj).every(value => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    });
  }

  const list = async page => {
    let tempLocality = [];
    for (let i = 0; i < filteredData?.locality?.length; i++) {
      if (filteredData?.locality[i].checked == true) {
        let details = {};
        details = filteredData?.locality[i].value;
        tempLocality.push(details);
      }
    }
    let tempdataGenres = [];
    for (let i = 0; i < filteredData?.musicGenre?.length; i++) {
      if (filteredData?.musicGenre[i].checked == true) {
        let details = {};
        details = filteredData?.musicGenre[i].value;
        tempdataGenres.push(details);
      }
    }
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      if (locationLatLong?.latitude || locationLatLong?.longitude) {
        queryParams.append(
          'coordinates',
          [locationLatLong.latitude, locationLatLong.longitude].join(','),
        );
      }
      if (filteredData?.vegNonVeg) {
        queryParams.append('vegNonVeg', filteredData?.vegNonVeg);
      }
      if (tempLocality?.length) {
        queryParams.append('locality', tempLocality?.join('|'));
      }
      if (filteredData?.stagsAllowed) {
        queryParams.append('stagsAllowed', filteredData?.stagsAllowed);
      }
      if (tempdataGenres?.length) {
        queryParams.append('musicGenre', tempdataGenres?.join('|'));
      }
      if (filteredData?.kidsFriendly) {
        queryParams.append('kidsFriendly', filteredData?.kidsFriendly);
      }
      if (filteredData?.happyHours) {
        queryParams.append('happyHoursTimings', filteredData?.happyHours);
      }
      if (filteredData?.sheesha) {
        queryParams.append('seeshaServe', filteredData?.sheesha);
      }
      if (filteredData?.liveMusicDj) {
        queryParams.append('liveMusicDj', filteredData?.liveMusicDj);
      }
      if ('city') {
        //queryParams.append('city', 'Mumbai');
        console.log('-=-==-=-=-=-=-SC-=-=-=-=', selectedCity);
        queryParams.append('city', selectedCity);
      }
      queryParams.append('userBaseCity', userBaseCity);
      console.log('=====********============', queryParams);
      ApiCall(`api/clubs?${queryParams}`, 'GET').then(res => {
        console.log('---res--club listin---', res?.status);
        // setStatus(res?.status);
        if (Array.isArray(res?.data)) {
          if (page === 0) {
            // if (res?.status !== 'fallback-data') {
            setClubs(res?.data);
            // } else {
            //   setClubs([]);
            // }
            setDontCall(false);
          } else {
            if (res?.data?.length) {
              // if (res?.status !== 'fallback-data') {
              setClubs([...clubs, ...res?.data]);
              // }
            } else {
              setDontCall(true);
            }
          }
        } else {
          setDontCall(false);
          Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
        }
      });
    } catch (error) {
      setDontCall(false);
      console.log(error);
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  const fetchMoreData = () => {
    console.log('calling');
    if (!onEndReachedCalledDuringMomentum && !loading) {
      // if (status !== 'fallback-data') {
      setLoading(true);
      setPage(page + 1);
      setonEndReachedCalledDuringMomentum(true);
      // }
    }
  };
  const renderFooter = () => {
    return loading ? (
      <View style={{paddingTop: 50, paddingBottom: 80}}>
        <ActivityIndicator
          color={COLORS.primary}
          size={'small'}
          style={{marginLeft: 8}}
        />
      </View>
    ) : null;
  };

  const searchApi = async text => {
    setFilteredData({});
    if (valuekey) {
      const res = await ApiCall(`api/search?q=${valuekey}`, 'GET');
      console.log('---searchApi--->', res?.data?.clubs?.length);
      setClubs(res?.data?.clubs);
    } else {
      setPage(0);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ClubDetails', {listDetail: item});
            }}
            activeOpacity={0.7}>
            {item?.media?.ambienceImages &&
            item?.media?.ambienceImages?.length ? (
              <FastImage
                style={{
                  height: hp(29),
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: item?.media?.ambienceImages[0],
                }}
              />
            ) : (
              <View
                style={{
                  height: hp(29),
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              />
            )}
          </TouchableOpacity>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              position: 'absolute',
              top: 10,
              right: 10,
            }}
            source={item.heartIcon}
          />
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listinhHeading}>{item?.name}</Text>
              <LinearGradient
                style={{
                  flexDirection: 'row',
                  height: 24,
                  width: 40,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  alignItems: 'center',
                }}
                start={{x: 0.3, y: 0.4}}
                colors={['rgba(254, 0, 182, 1)', 'rgba(1, 172, 203, 1)']}>
                <Image
                  style={{height: 10, width: 10, tintColor: '#FFFFFF'}}
                  source={ImagePath.star}
                />
                <Text
                  style={{
                    fontFamily: FONTS.RobotoBold,
                    color: '#FFFFFF',
                    fontSize: 12,
                  }}>
                  {item?.zomatoRating || '-'}
                </Text>
              </LinearGradient>
            </View>
            <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
              Restrobar
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.listingText}>
                {`${item?.locality}, ${item?.city}`}
              </Text>
              <Text style={styles.listingText} numberOfLines={1}>
                ₹{item?.cost}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return <Text style={styles.noDataText}>No Clubs Found</Text>;
  };
  const [filterComponent, setFilterComponent] = useState(false);
  const onPressApply = async data => {
    console.log('-------filterApi', data);
    setFilteredData(data);
    setFilterComponent(false);
    setPage(0);
  };

  const onPressCancel = () => {
    setFilterComponent(false);
  };

  const onChangeCity = city => {};
  if (filterComponent) {
    return (
      <FilterScreen
        onPressApply={onPressApply}
        onPressCancel={onPressCancel}
        isArtistFilter={false}
        selectedFilter={filteredData}
      />
    );
  }

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
        style={{height: '100%'}}>
          <View style={{paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 46}}>
          <HeaderCitySearch
            onPress={() => {
              navigation.navigate('SearchBar');
            }}
          />
          </View>
          <View style={{marginHorizontal: 5, flex: 1}}>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('SearchBar');
            }}>
            <View style={[styles.inputMain, {marginTop: 50, marginBottom: 20}]}>
              <TextInput
                style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholder={'Search by Area, Genre, Artist or Club'}
                editable={false}
                onChangeText={text => {
                  // searchApi(text)
                  setValuekey(text);
                }}
                value={valuekey}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={searchApi}>
                <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.fllter,
              {
                borderWidth: areAllKeysEmpty(filteredData) ? 0 : 1,
                borderColor: COLORS.primary,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => {
              setFilterComponent(true);
            }}>
            <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
            <Text style={styles.filtersText}>Filters</Text>
            {/* <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: 'red',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            /> */}
          </TouchableOpacity>

          <FlatList
            data={clubs}
            renderItem={_renderItem}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={dontCall ? null : fetchMoreData}
            ListEmptyComponent={EmptyListMessage}
            maxToRenderPerBatch={15}
          />
          </View>
      </ImageBackground>
    </View>
  );
};
export default ClubListing;
const styles = StyleSheet.create({
  filtersText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.RobotoMedium,
  },
  fllter: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    elevation: 9,
    width: wp(25),
    marginBottom: 20,
    marginHorizontal: 15,
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
  noDataText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: hp(1),
  },
  listinhHeading: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
    width: '85%',
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },

  inputMain: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 16,
    marginHorizontal: 15,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
  },

  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    padding: 0,
    height: hp(6),
    color: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },

  titleText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    marginTop: hp(1),
  },
});
