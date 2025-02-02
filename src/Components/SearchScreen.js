import React, {useState, useEffect} from 'react';
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
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';
import ApiCall from '../redux/CommanApi';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {showFilter} from '../redux/reducers/isFilterOpenSlice';
import {logEvent, sendUXActivity} from '../utils/AddFirebaseEvent';
import {createEventName, formatTimeRange} from '../utils/common';
import ArtistListModal from './ArtistListModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SearchScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [clubs, setClubs] = useState([]);

  const [valuekey, setValuekey] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [autoSuggestData, setAutoSuggestData] = useState([]);
  const [artistListModal, setArtistListModal] = useState(false);
  const [artistListModalData, setArtistListModalData] = useState([]);

  const animation = useSharedValue(0);
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  useEffect(() => {
    searchApi();
    searchRecommendation();
    setValuekey('');
    navigation.addListener('focus', () => {
      setAutoSuggestData([]);
    });
  }, []);

  const searchTypeImages = [
    {
      id: 1,
      label: 'Area',
      source: ImagePath.areaImage,
    },
    {
      id: 2,
      label: 'Genre',
      source: ImagePath.genreImage,
    },
    {
      id: 3,
      label: 'Artist',
      source: ImagePath.artistImage,
    },
    {
      id: 4,
      label: 'Club',
      source: ImagePath.clubImage,
    },
  ];

  const searchApi = async text => {
    setAutoSuggestData([]);
    if (valuekey || text) {
      const res = await ApiCall(
        `api/search?q=${text || valuekey}&city=${selectedCity}`,
        'GET',
      );
      console.log(
        '---searchApi--->',
        `api/search?q=${text || valuekey}&city=${selectedCity}`,
      );
      let temArray = [];
      let clubs = res?.data?.clubs;
      let artist = res?.data?.artists;
      let events = res?.data?.events?.map(e => ({...e, type: 'event'}));
      temArray = clubs.concat(artist, events);
      setClubs(temArray);
    } else {
      //   setPage(1);
    }
  };
  const searchRecommendation = async () => {
    ApiCall(`api/recommendations?city=${selectedCity}`, 'GET')
      .then(res => {
        if (res?.ok) {
          setRecommendation(res?.data?.data);
        }
      })
      .catch(err => {
        console.log('----recommendation erorr: ', err);
      });
  };
  const searchAutoSuggest = async text => {
    ApiCall(`api/search-v2?q=${text}`, 'GET')
      .then(res => {
        if (Array.isArray(res?.data) && res?.data?.length) {
          setAutoSuggestData(res?.data);
        }
      })
      .catch(err => {
        console.log('----recommendation erorr: ', err);
      });
  };
  const _renderItem = ({item, index}) => {
    if (item?.type === 'guest') {
      return null;
    }
    if (item?.type === 'event') {
      return <RenderEvent item={item} index={index} />;
    }
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (item.type) {
                props.navigation.navigate('ArtistEventDetail', {
                  artistListDetail: item,
                });
                logEvent(`artist_detail_${createEventName(item?.name)})`, item);
                sendUXActivity('Artists.view', {
                  screen: 'ArtistDetailScreen',
                  artistId: item?._id,
                  name: item?.name,
                  city: item?.address?.city,
                  referer: 'SearchScreen',
                });
              } else {
                props.navigation.navigate('ClubDetails', {listDetail: item});
                logEvent(`club_detail_${createEventName(item?.name)}`, item);
                sendUXActivity('clubs.view', {
                  screen: 'ClubDetailScreen',
                  clubId: item?._id,
                  name: item?.name,
                  locality: item?.locality,
                  city: item?.city,
                  referer: 'SearchScreen',
                });
              }
            }}
            activeOpacity={0.7}>
            {item?.media?.ambienceImages ? (
              <>
                {item?.media?.ambienceImages ? (
                  <Image
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
              </>
            ) : (
              <>
                {Array.isArray(item?.images) && item?.images?.length ? (
                  <Image
                    style={{
                      height: hp(29),
                      width: '100%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: item?.images[0],
                    }}
                  />
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
              </>
            )}
          </TouchableOpacity>
          {/* <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              position: 'absolute',
              top: 10,
              right: 10,
            }}
            source={ImagePath?.heartIcon}
          /> */}
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listinhHeading}>{item?.name}</Text>
              {item?.zomatoRating ? (
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
              ) : null}
            </View>
            {/* {item.type == 'dj' && ( */}
            {item?.cost && (
              <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
                Restrobar
              </Text>
            )}
            {/* )} */}
            {item?.type && (
              <Text style={[styles.listingText, {textTransform: 'uppercase'}]}>
                {item?.type?.toLowerCase() === 'artist' ? 'SINGER' : item?.type}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {item?.musicGenre && item?.images ? (
                <Text style={styles.listingText}>{item?.musicGenre}</Text>
              ) : (
                <Text style={styles.listingText}>
                  {`${item?.locality}, ${item?.city}`}
                </Text>
              )}
              {item?.cost && (
                <Text
                  style={[styles.listingText, {color: COLORS.black}]}
                  numberOfLines={1}>
                  ₹{item?.cost}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const RenderEvent = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: hp(3)}}>
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
              eventDate: item?.eventStartTime,
              clubId: item?.club?._id,
              clubName: item?.club?.name,
              locality: item?.club?.locality,
              city: item?.club?.city,
              referer: 'SearchScreen',
            });
          }}
          style={{
            marginHorizontal: 10,
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
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 6,
              }}
              disabled={!item?.artists?.length > 1}
              onPress={() => {
                setArtistListModal(true);
                setArtistListModalData(item.artists);
              }}>
              {Array.isArray(item?.artists) &&
              item?.artists?.length &&
              item?.artists[0]?.images?.length &&
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
              ) : Array.isArray(item?.artists) && item?.artists?.length ? (
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
              {Array.isArray(item?.artists) && item?.artists?.length ? (
                <Text
                  style={[
                    styles.singerName,
                    {width: '70%', marginVertical: 0},
                  ]}>
                  By {item?.artists[0]?.name}
                  {item?.artists?.length > 1
                    ? ` +${item?.artists?.length - 1}`
                    : null}
                </Text>
              ) : null}
            </TouchableOpacity>
            <Text
              style={[
                styles.singerName,
                {fontFamily: FONTS.AxiformaRegular, marginTop: 0},
              ]}>
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
                      locality: item?.club?.locality,
                      city: item?.club?.city,
                      referer: 'SearchScreen',
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
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={[styles.listingText, {color: COLORS.black}]}>
                    {'₹' + item?.price?.amount}
                  </Text>
                  {/* <Text
                  style={[
                    styles.listingText,
                    {marginTop: 0, fontFamily: FONTS.AxiformaRegular},
                  ]}>
                  onwards
                </Text> */}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressSearchType = type => {
    switch (type) {
      case 'Area':
        setValuekey(
          Array.isArray(recommendation) &&
            recommendation?.length &&
            recommendation[0]?.localities?.length
            ? recommendation[0]?.localities[0]
            : '',
        );
        searchApi(
          Array.isArray(recommendation) &&
            recommendation?.length &&
            recommendation[0]?.localities?.length
            ? recommendation[0]?.localities[0]
            : '',
        );
        break;
      case 'Genre':
        setValuekey('Bollywood');
        searchApi('Bollywood');
        break;
      case 'Artist':
        props.navigation.navigate('ArtistDetail');
        break;
      case 'Club':
        props.navigation.navigate('ClubListing');
        break;
      default:
        break;
    }
  };
  const imageType = type => {
    switch (type) {
      case 'locality':
        return ImagePath.direction;
      case 'genre':
        return ImagePath.menuUser3;
      case 'artist':
        return ImagePath.artistIcon;
      case 'singer':
        return ImagePath.artistIcon;
      case 'club':
        return ImagePath.clubActive;
      case 'dj':
        return ImagePath.liveDjIcon;
      case 'event':
        return ImagePath.calendarIcon;
      default:
        return ImagePath.star_logo;
    }
  };

  const renderSearchImages = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onPressSearchType(item?.label);
        }}
        style={styles.searchTypeButtonWrapper}>
        <Image
          source={item.source}
          style={{
            height: wp(30),
            width: wp(42),
            borderRadius: 10,
            // marginLeft: 15,
            resizeMode: 'cover',
            marginBottom: hp(1),
          }}
        />
        <Text
          style={{
            color: COLORS.black,
            fontFamily: FONTS.AxiformaRegular,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
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
            flex: 1,
            marginHorizontal: 10,
            marginTop: Platform.OS == 'ios' ? getStatusBarHeight() : 50,
          }}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,

              // justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{marginLeft: 5}}>
              <Image
                style={{
                  height: 16,
                  width: 20,
                  resizeMode: 'contain',
                }}
                source={ImagePath.goBack}
              />
            </TouchableOpacity>
            <View style={[styles.inputMain]}>
              <TextInput
                style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholder={'Search by Area, Genre, Artist or Club'}
                onChangeText={text => {
                  // searchApi(text)
                  setValuekey(text);
                  searchAutoSuggest(text);
                }}
                value={valuekey}
                onSubmitEditing={() => searchApi(valuekey)}
              />
              {valuekey && (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  activeOpacity={0.5}
                  onPress={() => {
                    setValuekey('');
                    setClubs([]);
                    setAutoSuggestData([]);
                  }}>
                  <Image
                    source={ImagePath.closeIcon}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  searchApi(valuekey);
                  setAutoSuggestData([]);
                }}>
                <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          {Array.isArray(autoSuggestData) &&
          autoSuggestData?.length &&
          valuekey ? (
            <View
              style={{
                position: 'absolute',
                top: 45,
                zIndex: 99999,
                marginLeft: '10%',
                borderRadius: 10,
                marginBottom: 20,
                width: '95%',
                maxHeight: hp(50),
              }}>
              <View style={{height: hp(50)}}>
                <FlatList
                  data={autoSuggestData}
                  keyExtractor={(_, index) => index.toString()}
                  bounces={false}
                  style={{flex: 1, maxHeight: hp(50)}}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({item}) => {
                    if (item?.type?.toLowerCase() === 'guest') {
                      return;
                    }
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: COLORS.white,
                          padding: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setValuekey(item?.title);
                          searchApi(item?.title);
                        }}>
                        <Image
                          style={[
                            styles.iconStyle,
                            {marginRight: 8, width: 20, height: 20},
                          ]}
                          source={imageType(item?.type)}
                        />
                        <Text
                          style={{
                            color: 'rgba(0, 0, 0, 0.7)',
                            fontFamily: FONTS.RobotoRegular,
                            fontSize: 16,
                            marginRight: 20,
                          }}>
                          {item?.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  contentContainerStyle={{paddingEnd: 30}}
                  ItemSeparatorComponent={() => (
                    <View style={{height: 1, backgroundColor: COLORS.gray}} />
                  )}
                />
              </View>
            </View>
          ) : null}
          <TouchableOpacity
            style={[styles.fllter]}
            activeOpacity={0.5}
            onPress={() => {
              dispatch(showFilter(true));
              navigation.navigate('BottomTab', {
                screen: 'ClubListing',
                params: {isFilterOpen: true},
              });
            }}>
            <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
            <Text style={styles.filtersText}>Filters</Text>
          </TouchableOpacity>
          <FlatList
            data={clubs}
            renderItem={_renderItem}
            keyExtractor={(_, i) => i.toString()}
            onEndReachedThreshold={0.3}
            contentContainerStyle={{paddingBottom: 100}}
            ListHeaderComponent={
              recommendation && !valuekey ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled>
                  <View style={styles.hedingTextMain}>
                    <Image
                      style={styles.hedingImg}
                      source={ImagePath.rightLine1}
                    />
                    <Text style={styles.cardText}>TRENDING IN YOUR CITY</Text>
                    <Image
                      style={styles.hedingImg}
                      source={ImagePath.rightLine}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginBottom: 20,
                    }}>
                    {recommendation?.map(item => {
                      let data = [].concat(
                        item.localities,
                        item.generes,
                        item.clubs,
                        item.artists,
                      );
                      return (
                        <>
                          {data?.map(term => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setValuekey(term);
                                  searchApi(term);
                                }}
                                style={{
                                  paddingHorizontal: 8,
                                  paddingVertical: 5,
                                  borderRadius: 40,
                                  borderWidth: 1,
                                  borderColor: COLORS.primary,
                                  marginLeft: 10,
                                  marginBottom: 10,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={ImagePath.trendIcon}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    marginRight: 8,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: COLORS.black,
                                    fontFamily: FONTS.AxiformaRegular,
                                  }}>
                                  {term}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </>
                      );
                    })}
                  </View>
                  {/* <View style={styles.hedingTextMain}>
                    <Image
                      style={styles.hedingImg}
                      source={ImagePath.rightLine1}
                    />
                    <Text style={styles.cardText}>
                      SEARCH BY AREA, GENRE, ARTIST OR CLUB
                    </Text>
                    <Image
                      style={styles.hedingImg}
                      source={ImagePath.rightLine}
                    />
                  </View> */}

                  {/* location type list */}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(90),
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    {searchTypeImages?.map((item, index) =>
                      renderSearchImages({item}),
                    )}
                  </View>
                  {/* <FlatList
                    data={searchTypeImages}
                    numColumns={2}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={renderSearchImages}
                    ItemSeparatorComponent={<View style={{width: wp(3)}} />}
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      backgroundColor: 'red',
                    }}
                  /> */}
                </ScrollView>
              ) : null
            }
            // ListEmptyComponent={EmptyListMessage}
          />
          <ArtistListModal
            isVisible={artistListModal}
            navigation={navigation}
            onClose={() => setArtistListModal(false)}
            data={artistListModalData}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default SearchScreen;
// const EmptyListMessage = () => {
//   return (
//     <Text style={styles.noDataText}>Search by Area, Genre, Artist or Club</Text>
//   );
// };
const styles = StyleSheet.create({
  hedingTextMain: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hedingImg: {width: '30%', resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 16,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
  },
  iconStyle: {
    tintColor: COLORS.black,
    width: 16,
    resizeMode: 'contain',
    height: 16,
  },
  noDataText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp(5),
    lineHeight: 20,
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
    flex: 1,
    marginHorizontal: 10,
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
  searchTypeButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  singerName: {
    fontSize: 12,
    marginVertical: hp(0.5),
    fontFamily: FONTS.AxiformaBold,
    color: '#575757',
  },
  fllter: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    elevation: 9,
    width: wp(25),
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: 7,
    zIndex: 9,
  },
  filtersText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.RobotoMedium,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
