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
import {useSelector} from 'react-redux';

import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';
import ApiCall from '../redux/CommanApi';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SearchBar = props => {
  const [clubs, setClubs] = useState();

  const [valuekey, setValuekey] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const animation = useSharedValue(0);
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  useEffect(() => {
    searchRecommendation();
    setValuekey('');
    searchApi();
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
      console.log('--------temArray: ', temArray);
    } else {
      //   setPage(1);
    }
  };
  const searchRecommendation = async () => {
    ApiCall(`api/recommendations?city=${selectedCity}`, 'GET')
      .then(res => {
        console.log('----recommendation: ', res);
        if (res?.ok) {
          setRecommendation(res?.data?.data);
        }
      })
      .catch(err => {
        console.log('----recommendation erorr: ', err);
      });
  };
  const _renderItem = ({item, index}) => {
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
              } else {
                props.navigation.navigate('ClubDetails', {listDetail: item});
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
                {item?.images ? (
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
                    }}
                  />
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
                <Text style={styles.listingText}>{`${item?.musicGenre}`}</Text>
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
          }}
          style={{
            marginHorizontal: 10,
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
            <Text
              style={[
                styles.singerName,
                {fontFamily: FONTS.AxiformaRegular, marginTop: 0},
              ]}>
              {`${moment(item?.eventStartTime).format('hh:mm A')} - ${moment(
                item?.eventEndTime,
              ).format('hh:mm A')}`}
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
          recommendation?.length && recommendation[0]?.localities?.length
            ? recommendation[0]?.localities[0]
            : '',
        );
        searchApi(
          recommendation?.length && recommendation[0]?.localities?.length
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

              //   justifyContent: 'center',
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
                }}>
                <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
            {recommendation && !valuekey ? (
              <>
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
                                style={{height: 15, width: 15, marginRight: 8}}
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
              </>
            ) : null}
          </ScrollView>

          <FlatList
            data={clubs}
            renderItem={_renderItem}
            keyExtractor={(_, i) => i.toString()}
            onEndReachedThreshold={0.3}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
            // ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default SearchBar;
// const EmptyListMessage = () => {
//   return (
//     <Text style={styles.noDataText}>Search by Area, Genre, Artist or Club</Text>
//   );
// };
const styles = StyleSheet.create({
  hedingTextMain: {
    marginTop: 10,
    marginBottom: hp(2),
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
});
