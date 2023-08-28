import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../assets/ImagePath';
import Toast from 'react-native-simple-toast';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import FilterScreen from '../../Components/Filter/FilterScreen';
import HeaderCitySearch from '../../Components/HeaderCitySearch';
import {useSelector} from 'react-redux';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import {logEvent, sendUXActivity} from '../../utils/AddFirebaseEvent';
import {createEventName} from '../../utils/common';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ArtistDetail = props => {
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valuekey, setValuekey] = useState('');
  const [filterComponent, setFilterComponent] = useState(false);
  const [artistList, setArtistList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [dontCall, setDontCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // const routes = props.navigation.getState()?.routes;
      // const prevRoute = routes[routes.length - 3];
      // fetchArtistsData(1);
      // setValuekey('');
      // setSelectedFilter({});
      setFilterComponent(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setPage(0);
    fetchArtistsData(0);
    toTop();
  }, [selectedCity, userBaseCity]);

  useEffect(() => {
    fetchArtistsData(page);
  }, [page, selectedFilter, selectedCity, userBaseCity]);

  const toTop = () => {
    // use current
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  function areAllKeysEmpty(obj) {
    return Object.values(obj).every(value => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    });
  }

  const fetchArtistsData = async page => {
    let tempdataGenres = [];
    for (let i = 0; i < selectedFilter?.musicGenre?.length; i++) {
      if (selectedFilter?.musicGenre[i].checked == true) {
        let details = {};
        details = selectedFilter?.musicGenre[i].value;
        tempdataGenres.push(details);
      }
    }
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      if (tempdataGenres?.length) {
        queryParams.append('musicGenre', tempdataGenres?.join('|'));
      }
      if (selectedFilter?.artist) {
        queryParams.append('type', selectedFilter?.artist);
      }
      if (selectedCity) {
        queryParams.append('city', selectedCity);
      }
      const res = await ApiCall(`api/artists?${queryParams}`, 'GET');
      if (Array.isArray(res?.data)) {
        if (page === 0) {
          setArtistList(res?.data);
        } else {
          if (res?.data?.length) {
            setArtistList([...artistList, ...res?.data]);
          } else {
            setDontCall(true);
          }
        }
      } else {
        setDontCall(true);
        Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      setDontCall(true);
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setIsLoading(false);
      setLoading(false);
      setFilterComponent(false);
    }
  };

  const searchApi = async text => {
    if (valuekey) {
      const res = await ApiCall(`api/search?q=${valuekey}`, 'GET');
      setArtistList(res?.data?.artists);
    } else {
      setPage(0);
    }
    setDontCall(false);
    setSelectedFilter({});
  };
  const fetchMoreData = () => {
    // fetchArtistsData(page + 1);
    if (!onEndReachedCalledDuringMomentum && !loading) {
      setLoading(true);
      setPage(page + 1);
      setonEndReachedCalledDuringMomentum(true);
    }
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

  const artistListRenderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
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
  };

  const onPressApply = data => {
    setPage(0);
    setFilterComponent(false);
    setDontCall(false);
    setSelectedFilter(data);
  };

  const onPressCancel = () => {
    setFilterComponent(false);
  };
  const EmptyListMessage = () => {
    return <Text style={styles.titleText}>No Artists Found</Text>;
  };

  if (filterComponent) {
    return (
      <FilterScreen
        isArtistFilter={true}
        onPressApply={onPressApply}
        onPressCancel={onPressCancel}
        selectedFilter={selectedFilter}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
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
        <View
          style={{
            marginHorizontal: 5,
            flex: 1,
          }}>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate('SearchScreen');
            }}>
            <View
              style={[styles.inputMain, {marginTop: 50, marginVertical: 20}]}>
              <TextInput
                style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholder={'Search by Area, Genre, Artist or Club'}
                editable={false}
                onChangeText={text => {
                  // searchApi(text),
                  setValuekey(text);
                }}
                value={valuekey}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  searchApi();
                }}>
                <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
            }}>
            <TouchableOpacity
              style={[
                styles.fllter,
                {
                  borderWidth: areAllKeysEmpty(selectedFilter) ? 0 : 1,
                  borderColor: COLORS.primary,
                },
              ]}
              activeOpacity={0.5}
              onPress={() => {
                setFilterComponent(true);
              }}>
              <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
              <Text style={styles.filtersText}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fllter,
                {
                  backgroundColor:
                    selectedFilter?.artist?.toLowerCase() === 'dj'
                      ? COLORS.primary
                      : COLORS.white,
                },
              ]}
              activeOpacity={0.5}
              onPress={() => {
                flatListRef?.current?.scrollToOffset({
                  animated: false,
                  offset: 0,
                });
                setIsLoading(true);
                setPage(0);
                setDontCall(false);
                if (selectedFilter?.artist?.toLowerCase() !== 'dj') {
                  setSelectedFilter({...selectedFilter, artist: 'dj'});
                } else {
                  setSelectedFilter({...selectedFilter, artist: ''});
                }
              }}>
              <Image
                source={ImagePath.menuUser3}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      selectedFilter?.artist?.toLowerCase() === 'dj'
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}
              />
              <Text
                style={[
                  styles.filtersText,
                  {
                    color:
                      selectedFilter?.artist?.toLowerCase() === 'dj'
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}>
                DJ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fllter,
                {
                  backgroundColor:
                    selectedFilter?.artist?.toLowerCase() === 'artist'
                      ? COLORS.primary
                      : COLORS.white,
                },
              ]}
              activeOpacity={0.5}
              onPress={() => {
                flatListRef?.current?.scrollToOffset({
                  animated: false,
                  offset: 0,
                });
                setIsLoading(true);
                setPage(0);
                setDontCall(false);
                if (selectedFilter?.artist?.toLowerCase() !== 'artist') {
                  setSelectedFilter({...selectedFilter, artist: 'artist'});
                } else {
                  setSelectedFilter({...selectedFilter, artist: ''});
                }
              }}>
              <Image
                source={ImagePath.songIcon}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      selectedFilter?.artist?.toLowerCase() === 'artist'
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}
              />
              <Text
                style={[
                  styles.filtersText,
                  {
                    color:
                      selectedFilter?.artist?.toLowerCase() === 'artist'
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}>
                SINGER
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={COLORS.primary}
              style={{flex: 1, alignSelf: 'center'}}
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={artistList}
              renderItem={artistListRenderItem}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.3}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={dontCall ? null : fetchMoreData}
              ListEmptyComponent={EmptyListMessage}
              contentContainerStyle={{
                paddingBottom: getBottomSpace() + hp(15),
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
export default ArtistDetail;
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
    // marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: 7,
    zIndex: 9,
  },
  inputMain: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 15,
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
    tintColor: COLORS.primary,
    width: 18,
    resizeMode: 'contain',
    height: 18,
  },

  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    marginTop: hp(1),
    textAlign: 'center',
  },
  listinhHeading1: {
    fontSize: 16,
    marginLeft: 15,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.black,
  },
  dicText: {
    color: '#909090',
    fontSize: 12,
    marginLeft: 15,
    fontFamily: FONTS.RobotoRegular,
  },
  aboutText: {
    color: COLORS.black,
    fontSize: 20,
    marginLeft: 15,
    marginVertical: hp(1),
    fontFamily: FONTS.AxiformaBold,
  },
  btnIcon: {height: 16, width: 16, resizeMode: 'contain', tintColor: '#FF00B7'},
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 5,
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.3,
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
  listinhHeading: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
});
