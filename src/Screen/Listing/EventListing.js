import React, {useEffect, useRef, useState} from 'react';
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
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import HeaderCitySearch from '../../Components/HeaderCitySearch';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {logEvent, sendUXActivity} from '../../utils/AddFirebaseEvent';
import {createEventName} from '../../utils/common';
import ArtistListModal from '../../Components/ArtistListModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const EventListing = props => {
  const flatListRef = useRef(null);
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
  const [eventData, setEventData] = useState(null);
  const [artistListModal, setArtistListModal] = useState(false);
  const [artistListModalData, setArtistListModalData] = useState([]);

  useEffect(() => {
    setPage(0);
    list(0);
    toTop();
  }, [selectedCity, userBaseCity]);

  useEffect(() => {
    list(page);
  }, [page, selectedCity, userBaseCity]);

  useEffect(() => {
    eventsNearbyDataApi();
  }, [locationLatLong]);

  const toTop = () => {
    // use current
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const renderFooter = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator
            color={'#000000'}
            size={'large'}
            style={{marginLeft: 8, marginVertical: 20}}
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
    setLoading(false);
    setEventData(res);
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
      <View style={{width: wp(100), position: 'relative'}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ArtistPlayingDetail', {
              artistData: item,
            });
            logEvent(`event_detail_${createEventName(item?.title)}`, item);
            sendUXActivity('events.view', {
              screen: 'EventDetailScreen',
              eventId: item?._id,
              name: item?.title,
              eventDate: item?.eventDate,
              clubId: item?.club?._id,
              clubName: item?.club?.name,
              locality: item?.club?.locality,
              city: item?.club?.city,
              referer: 'EventsList',
            });
          }}
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          {Array.isArray(item?.images) &&
          item?.images?.length &&
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
            {Array.isArray(item?.artists) && item?.artists?.length ? (
              <TouchableOpacity
                disabled={
                  item?.artists?.length === 1 &&
                  item?.artists[0]?.type?.toLowerCase() === 'guest'
                }
                style={{
                  flexDirection: 'row',
                  marginVertical: 2,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (item?.artists?.length > 1) {
                    setArtistListModal(true);
                    setArtistListModalData(item.artists);
                  } else {
                    if (item?.artists[0]?.type?.toLowerCase() === 'guest') {
                      return;
                    }
                    props.navigation.navigate('ArtistEventDetail', {
                      artistListDetail: item?.artists[0],
                    });
                  }
                }}>
                {item?.artists[0]?.images?.length &&
                item?.artists[0]?.images[0] ? (
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      resizeMode: 'contain',
                      marginRight: 6,
                    }}
                    source={{uri: item?.artists[0]?.images[0]}}
                  />
                ) : item?.artists?.length ? (
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      resizeMode: 'contain',
                      marginRight: 6,
                      justifyContent: 'center',
                      backgroundColor: COLORS.gray,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={
                        item?.artists[0]?.type?.toLowerCase() === 'artist'
                          ? ImagePath.placeholderSinger
                          : item?.artists[0]?.type?.toLowerCase() === 'dj'
                          ? ImagePath.placeholderDj
                          : item?.artists[0]?.type?.toLowerCase() === 'guest'
                          ? ImagePath.profile
                          : null
                      }
                      style={{
                        height: 10,
                        width: 10,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        opacity: 0.5,
                      }}
                    />
                  </View>
                ) : null}

                {item?.artists?.length ? (
                  <Text
                    style={[
                      styles.singerName,
                      {width: '70%', marginVertical: 0},
                    ]}>
                    By {item?.artists[0]?.name}{' '}
                    {item?.artists?.length > 1 ? (
                      <Text>+{item?.artists?.length - 1}</Text>
                    ) : null}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ) : null}
            <Text style={styles.listinhText}>
              {`8pm onwards`}
              {/* {item?.eventStartTime
                ? `${moment(item?.eventStartTime).format('hh:mm A')} - ${moment(
                    item?.eventEndTime,
                  ).format('hh:mm A')}`
                : `8pm onwards`} */}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.listingText, {width: '70%'}]}>
                <Text
                  style={[styles.listingText]}
                  onPress={() => {
                    props.navigation.navigate('ClubDetails', {
                      listDetail: item?.club,
                    });
                    logEvent(
                      `club_detail_${createEventName(item?.club?.name)}`,
                      item?.club,
                    );
                    sendUXActivity('clubs.view', {
                      screen: 'ClubDetailScreen',
                      clubId: item?.club?._id,
                      name: item?.club?.name,
                      eventId: item?._id,
                      eventDate: item?.eventDate,
                      locality: item?.club?.locality,
                      city: item?.club?.city,
                      referer: 'EventsList',
                    });
                  }}>
                  {item?.club?.name}
                </Text>
                {'\n'}
                {[item?.club?.locality || '', item?.address?.city || '']
                  .filter(e => e)
                  .join(', ')}
              </Text>
              {item?.price?.amount && (
                <View style={{marginTop: -10, alignItems: 'center'}}>
                  <Text style={[styles.listingText]}>
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
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <Text style={styles.noDataText}>
        No Upcoming Events.{'\n'}
        Please check back later.
      </Text>
    );
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
              props.navigation.navigate('SearchScreen');
            }}
          />
        </View>
        {/* <ScrollView
          style={{
            flex: 1,
          }}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

           */}
        <FlatList
          ref={flatListRef}
          data={events}
          renderItem={_renderItem}
          nestedScrollEnabled
          ListHeaderComponent={
            <>
              <View style={[styles.hedingTextMain, {marginTop: 10}]}>
                <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
                <Text style={styles.cardText}>Events near me</Text>
                <Image style={styles.hedingImg} source={ImagePath.rightLine} />
              </View>
              {nearByEvents?.length ? (
                <FlatList
                  horizontal
                  data={nearByEvents}
                  renderItem={_renderItem}
                  keyExtractor={(_, i) => i.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={[
                      styles.noDataText,
                      {textAlign: 'center', marginTop: 0},
                    ]}>
                    No Events Found
                  </Text>
                </View>
              )}
              <View style={styles.hedingTextMain}>
                <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
                <Text style={styles.cardText}>UPCOMING EVENTS IN TOWN</Text>
                <Image style={styles.hedingImg} source={ImagePath.rightLine} />
              </View>
            </>
          }
          ListFooterComponent={renderFooter}
          // onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            setonEndReachedCalledDuringMomentum(false);
          }}
          onEndReached={eventData?.cursor == null ? null : fetchMoreData}
          ListEmptyComponent={EmptyListMessage}
          maxToRenderPerBatch={15}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          contentContainerStyle={{
            paddingBottom: getBottomSpace() + hp(15),
          }}
        />
        <ArtistListModal
          isVisible={artistListModal}
          navigation={props.navigation}
          onClose={() => setArtistListModal(false)}
          data={artistListModalData}
        />
        {/* </ScrollView> */}
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
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  hedingImg: {width: wp(30), resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 16,
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
    lineHeight: 20,
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
});
