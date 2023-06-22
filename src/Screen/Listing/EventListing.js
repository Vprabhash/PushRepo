import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import HeaderCitySearch from '../../Components/HeaderCitySearch';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const EventListing = props => {
  const locationLatLong = useSelector(
    state => state.clubLocation.locationLatLong,
  );
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [nearByEvents, setNearByEvents] = useState([]);
  const [dontCall, setDontCall] = useState(false);

  useEffect(() => {
    list(page);
  }, [page, selectedCity, userBaseCity]);

  useEffect(() => {
    eventsNearbyDataApi();
  }, [locationLatLong]);

  const renderFooter = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            style={{marginLeft: 8}}
          />
        ) : null}
      </View>
    );
  };

  const list = async page => {
    const queryParams = new URLSearchParams();
    queryParams.append('upcoming', 1);
    queryParams.append('page', page);
    queryParams.append('city', selectedCity);
    queryParams.append('userBaseCity', userBaseCity);
    const res = await ApiCall(`api/events?${queryParams}`, 'GET');
    console.log('---res--logIn--artist---', res?.data);
    if (Array.isArray(res?.data)) {
      setEvents(res?.data);
    }
    if (Array.isArray(res?.data)) {
      if (page === 0) {
        setEvents(res?.data);
        setDontCall(false);
      } else {
        if (res?.data?.length) {
          setEvents([...events, ...res?.data]);
        } else {
          setDontCall(true);
        }
      }
    } else {
      setDontCall(false);
      Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
    }
  };

  const eventsNearbyDataApi = () => {
    try {
      ApiCall(
        `api/events?upcoming=1&coordinates=${locationLatLong?.latitude || ''}${
          locationLatLong?.latitude ? ',' : ''
        }${locationLatLong?.longitude || ''}&radius=5000&sort_dir=desc`, //${19.136326},${72.82766}
        'GET',
      ).then(res => {
        if (Array.isArray(res?.data)) {
          // console.log(res?.data, '=========');
          setNearByEvents(res?.data);
          // if (page === 0) {
          //   setNearByEvents(res?.data);
          //   setDontCall(false);
          // } else {
          //   if (res?.data?.length) {
          //     setNearByEvents([...nearByEvents, ...res?.data]);
          //   } else {
          //     setDontCall(true);
          //   }
          // }
        } else {
          setDontCall(false);
          Toast.showWithGravity(
            'Something went wrong',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }
      });
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  const fetchMoreData = () => {
    if (!onEndReachedCalledDuringMomentum && !loading) {
      setLoading(true);
      setPage(page + 1);
      setonEndReachedCalledDuringMomentum(true);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: hp(3)}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ArtistPlayingDetail', {
              artistData: item,
            });
          }}
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          {item?.images?.length &&
          item?.images[0] &&
          typeof item?.images[0]?.path == 'string' ? (
            <FastImage
              style={{
                height: hp(29),
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={{uri: item?.images[0]?.path}}
            />
          ) : (
            <View
              style={{
                height: hp(29),
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                backgroundColor: COLORS.gray,
              }}
            />
          )}
          <View
            style={{
              height: 39,
              minWidth: 32,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              top: 8,
              right: 8,
            }}>
            <Text
              style={{
                color: '#666666',
                textAlign: 'center',
                fontFamily: FONTS.AxiformaBold,
                fontSize: 12,
              }}>
              {moment(item?.eventDate).format('DD')}
            </Text>
            <Text
              style={{
                color: '#666666',
                textAlign: 'center',
                fontFamily: FONTS.AxiformaRegular,
                fontSize: 12,
                textTransform: 'uppercase',
              }}>
              {moment(item?.eventDate).format('MMM')}
            </Text>
          </View>
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <Text style={styles.listinhHeading}>{item.title}</Text>
            <Text style={[styles.singerName, {width: '70%'}]}>
              By {item?.artists?.map(e => e?.name)?.join(', ')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.listingText}>
                {[item?.address?.locality || '', item?.address?.city || '']
                  .filter(e => e)
                  .join(', ')}
              </Text>
              <View style={{marginTop: -10, alignItems: 'center'}}>
                <Text style={[styles.listingText, {color: COLORS.black}]}>
                  {'₹' + item?.price?.amount}
                </Text>
                <Text
                  style={[
                    styles.listinhText,
                    {marginTop: 0, fontFamily: FONTS.AxiformaRegular},
                  ]}>
                  onwards
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const eventRenderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '50%', marginBottom: hp(3)}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ArtistPlayingDetail', {
              artistData: item,
            });
          }}
          style={{
            marginLeft: 15,
            marginRight: index == 2 ? 15 : 0,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          {item?.artists?.length &&
          item?.images[0] &&
          typeof item?.images[0]?.path == 'string' ? (
            <Image
              style={{
                height: hp(18),
                width: wp(45),
                resizeMode: 'cover',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={{uri: item?.images[0]?.path}}
            />
          ) : (
            <View
              style={{
                height: hp(22),
                width: wp(45),
                resizeMode: 'cover',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            />
          )}
          <View style={{padding: wp(3), width: wp(38)}}>
            <Text
              style={[
                styles.listinhHeading1,
                {marginBottom: hp(0.5), width: wp(38)},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.singerName,
                {
                  width: '100%',
                  marginTop: 0,
                },
              ]}>
              By {item?.artists?.map(e => e?.name)?.join(', ')}
            </Text>
            <Text style={styles.listinhText}>
              {item?.eventDate
                ? moment(item?.eventDate).format('ddd, DD MMM')
                : null}
            </Text>
            <Text style={styles.listinhText}>
              {`${moment(item?.eventStartTime).format('hh:mm A')} - ${moment(
                item?.eventEndTime,
              ).format('hh:mm A')}`}
            </Text>
            <Text style={[styles.listinhText, {width: '98%'}]}>
              {[item?.address?.locality || '', item?.address?.city || '']
                .filter(e => e)
                .join(', ')}
            </Text>
            <Text
              style={[
                styles.listingText,
                {color: COLORS.black, marginTop: hp(2)},
              ]}>
              {'₹' + item?.price?.amount}
            </Text>
            <Text style={[styles.listinhText, {marginTop: 0}]}>onwards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return <Text style={styles.noDataText}>No Events Found</Text>;
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        {/* <View style={{marginHorizontal: 15, marginTop: 46, marginBottom: 14}}>
          <Header
            Back_Arrow={ImagePath.manueIcon}
            searchIcon={ImagePath.searchIcon}
            placeholder="Search"
            iconHeight={12}
            iconWidth={18}
            profileIcon={ImagePath.profilePic}
          />
        </View> */}
        <View
          style={{
            paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 46,
          }}>
          <HeaderCitySearch
            onPress={() => {
              props.navigation.navigate('SearchBar');
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <Text style={styles.cardText}>Events near me</Text>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          {nearByEvents?.length ? (
            <FlatList
              horizontal
              data={nearByEvents}
              renderItem={eventRenderItem}
            />
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.noDataText, {marginTop: 0}]}>
                No Events Found
              </Text>
            </View>
          )}
          <View style={[styles.hedingTextMain, {}]}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <Text style={styles.cardText}>UPCOMING EVENTS IN TOWN</Text>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          <FlatList
            data={events}
            renderItem={_renderItem}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={dontCall ? null : fetchMoreData}
            ListEmptyComponent={EmptyListMessage}
            maxToRenderPerBatch={15}
          />
        </ScrollView>
        {/* {<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <View style={{}}>
              <Text style={styles.cardText}> Coming Soon </Text>
            </View>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
        </View>} */}
      </ImageBackground>
    </View>
  );
};
export default EventListing;
const styles = StyleSheet.create({
  //event
  singerName: {
    fontSize: 12,
    marginVertical: hp(0.5),
    fontFamily: FONTS.AxiformaBold,
    color: '#575757',
  },
  hedingTextMain: {
    marginVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  hedingImg: {width: wp(30), resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },

  listinhHeading1: {
    fontSize: 16,
    fontFamily: FONTS.AxiformaSemiBold,
    color: '#202020',
  },
  listinhText: {
    fontSize: 12,
    fontFamily: FONTS.AxiformaSemiBold,
    color: '#575757',
    marginTop: hp(0.5),
  },

  listinhHeading: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaSemiBold,
    color: COLORS.black,
  },
  listinhText1: {
    fontSize: 14,
    fontFamily: FONTS.RobotoMedium,
    color: '#5B5959',
  },
  noDataText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: hp(1),
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
});
