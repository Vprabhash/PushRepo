import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper';
import MenuCard from '../../Components/MenuCard';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import ImageView from 'react-native-image-viewing';
import Header from '../../Components/Header';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import UpcomingEventModal from '../../Components/UpcomingEventModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ClubDetails = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleone, setModalVisibleone] = useState(false);
  const [modalVisibletwo, setModalVisibletwo] = useState(false);
  const [clubsNearby, setClubNearby] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const scrollRef = useRef(null);
  const detailData = props?.route?.params?.listDetail;
  const scrollToEnd = () => {
    scrollRef?.current?.scrollToEnd({animation: true});
  };
  const locationLatLong = useSelector(
    state => state.clubLocation.locationLatLong,
  );
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  const [dontCall, setDontCall] = useState(false);
  useEffect(() => {
    clubsNearbyDataApi();
    eventList(page);
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    // return () => {
    //   BackHandler.removeEventListener(
    //     'hardwareBackPress',
    //     handleBackButtonClick,
    //   );
    // };
  }, []);

  function handleBackButtonClick() {
    props.navigation.navigate('ClubListing', {screenName: 'ClubListing'});
    return true;
  }
  const ENTRIES1 = [
    {
      mapIcon: ImagePath.upcoming_Evn_Img,
      title: 'Fabulous friday',
      singerName: 'by ',
      singerNameIcon: ImagePath.Explore,
      musicIcon: ImagePath.menuUser3,
      musicText: 'Bollywood, Commercial',
    },
  ];
  // const _renderItem = ({item, index}) => {
  //   return (
  //     <View style={{flex: 1, width: '100%', marginBottom: 31}}>
  //       <View
  //         style={{
  //           marginHorizontal: 15,
  //           borderRadius: 10,
  //           backgroundColor: '#FFFFFF',
  //           elevation: 4,
  //         }}>
  //         <Image
  //           style={{
  //             height: hp(29),
  //             width: '100%',
  //             borderTopRightRadius: 10,
  //             borderTopLeftRadius: 10,
  //           }}
  //           source={ImagePath.upcoming_Evn_Img}
  //         />
  //         <View style={{paddingHorizontal: wp(3), paddingVertical: hp(3)}}>
  //           <Text style={styles.listinhHeading}>{item?.title || ''}</Text>
  //           <View style={{flexDirection: 'row', marginTop: hp(2)}}>
  //             <Image
  //               style={{
  //                 height: 17,
  //                 width: 17,
  //                 borderRadius: 10,
  //                 resizeMode: 'contain',
  //               }}
  //               source={ImagePath.Explore}
  //             />
  //             <Text style={[styles.singerName]}>
  //               By{' '}
  //               <Text
  //                 style={[
  //                   styles.singerName,
  //                   {textDecorationLine: 'underline'},
  //                 ]}>
  //                 AVGSS Group
  //               </Text>
  //             </Text>
  //           </View>
  //           <View style={{flexDirection: 'row', marginTop: 10}}>
  //             <Image
  //               style={{
  //                 height: 17,
  //                 width: 17,
  //                 tintColor: '#D200FD',
  //                 resizeMode: 'contain',
  //               }}
  //               source={ImagePath.menuUser3}
  //             />
  //             <Text style={[styles.singerName]}>{item.musicText}</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  const clubsNearbyDataApi = async () => {
    try {
      const res = await ApiCall(
        `api/clubs?exclude=${detailData?._id}&coordinates=${detailData?.geoJson?.coordinates}`, //${19.136326},${72.82766}
        'GET',
      );
      setClubNearby(res?.data);
      console.log('clubsnearbydata ----', res.data);
    } catch (error) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  const eventList = async page => {
    const queryParams = new URLSearchParams();
    queryParams.append('upcoming', 1);
    queryParams.append('page', page);
    queryParams.append('clubId', detailData?._id);
    const res = await ApiCall(`api/events?${queryParams}`, 'GET');
    console.log('---res--logIn--artist---', res?.data);
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

  const ClubNarDatarenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.push('ClubDetails', {listDetail: item});
        }}
        style={{
          marginLeft: index == 0 ? 20 : 0,
          marginBottom: 10,
        }}>
        {item?.media?.ambienceImages?.length ? (
          <Image
            style={{
              height: hp(20),
              width: wp(50),
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri: item?.media?.ambienceImages[0]}}
          />
        ) : (
          <View
            style={{
              height: hp(20),
              width: wp(50),
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
          />
        )}
        <Text
          style={[
            styles.titleText,
            {width: wp(50), fontFamily: FONTS.AxiformaSemiBold},
          ]}>
          {item?.name}
        </Text>
        <Text style={styles.LoctionText}>
          {item?.locality}, {item?.city}
        </Text>
      </TouchableOpacity>
    );
  };

  const isTodaysEvent = eventDate => {
    const today = moment();
    const event = moment(eventDate);

    return today.isSame(event, 'day');
  };

  const haveTodaysEvent = () => {
    if (!events) {
      return [];
    }

    return events.filter(e => isTodaysEvent(e.eventDate));
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
            marginHorizontal: 20,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          {item?.artists?.length &&
          item?.artists[0]?.images?.length &&
          item?.artists[0]?.images[0] &&
          typeof item?.artists[0]?.images[0] == 'string' ? (
            <FastImage
              style={{
                height: hp(29),
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={{uri: item?.artists[0]?.images[0]}}
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  resizeMode: 'contain',
                }}
                source={{uri: item?.artists[0]?.images[0]}}
              />
              <Text style={[styles.singerName]}>By </Text>
              {item?.artists?.length
                ? item?.artists?.map(e => {
                    return (
                      <Text
                        style={[
                          styles.singerName,
                          {
                            width: '70%',
                            textDecorationLine: 'underline',
                            marginLeft: 0,
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate('ArtistEventDetail', {
                            artistListDetail: e,
                          })
                        }>
                        {e?.name}
                      </Text>
                    );
                  })
                : null}
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
                          onPress={() =>
                            props.navigation.navigate('ArtistEventDetail', {
                              artistListDetail: e,
                            })
                          }>
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
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 46,
            paddingBottom: 14,
            paddingLeft: 10,
          }}>
          <Header
            Back_Arrow={ImagePath.goBack}
            titalTwo="Club Details"
            iconHeight={15}
            iconWidth={30}
            onclick={() => {
              props.navigation.goBack();
              // props.navigation.navigate('ClubListing', {
              //   screenName: 'ClubListing',
              // });
            }}
          />
        </View>
        {/* <View style={[styles.inputMain, {marginTop: 10, marginBottom: 10}]}>
          <TextInput
            style={[styles.textInput, {color: COLORS.black}]}
            placeholder={'Search'}
            placeholderTextColor="#A3A3A3"
            // onChangeText={onChangeText}
            // value={value}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Image
              source={ImagePath.searchIcon}
              style={[styles.iconStyle, {tintColor: '#A3A3A3'}]}
            />
          </TouchableOpacity>
        </View> */}

        <ScrollView ref={scrollRef} contentContainerStyle={{flexGrow: 1}}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

          <ImageView
            images={
              detailData?.media?.ambienceImages?.map(e => ({
                uri: e,
              })) || []
            }
            imageIndex={0}
            visible={modalVisibleone}
            onRequestClose={() => setModalVisibleone(false)}
            swipeToCloseEnabled={true}
            FooterComponent={({imageIndex}) => {
              return (
                <Text style={styles.imageView}>
                  ({imageIndex + 1} /{detailData?.media?.ambienceImages?.length}
                  )
                </Text>
              );
            }}
          />
          <TouchableOpacity onPress={() => setModalVisibleone(true)}>
            <Swiper
              autoplay={true}
              autoplayTimeout={4}
              style={[styles.wrapper]}
              containerStyle={{
                borderRadius: 8,
                marginTop: 10,
                marginHorizontal: 20,
                overflow: 'hidden',
              }}
              paginationStyle={{
                bottom: hp(0),
                zIndex: 9,
                backgroundColor: '#C9C9C9',
                borderRadius: 20,
                height: 18,
                marginHorizontal: '38%',
              }}
              activeDotStyle={{
                backgroundColor: '#717171',
                width: 6,
                height: 6,
                borderRadius: 4,
              }}
              dotStyle={{
                backgroundColor: COLORS.white,
                width: 6,
                height: 6,
                borderRadius: 4,
              }}
              showsButtons={true}
              showsPagination={true}
              prevButton={
                <Image
                  source={ImagePath.prew}
                  style={{
                    height: 20,
                    width: 20,
                    marginBottom: 20,
                    resizeMode: 'contain',
                  }}
                />
              }
              nextButton={
                <Image
                  source={ImagePath.next}
                  style={{
                    height: 20,
                    width: 20,
                    marginBottom: 20,
                    resizeMode: 'contain',
                  }}
                />
              }>
              {detailData?.media?.ambienceImages?.length ? (
                detailData?.media?.ambienceImages?.slice(0, 6)?.map(item => (
                  <View style={styles.slide}>
                    <Image style={styles.slideImg} source={{uri: item}} />
                  </View>
                ))
              ) : (
                <View />
              )}
            </Swiper>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
              marginHorizontal: 20,
            }}>
            <View style={{width: '80%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  width: '95%',
                }}>
                <Text
                  style={{
                    color: '#202020',
                    fontSize: 20,
                    fontFamily: FONTS.AxiformaBold,
                  }}>
                  {detailData?.name}
                </Text>
                {/* {detailData?.vegNonVeg && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor:
                        detailData?.vegNonVeg?.toLowerCase() === 'veg'
                          ? 'green'
                          : 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 15,
                      width: 15,
                      marginTop: 6,
                      marginHorizontal: 8,
                    }}>
                    <View
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 10,
                        backgroundColor:
                          detailData?.vegNonVeg?.toLowerCase() === 'veg'
                            ? 'green'
                            : 'red',
                      }}
                    />
                  </View>
                )} */}
              </View>
              <Text
                style={{
                  color: '#5B5959',
                  fontSize: 14,
                  fontFamily: FONTS.RobotoMedium,
                }}>
                Restrobar
              </Text>
            </View>
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
              start={{x: 0.3, y: 0.5}}
              colors={['rgba(189, 12, 189, 1)', 'rgba(21, 154, 201, 1)']}>
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
                {detailData?.zomatoRating || '-'}
              </Text>
            </LinearGradient>
          </View>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 22,
              marginTop: 9,
              color: COLORS.black,
              marginHorizontal: 20,
              marginTop: 20,
              fontFamily: FONTS.AxiformaRegular,
            }}>
            {detailData?.address}
          </Text>
          <Text style={styles.aboutText}>About the Club</Text>
          <MenuCard scrollToEnd={scrollToEnd} itemdata={detailData} />
          <Text style={styles.aboutText}>
            {haveTodaysEvent()?.length
              ? 'Whats Happening Today'
              : 'Upcoming Event'}
          </Text>
          <FlatList
            data={
              haveTodaysEvent()?.length
                ? haveTodaysEvent()
                : events?.slice(0, 1)
            }
            keyExtractor={(_, i) => i.toString()}
            renderItem={_renderItem}
            ListEmptyComponent={
              <View
                style={{
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleText}>No Events Found</Text>
              </View>
            }
          />
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 20}}
            onPress={() => setIsEventModalVisible(true)}>
            <LinearGradient
              style={{
                height: 43,
                width: 176,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
              }}
              start={{x: 0.4, y: 0}}
              colors={['rgba(189, 12, 189, 1)', 'rgba(21, 154, 201, 1)']}>
              <Text
                style={{
                  fontFamily: FONTS.AxiformaBlack,
                  color: '#FFFFFF',
                  fontSize: 14,
                }}>
                Events for the month
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={[styles.aboutText, {marginTop: 25}]}>Menu</Text>
          <ScrollView style={{flexDirection: 'row'}} horizontal>
            <ImageView
              images={
                detailData?.media?.drinkMenuImages?.map(e => ({
                  uri: e,
                })) || []
              }
              imageIndex={0}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              swipeToCloseEnabled={true}
              FooterComponent={({imageIndex}) => {
                return (
                  <Text style={styles.imageView}>
                    ({imageIndex + 1} /
                    {detailData?.media?.drinkMenuImages?.length})
                  </Text>
                );
              }}
            />
            <View
              style={{
                marginLeft: 20,
                marginRight: detailData?.media?.drinkMenuImages?.length
                  ? 15
                  : 0,
              }}>
              {detailData?.media?.drinkMenuImages?.length ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}>
                    <Image
                      style={{
                        height: hp(20),
                        width: wp(43),
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: detailData?.media?.drinkMenuImages?.length
                          ? detailData?.media?.drinkMenuImages[0]
                          : '',
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.titleText}>Beverages</Text>
                </>
              ) : null}
            </View>
            <ImageView
              images={
                detailData?.media?.foodMenuImages?.map(e => ({
                  uri: e,
                })) || []
              }
              imageIndex={0}
              visible={modalVisibletwo}
              onRequestClose={() => setModalVisibletwo(false)}
              FooterComponent={({imageIndex}) => {
                return (
                  <Text style={styles.imageView}>
                    ({imageIndex + 1} /
                    {detailData?.media?.foodMenuImages?.length})
                  </Text>
                );
              }}
            />
            <View style={{marginRight: 20}}>
              {detailData?.media?.foodMenuImages?.length ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisibletwo(true);
                    }}>
                    <Image
                      style={{
                        height: hp(20),
                        width: wp(43),
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: detailData?.media?.foodMenuImages?.length
                          ? detailData?.media?.foodMenuImages[0]
                          : '',
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.titleText}>Food</Text>
                </>
              ) : null}
            </View>
          </ScrollView>
          <Text style={[styles.aboutText]}>Clubs Nearby </Text>
          <FlatList
            horizontal={true}
            data={clubsNearby}
            renderItem={ClubNarDatarenderItem}
            ItemSeparatorComponent={<View style={{width: 20}} />}
            contentContainerStyle={{
              paddingEnd: 20,
              paddingBottom: getBottomSpace(),
            }}
            ListEmptyComponent={
              <View
                style={{
                  width: width,
                  paddingBottom: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleText}>No Clubs Found</Text>
              </View>
            }
          />
          <UpcomingEventModal
            visible={isEventModalVisible}
            data={events}
            onPress={e => {
              setIsEventModalVisible(false);
              props.navigation.navigate('ArtistPlayingDetail', {
                artistData: e,
              });
            }}
            onPressCancel={() => {
              setIsEventModalVisible(false);
            }}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default ClubDetails;
const styles = StyleSheet.create({
  aboutText: {
    color: '#202020',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: FONTS.AxiformaBold,
  },
  wrapper: {height: 223},
  slide: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImg: {
    resizeMode: 'cover',
    borderRadius: 8,
    width: '100%',
    height: 200,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  //
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    marginTop: hp(1),
  },
  LoctionText: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 12,
    color: '#5B5959',
  },
  //
  singerName: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: FONTS.RobotoRegular,
    color: '#5B5959',
  },
  listinhHeading1: {
    fontSize: 12,
    fontFamily: 'Metropolis-SemiBold',
    color: '#202020',
  },
  listinhText: {
    fontSize: 12,
    fontFamily: 'Metropolis-Medium',
    color: '#575757',
    marginTop: hp(0.5),
  },

  inputMain: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
    // marginBottom: hp(4),
  },
  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    padding: 0,
    height: hp(6),
    color: '#A3A3A3',
    flex: 1,
  },
  iconStyle: {
    tintColor: '#000000',
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },

  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
  imageView: {
    alignSelf: 'center',
    paddingBottom: 30,
    zIndex: 99,
    elevation: 3,
    color: '#fff',
    fontFamily: FONTS.AxiformaRegular,
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
});
