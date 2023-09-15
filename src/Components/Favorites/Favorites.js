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
          {['artists', 'clubs', 'events'].map((tab, i) => (
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
          renderItem={item => _renderItem(item, selectedTab)}
          keyExtractor={item => item._id.toString()}
          ListEmptyComponent={<EmptyListMessage />}
        />
      </ImageBackground>
    </View>
  );
};

export default Favorites;

const _renderItem = ({item}, selectedTab) => {
  if (selectedTab === 'clubs') {
    return (
      <>
        {/* <HeartIcon  style={{top:'4%', right:'8%'}} endpoint={`api/user/likes/clubs/${item._id}`} item={item}/> */}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('ClubDetails', {listDetail: item});
            // logEvent(`club_detail_${createEventName(item?.name)}`, item);
            // sendUXActivity('clubs.view', {
            //   screen: 'ClubDetailScreen',
            //   clubId: item?._id,
            //   name: item?.name,
            //   locality: item?.locality,
            //   city: item?.city,
            //   referer: 'ClubList',
            // });
          }}
          activeOpacity={0.7}
          style={{
            flex: 1,
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            marginBottom: hp(3),
            elevation: 4,
          }}>
          <View>
            {Array.isArray(item?.media?.ambienceImages) &&
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
          </View>
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
              {item?.cost ? (
                <Text style={styles.listingText} numberOfLines={1}>
                  ₹{item?.cost}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
  if (selectedTab === 'artists') {
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <HeartIcon
          style={{top: '4%', right: '8%'}}
          endpoint={`api/user/likes/artist/${item._id}`}
          item={item}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}
          onPress={() => {
            props.navigation.navigate('ArtistEventDetail', {
              artistListDetail: item,
            });
            logEvent(`artist_detail_${createEventName(item?.name)}`, item);
            sendUXActivity('Artists.view', {
              screen: 'ArtistDetailScreen',
              artistId: item?._id,
              name: item?.name,
              city: item?.address?.city,
              referer: 'ArtistsList',
            });
          }}>
          {Array.isArray(item?.images) && item?.images?.length ? (
            <>
              <FastImage
                style={{
                  height: hp(29),
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                source={{
                  uri: item?.images[0],
                }}
              />
            </>
          ) : (
            <View
              style={{
                height: hp(29),
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: 'center',
                backgroundColor: COLORS.gray,
                overflow: 'hidden',
              }}>
              <Image
                source={
                  item?.type?.toLowerCase() === 'artist'
                    ? ImagePath.placeholderSinger
                    : item?.type?.toLowerCase() === 'dj'
                    ? ImagePath.placeholderDj
                    : item?.type?.toLowerCase() === 'guest'
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
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <View>
              <Text style={styles.listinhHeading}>{item?.name}</Text>
            </View>
            {item?.type && (
              <Text
                style={[
                  styles.listingText,
                  {marginVertical: hp(0.3), textTransform: 'uppercase'},
                ]}>
                {item?.type?.toLowerCase() === 'artist' ? 'SINGER' : item?.type}
              </Text>
            )}
            <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
              {item?.musicGenre}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if (selectedTab === 'events') {
    return (
      <View style={{width: wp(100), position: 'relative'}}>
        <TouchableOpacity
          onPress={() => {
            //   props.navigation.navigate('ArtistPlayingDetail', {
            //     artistData: item,
            //   });
            //   logEvent(`event_detail_${createEventName(item?.title)}`, item);
            //   sendUXActivity('events.view', {
            //     screen: 'EventDetailScreen',
            //     eventId: item?._id,
            //     name: item?.title,
            //     eventDate: item?.eventStartTime,
            //     clubId: item?.club?._id,
            //     clubName: item?.club?.name,
            //     locality: item?.club?.locality,
            //     city: item?.club?.city,
            //     referer: 'EventsList',
            //   });
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
          {/* <HeartIcon style={{top: '4%', right: '4%'}} endpoint={`api/user/likes/events/${item._id}`} item={item}/> */}
          <View
            style={{
              height: 39,
              minWidth: 32,
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              top: 8,
              // right: 8,
              left: 8,
            }}>
            <Text
              style={{
                color: '#666666',
                textAlign: 'center',
                fontFamily: FONTS.AxiformaBold,
                fontSize: 12,
              }}>
              {moment(item?.eventStartTime).format('DD')}
            </Text>
            <Text
              style={{
                color: '#666666',
                textAlign: 'center',
                fontFamily: FONTS.AxiformaRegular,
                fontSize: 12,
                textTransform: 'uppercase',
              }}>
              {moment(item?.eventStartTime).format('MMM')}
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
              {formatTimeRange(item?.eventStartTime, item?.eventEndTime)}
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
                      eventDate: item?.eventStartTime,
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
