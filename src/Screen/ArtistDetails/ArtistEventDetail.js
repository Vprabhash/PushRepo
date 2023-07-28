import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import Header from '../../Components/Header';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import ApiCall from '../../redux/CommanApi';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import UpcomingEventModal from '../../Components/UpcomingEventModal';
import {logEvent} from '../../utils/AddFirebaseEvent';
import {parseYouTubeLink} from '../../utils/common';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistEventDetail = props => {
  const [clubsNearby, setClubNearby] = useState([]);
  const detailData = props?.route?.params?.artistListDetail;

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventPage, setEventPage] = useState(0);
  const [
    onEndReachedCalledDuringUpcoming,
    setonEndReachedCalledDuringUpcoming,
  ] = useState(true);
  const [Upcomingloading, setupcomingLoading] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  // const [dontCall, setDontCall] = useState(false);

  useEffect(() => {
    UpcomingDataList(eventPage);
  }, [eventPage]);
  const UpcomingDataList = async page => {
    const queryParams = new URLSearchParams();
    queryParams.append('upcoming', 1);
    queryParams.append('page', eventPage);
    queryParams.append('artistId', detailData?._id);
    const res = await ApiCall(`api/events?${queryParams}`, 'GET');
    console.log('---res--logIn--artist---', res?.data);
    if (Array.isArray(res?.data)) {
      if (page === 0) {
        setUpcomingEvents(res?.data);
        // setDontCall(false);
      } else {
        if (res?.data?.length) {
          setUpcomingEvents([...upcomingEvents, ...res?.data]);
        } else {
          // setDontCall(true);
        }
      }
    } else {
      // setDontCall(false);
      Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
    }
  };

  const isTodaysEvent = eventDate => {
    const today = moment();
    const event = moment(eventDate);

    return today.isSame(event, 'day');
  };

  const haveTodaysEvent = () => {
    if (!upcomingEvents) {
      return [];
    }

    return upcomingEvents.filter(e => isTodaysEvent(e.eventDate));
  };

  const fetchUpcomingData = () => {
    if (!onEndReachedCalledDuringUpcoming) {
      setEventPage(eventPage + 1);
      setupcomingLoading(true);
      setonEndReachedCalledDuringUpcoming(true);
    } else {
      setupcomingLoading(false);
    }
  };

  const UpcomingData_RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{height: hp(20)}}
        onPress={() => {
          props.navigation.navigate('ArtistPlayingDetail', {
            artistData: item,
          });
        }}>
        {item?.artists?.length &&
        item?.artists[0]?.images?.length &&
        item?.artists[0]?.images[0] &&
        typeof item?.artists[0]?.images[0] == 'string' ? (
          <FastImage
            style={{
              marginLeft: 15,
              marginRight: index == 1 ? 15 : 0,
              height: hp(20),
              width: wp(50),
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri: item?.artists[0]?.images[0]}}
          />
        ) : (
          <View
            style={{
              marginLeft: 15,
              marginRight: index == 1 ? 15 : 0,
              height: hp(20),
              width: wp(50),
              resizeMode: 'cover',
              borderRadius: 10,
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
        <View style={{position: 'absolute', left: 27, bottom: 9}}>
          {/* <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: '#5B5959',
              alignSelf: 'flex-start',
              paddingHorizontal: wp(3),
              paddingVertical: wp(1),
            }}>
            <Text
              style={[
                {
                  color: COLORS.white,
                  fontSize: 7,
                  fontFamily: FONTS.RobotoMedium,
                },
              ]}>
              {item.button}
            </Text>
          </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 12,
              color: COLORS.white,
              fontFamily: FONTS.AxiformaBold,
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              fontSize: 8,
              color: COLORS.white,
              fontFamily: FONTS.AxiformaBold,
              marginBottom: hp(1.5),
            }}>
            By {item?.artists?.map(e => e?.name)?.join(', ')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 10,
                width: 10,
                tintColor: 'rgba(255, 175, 175, 1)',
                resizeMode: 'contain',
              }}
              source={ImagePath.location}
            />
            <Text
              style={[
                {
                  fontSize: 8,
                  color: COLORS.white,
                  marginLeft: 3,
                  fontFamily: FONTS.AxiformaBold,
                },
              ]}>
              {[item?.address?.locality || '', item?.address?.city || '']
                .filter(e => e)
                .join(', ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const UpcomingrenderFooter = () => {
    return (
      <View>
        {Upcomingloading ? (
          <ActivityIndicator
            color={COLORS.black}
            size={'large'}
            style={{marginLeft: 8}}
          />
        ) : null}
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: hp(3)}}>
        <TouchableOpacity
          onPress={() => {
            logEvent(`event_detail ${item?.title}`, item);
            props.navigation.navigate('ArtistPlayingDetail', {
              artistData: item,
            });
          }}
          style={{
            marginHorizontal: 20,
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
              source={{uri: item.images[0]?.path}}
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
          {/* <View
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
          </View> */}
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <Text style={styles.listinhHeading}>{item.title}</Text>
            {item?.artists?.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                {item?.artists[0]?.images?.length &&
                item?.artists[0]?.images[0] ? (
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      resizeMode: 'contain',
                      marginRight: 8,
                    }}
                    source={{uri: item?.artists[0]?.images[0]}}
                  />
                ) : null}
                <Text style={[styles.singerName, {marginLeft: 0}]}>By </Text>
                <View style={{width: '70%'}}>
                  {item?.artists?.length
                    ? item?.artists?.map(e => {
                        return (
                          <Text
                            style={[
                              styles.singerName,
                              {
                                // textDecorationLine: 'underline',
                                marginLeft: 0,
                              },
                            ]}
                            // onPress={() => {
                            //   logEvent('artist_detail', e?.name);
                            //   props.navigation.navigate('ArtistEventDetail', {
                            //     artistListDetail: e,
                            //   });
                            // }}
                          >
                            {e?.name}
                          </Text>
                        );
                      })
                    : null}
                </View>
              </View>
            ) : null}

            <View
              style={{
                flexDirection: 'row',
                marginTop: 14,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 17,
                  tintColor: COLORS.black,
                  width: 17,
                  resizeMode: 'contain',
                }}
                source={ImagePath.location}
              />
              <View style={{flex: 0.6}}>
                <Text style={styles.singerName}>
                  <Text
                    style={[
                      styles.singerName,
                      {
                        textDecorationLine: 'underline',
                      },
                    ]}
                    onPress={() => {
                      logEvent(`club_detail ${item?.club?.name}`, item?.club);
                      props.navigation.navigate('ClubDetails', {
                        listDetail: item?.club,
                      });
                    }}>
                    {item?.club?.name}
                  </Text>
                  {'\n'}
                  {[item?.club?.locality || '', item?.address?.city || '']
                    .filter(e => e)
                    .join(', ')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image
                  style={{
                    height: 17,
                    width: 17,
                    tintColor: '#D200FD',
                    resizeMode: 'contain',
                    marginRight: 2,
                  }}
                  source={ImagePath.menuUser3}
                />
                {item?.artists?.length
                  ? item?.artists?.map(e => {
                      return (
                        <Text
                          style={[styles.singerName]}
                          onPress={() => {
                            logEvent(`artist_detail ${e?.name}`, e);
                            props.navigation.navigate('ArtistEventDetail', {
                              artistListDetail: e,
                            });
                          }}>
                          {e?.musicGenre}
                        </Text>
                      );
                    })
                  : null}
              </View>
              {/* <View style={{marginTop: -10, alignItems: 'center'}}>
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
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* <View style={{marginTop: 50, marginBottom: 10}}></View> */}
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
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            paddingTop: 46,
            paddingBottom: 14,
            paddingHorizontal: 15,
          }}>
          <Header
            Back_Arrow={ImagePath.goBack}
            titalTwo="Artist Details"
            iconHeight={13}
            iconWidth={30}
            onclick={() => {
              props.navigation.goBack();
            }}
          />
        </View>

        <ScrollView>
          <View
            style={{
              flex: 1,
              width: '100%',
              marginTop: hp(3),
              paddingBottom: 60,
            }}>
            <View
              style={{
                marginHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                elevation: 4,
              }}>
              <TouchableOpacity activeOpacity={0.7}>
                {detailData?.images?.length ? (
                  <Image
                    style={{
                      height: hp(29),
                      width: '100%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: detailData?.images[0],
                    }}
                  />
                ) : (
                  <View
                    style={{
                      height: hp(29),
                      width: '100%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      resizeMode: 'cover',
                      justifyContent: 'center',
                      backgroundColor: COLORS.gray,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={
                        detailData?.type?.toLowerCase() === 'artist'
                          ? ImagePath.placeholderSinger
                          : detailData?.type?.toLowerCase() === 'dj'
                          ? ImagePath.placeholderDj
                          : detailData?.type?.toLowerCase() === 'guest'
                          ? ImagePath.profile
                          : ImagePath.clubActive
                      }
                      style={{
                        height: '50%',
                        width: '50%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        opacity: 0.5,
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
                <View>
                  <Text style={styles.listinhHeading}>{detailData?.name}</Text>
                </View>
                <Text
                  style={[
                    styles.listingText,
                    {marginVertical: hp(0.3), textTransform: 'uppercase'},
                  ]}>
                  {detailData?.type?.toLowerCase() === 'artist'
                    ? 'SINGER'
                    : detailData?.type}
                </Text>
                <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
                  {detailData?.musicGenre}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                {detailData?.instagramLink ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(
                        `instagram_pressed ${detailData?.name}`,
                        detailData,
                      );
                      if (detailData?.instagramLink) {
                        Linking.openURL(detailData?.instagramLink);
                      } else {
                        Toast.showWithGravity(
                          'Instagram link is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[
                      styles.btnmain,
                      {borderBottomLeftRadius: 10, marginRight: 1},
                    ]}>
                    <Image
                      style={styles.btnIcon}
                      source={ImagePath.Instagram}
                    />
                    <Text style={styles.buttonText}>Instagram</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(
                        `instagram_pressed ${detailData?.name}`,
                        detailData,
                      );
                      if (detailData?.instagramLink) {
                        Linking.openURL(detailData?.instagramLink);
                      } else {
                        Toast.showWithGravity(
                          'Instagram link is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[
                      styles.btnmainDisabled,
                      {borderBottomLeftRadius: 10, marginRight: 1},
                    ]}>
                    <Image
                      style={styles.btnIconDisabled}
                      source={ImagePath.InstagramDisabled}
                    />
                    <Text style={styles.buttonText}>Instagram</Text>
                  </TouchableOpacity>
                )}

                {parseYouTubeLink(detailData?.youtubeChannelLink) ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(
                        `youtube_pressed ${detailData?.name}`,
                        detailData,
                      );
                      if (parseYouTubeLink(detailData?.youtubeChannelLink)) {
                        Linking.openURL(
                          parseYouTubeLink(detailData?.youtubeChannelLink),
                        );
                      } else {
                        Toast.showWithGravity(
                          'Youtube link is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
                    <Image style={styles.btnIcon} source={ImagePath.youtube} />
                    <Text style={styles.buttonText}>YouTube</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(
                        `youtube_pressed ${detailData?.name}`,
                        detailData,
                      );
                      console.log(detailData?.youtubeChannelLink);
                      Toast.showWithGravity(
                        'Youtube link is not available',
                        Toast.LONG,
                        Toast.BOTTOM,
                      );
                    }}
                    style={[
                      styles.btnmainDisabled,
                      {borderBottomRightRadius: 10},
                    ]}>
                    <Image
                      style={styles.btnIconDisabled}
                      source={ImagePath.youtubeDisabled}
                    />
                    <Text style={styles.buttonText}>YouTube</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* <View style={[styles.hedingTextMain, {marginTop: 30}]}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>UPCOMING EVENTS</Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>
            <FlatList
              horizontal
              data={upcomingEvents}
              renderItem={UpcomingData_RenderItem}
              contentContainerStyle={{marginVertical: 20, marginHorizontal: 5}}
              ListFooterComponent={UpcomingrenderFooter}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringUpcoming(false);
              }}
              onEndReached={fetchUpcomingData}
              ListEmptyComponent={
                <View
                  style={{
                    height: 50,
                    width: width,
                    paddingBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleText1}>No Upcoming Events. Please check back later.</Text>
                </View>
              }
            /> */}
            <Text style={styles.aboutText}>
              {haveTodaysEvent()?.length
                ? 'Whats Happening Today'
                : 'Upcoming Events'}
            </Text>
            <View style={{marginTop: 10}}>
              <FlatList
                data={
                  haveTodaysEvent()?.length
                    ? haveTodaysEvent()
                    : upcomingEvents?.slice(0, 1)
                }
                keyExtractor={(_, i) => i.toString()}
                renderItem={_renderItem}
                ListEmptyComponent={
                  <View
                    style={{
                      width: width,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: hp(4),
                    }}>
                    <Text style={[styles.titleText1, {textAlign: 'center'}]}>
                      No Upcoming Events.{'\n'}Please check back later.
                    </Text>
                  </View>
                }
              />
            </View>
            {upcomingEvents?.length ? (
              <TouchableOpacity
                style={{alignSelf: 'center', marginBottom: 40, marginTop: 20}}
                onPress={() => setIsEventModalVisible(true)}>
                <LinearGradient
                  style={{
                    height: 43,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 40,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}
                  start={{x: 0.4, y: 0}}
                  colors={['rgba(189, 12, 189, 1)', 'rgba(21, 154, 201, 1)']}>
                  <Image
                    source={ImagePath.calendarIcon}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.white,
                      marginRight: 5,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.AxiformaBlack,
                      color: '#FFFFFF',
                      fontSize: 14,
                    }}>
                    Upcoming Events
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </ImageBackground>
      <UpcomingEventModal
        visible={isEventModalVisible}
        data={upcomingEvents}
        onPress={e => {
          setIsEventModalVisible(false);
          logEvent(`event_detail ${e?.title}`, e);
          props.navigation.navigate('ArtistPlayingDetail', {
            artistData: e,
          });
        }}
        onPressCancel={() => {
          setIsEventModalVisible(false);
        }}
      />
    </View>
  );
};
export default ArtistEventDetail;
const styles = StyleSheet.create({
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
  btnmain: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#202020',
    borderWidth: 1,
    height: hp('6.5%'),
    borderColor: '#000',
    justifyContent: 'center',
  },
  btnmainDisabled: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#a1a1a1',
    borderWidth: 1,
    height: hp('6.5%'),
    borderColor: '#a1a1a1',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.white,
    // letterSpacing: 0.3,
  },
  btnIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  btnIconDisabled: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  hedingTextMain: {
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hedingImg: {width: '30%', resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
  },
  titleText1: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
  },
  aboutText: {
    color: '#202020',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 40,
    fontFamily: FONTS.AxiformaBold,
  },
  singerName: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: FONTS.RobotoRegular,
    color: '#5B5959',
  },
});
