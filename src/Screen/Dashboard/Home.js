import React, {useEffect, useState, useReducer, createRef, useRef} from 'react';
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
  Alert,
  Platform,
  AppState,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../../Components/constants';
import {useDispatch, useSelector} from 'react-redux';
import {spotLightApi} from '../../redux/reducers/spotLightSlice';
import {artistApi} from '../../redux/reducers/artistSlice';
import {LocationApi} from '../../redux/reducers/clubLocationSlice';
import {upComingEventApi} from '../../redux/reducers/upComingEventSlice';
import ApiCall from '../../redux/CommanApi';
import {ARTIST} from '../../services/Apis';
import Disclamer from '../../Components/Disclamer';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {addCoordinates} from '../../redux/reducers/clubLocationSlice';
import Geolocation from '@react-native-community/geolocation';
import CitySelector from '../../Components/CitySelector';
import HeaderCitySearch from '../../Components/HeaderCitySearch';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import { showLoader } from '../../redux/reducers/loaderSlice';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Home = props => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const userBaseCity = useSelector(state => state.citySelector.userBaseCity);

  const [modalVisible, setModalVisible] = useState(false);

  const locationLatLong = useSelector(
    state => state.clubLocation.locationLatLong,
  );
  const spotLightList = async () => {
    const data = await dispatch(spotLightApi()).then(data => {
      console.log('------spotLightList data--------', data.payload);
    });
  };
  const clubLocationList = async () => {
    const data = await dispatch(LocationApi()).then(data => {
      console.log('------clubLocationList data--------', data.payload);
    });
  };
  const artistList = async () => {
    const data = await dispatch(artistApi()).then(data => {
      console.log('------artistList data--------', data.payload);
    });
  };
  const UpComingEventList = async () => {
    const data = await dispatch(upComingEventApi()).then(data => {
      console.log('------UpComingEventList data--------', data.payload);
    });
  };
  useEffect(() => {
    // spotLightList();
    // clubLocationList();
    // artistList();
    // UpComingEventList();
    // dispatch(showLoader(false));
  }, []);

  useEffect(() => {
    fetchClubsSpotlight();
    fetchArtistSpotlight();
    AppState.addEventListener('change', handleAppStateChange);
  }, [selectedCity, userBaseCity]);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      checkLocation();
    }

    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    if (locationLatLong?.latitude) {
      clubsNearbyDataApi();
    }
  }, [locationLatLong]);

  const modalref = createRef(null);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
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
  // const location = async () => {
  //   let data = {
  //     page: page + 1,
  //   };
  //   const res = await ApiCall(ARTIST, 'GET', data);
  //   console.log('---res----', res);
  // };

  async function checkLocation() {
    await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      }),
    ).then(result => {
      if (result === 'granted') {
        // setModalVisible(false);
        Geolocation.getCurrentPosition(
          position => {
            if (position.coords) {
              console.log('location data:', position.coords);
              let obj = {};
              obj.latitude = position.coords.latitude;
              obj.longitude = position.coords.longitude;
              dispatch(addCoordinates(obj));
            }
          },
          error => {
            console.log('location error', error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000},
        );
      } else {
        let obj = {};
        obj.latitude = '';
        obj.longitude = '';
        dispatch(addCoordinates(obj));
        // Alert.alert(
        //   'Welcome to Azzir!',
        //   'Please give the location permission to continue. \nAzzir collects location data for the following. \n - To detect your current location. \n - Recommending clubs near your location.',
        //   [
        //     {
        //       text: 'Confirm',
        //       onPress: () => openSettings(),
        //     },
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('No Pressed'),
        //       style: 'cancel',
        //     },
        //   ],
        //   {cancelable: false},
        // );
      }
    });
  }

  const fetchMoreData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      location();
      setLoading(true);
      setonEndReachedCalledDuringMomentum(true);
    } else {
      setLoading(false);
    }
  };
  const Tabs = [
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail Bar'},
    {mapIcon: ImagePath.clubLocation, title: 'Nightclub'},
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail'},
    {mapIcon: ImagePath.clubLocation, title: 'Nightclub'},
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail'},
  ];
  const [clubsSpotlight, setClubsSpotlight] = useState([]);
  const [artistsSpotlight, setArtistsSpotlight] = useState([]);
  const fetchClubsSpotlight = () => {
    ApiCall(
      `api/clubs?isFeatured=true&city=${selectedCity}&userBaseCity=${userBaseCity}`,
      'GET',
    ).then(res => {
      // console.log('+++++++++---spotlight--->', JSON.stringify(res?.data?.length));
      setClubsSpotlight(res?.data);
    });
  };
  const fetchArtistSpotlight = () => {
    ApiCall(
      `api/artists?isFeatured=true&city=${selectedCity}&userBaseCity=${userBaseCity}`,
      'GET',
    ).then(res => {
      // console.log('(((((((---spotlight--->', JSON.stringify(res?.data));
      setArtistsSpotlight(res?.data);
    });
  };
  // const _renderItem = ({item, index}) => {
  //   return (
  //     <View style={{}}>
  //       <Image
  //         style={{
  //           marginRight: index == 4 ? 15 : 0,
  //           height: hp(20),
  //           width: wp(50),
  //           marginLeft: 15,
  //           resizeMode: 'cover',
  //           borderRadius: 10,
  //         }}
  //         source={item.mapIcon}
  //       />
  //       <Text style={styles.titleText}>{item.title}</Text>
  //     </View>
  //   );
  // };
  const [onEndReachedCalledDuringArtist, setonEndReachedCalledDuringArtist] =
    useState(true);
  const [artistPage, setArtistPage] = useState(1);
  const [artistLoading, setArtistLoading] = useState(true);
  const artistRenderFooter = () => {
    return (
      <View>
        {artistLoading ? (
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            style={{marginLeft: 8}}
          />
        ) : null}
      </View>
    );
  };
  const artistDataList = async () => {
    let data = {
      page: artistPage + 1,
    };
    const res = await ApiCall(ARTIST, 'GET', data);
    console.log('---res--logIn--artist---', res);
  };

  const fetchArtistData = () => {
    if (!onEndReachedCalledDuringArtist) {
      artistDataList();
      setArtistLoading(true);
      setonEndReachedCalledDuringArtist(true);
    } else {
      setArtistLoading(false);
    }
  };
  const [artistData, setArtistData] = useState([
    {Bar_Icon: ImagePath.listImg},
    {Bar_Icon: ImagePath.artistImg},
    {Bar_Icon: ImagePath.artistImg1},
    {Bar_Icon: ImagePath.listImg},
    {Bar_Icon: ImagePath.artistImg},
  ]);
  const artistRenderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('ArtistEventDetail', {
          artistListDetail: item,
        });
      }}
      style={{marginTop: 20}}>
      <FastImage
        style={{
          height: wp(28),
          width: wp(28),
          borderRadius: 10,
          marginLeft: 15,
          resizeMode: 'cover',
        }}
        source={{uri: item?.images[0] ?? ''}}
      />
      <Text
        style={[
          {
            color: COLORS.white,
            fontSize: 12,
            fontFamily: FONTS.AxiformaMedium,
            position: 'absolute',
            bottom: 10,
            left: 30,
            width: '70%',
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const [
    onEndReachedCalledDuringUpcoming,
    setonEndReachedCalledDuringUpcoming,
  ] = useState(true);
  const [Upcomingpage, setupcomingPage] = useState(1);
  const [Upcomingloading, setupcomingLoading] = useState(true);
  const UpcomingrenderFooter = () => {
    return (
      <View>
        {Upcomingloading ? (
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            style={{marginLeft: 8}}
          />
        ) : null}
      </View>
    );
  };
  const UpcomingDataList = async () => {
    let data = {
      page: Upcomingpage + 1,
    };
    const res = await ApiCall(ARTIST, 'GET', data);
    console.log('---res--logIn--artist---', res);
  };

  const fetchUpcomingData = () => {
    if (!onEndReachedCalledDuringUpcoming) {
      UpcomingDataList();
      setupcomingLoading(true);
      setonEndReachedCalledDuringUpcoming(true);
    } else {
      setupcomingLoading(false);
    }
  };

  const [UpcomingData, setupcomingData] = useState([
    // {
    //   mapIcon: ImagePath.eventImg,
    //   button: 'CONCERT',
    //   Name: 'Darshan Raval',
    //   icon: ImagePath.location,
    //   Location: '10 Downing Street, Near Bombay hospital',
    // },
    // {
    //   mapIcon: ImagePath.eventImg1,
    //   button: 'CONCERT',
    //   Name: 'Divine',
    //   icon: ImagePath.location,
    //   Location: '10 Downing Street, Near Bombay hospital',
    // },
  ]);

  const UpcomingData_RenderItem = ({item, index}) => {
    return (
      <View style={{}}>
        <Image
          style={{
            marginLeft: 15,
            marginRight: index == 1 ? 15 : 0,
            height: hp(20),
            width: wp(50),
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.mapIcon}
        />
        <View style={{position: 'absolute', left: 27, bottom: 9}}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.white,
              fontFamily: FONTS.RobotoBold,
              marginVertical: hp(1.5),
            }}>
            {item.Name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 10,
                width: 10,
                tintColor: 'rgba(255, 175, 175, 1)',
                resizeMode: 'contain',
              }}
              source={item.icon}
            />
            <Text
              style={[
                {
                  fontSize: 8,
                  color: COLORS.white,
                  marginLeft: 3,
                  fontFamily: FONTS.RobotoBold,
                },
              ]}>
              {item.Location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [
    onEndReachedCalledDuringspotLight,
    setonEndReachedCalledDuringspotLight,
  ] = useState(true);
  const [spotLightpage, setspotLightpage] = useState(1);
  const [spotLightloading, setSpotLightloading] = useState(true);
  const spotLightrenderFooter = () => {
    return (
      <View>
        {spotLightloading ? (
          <ActivityIndicator
            color={'#fff'}
            size={'large'}
            style={{marginLeft: 8}}
          />
        ) : null}
      </View>
    );
  };
  const spotLightDataList = async () => {
    let data = {
      page: spotLightpage + 1,
    };
    const res = await ApiCall(ARTIST, 'GET', data);
    console.log('---res--logIn--artist---', res);
  };

  const fetchSpotlightData = () => {
    if (!onEndReachedCalledDuringspotLight) {
      spotLightDataList();
      setSpotLightloading(true);
      setonEndReachedCalledDuringspotLight(true);
    } else {
      setSpotLightloading(false);
    }
  };
  const [SpotlightData, setSpotlightData] = useState([
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
  ]);
  const SpotlightData_RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.push('ClubDetails', {listDetail: item});
        }}
        style={{
          marginLeft: wp(2.5),
          marginRight: index == 0 ? 15 : 15,
          marginLeft: index == 0 ? 15 : 0,
        }}>
        {item?.media?.ambienceImages?.length ? (
          <FastImage
            style={{
              height: hp(26),
              width: wp(83),
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri: item?.media?.ambienceImages[0] || ''}}
          />
        ) : (
          <View
            style={{
              height: hp(26),
              width: wp(83),
              resizeMode: 'cover',
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
          />
        )}
        <View style={{position: 'absolute', left: 15, bottom: 30}}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.white,
              fontFamily: FONTS.AxiformaSemiBold,
            }}>
            {item.name}
          </Text>
          <Text
            style={[
              {
                color: COLORS.white,
                fontSize: 12,
                fontFamily: FONTS.AxiformaMedium,
              },
            ]}>
            {/* {item.musicGenre} */}
            Restrobar
          </Text>
          <Text
            style={[
              {
                fontSize: 10,
                color: COLORS.white,
                fontFamily: FONTS.AxiformaRegular,
              },
            ]}>
            {item.locality}, {item.city}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const clubsNearbyDataApi = () => {
    console.log('locationdata ---', locationLatLong);
    try {
      ApiCall(
        `api/nearby-clubs?coordinates=${locationLatLong?.latitude || ''}${
          locationLatLong?.latitude ? ',' : ''
        }${locationLatLong?.longitude || ''}&radius=5000&sort_dir=desc`, //${19.136326},${72.82766}
        'GET',
      ).then(res => {
        if (res?.data?.length) {
          setClubNearby(res?.data);
          clearTimeout();
        }
        console.log('clubsnearbydata ----', res?.data);
      });
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };
  const [clubsNearby, setClubNearby] = useState([]);
  const ClubNarDatarenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.push('ClubDetails', {listDetail: item});
        }}
        style={{
          marginLeft: index == 0 ? 15 : 0,
          marginRight: index == 2 ? 15 : 15,
          marginBottom: 10,
        }}>
        {item?.media?.ambienceImages?.length ? (
          <FastImage
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
            styles.titleText1,
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

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
          {/* <View style={{marginHorizontal: 15, marginTop: 46, marginBottom: 14}}>
          <Header
            Back_Arrow={ImagePath.manueIcon}
            title="Near me"
            titalTwo="Sector 52, Noida, UP 435464"
            iconHeight={12}
            iconWidth={18}
            onProfileClick={() => {
              props.navigation.navigate('Profile');
            }}
            profileIcon={ImagePath.profilePic}
          />
        </View> */}
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            >
            <StatusBar
              barStyle="dark-content"
              hidden={false}
              backgroundColor="transparent"
              translucent={true}
            />
            <View style={{paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 46}}>
            <HeaderCitySearch
              onPress={() => {
                props.navigation.navigate('SearchBar');
              }}
              />
              </View>
            {/* <TouchableOpacity
            style={[styles.fllter]}
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate('FilterScreen');
            }}>
            <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
            <Text style={styles.filtersText}>Filters</Text>
          </TouchableOpacity> */}
            <View style={styles.hedingTextMain}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>CLUBS IN SPOTLIGHT</Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>
            <FlatList
              horizontal={true}
              data={clubsSpotlight}
              renderItem={SpotlightData_RenderItem}
              showsHorizontalScrollIndicator={false}
              // ListFooterComponent={spotLightrenderFooter}
              // onEndReachedThreshold={0.7}
              contentContainerStyle={{marginTop: 20, zIndex: 99, paddingStart:5}}
              // onMomentumScrollBegin={() => {
              //   setonEndReachedCalledDuringspotLight(false);
              // }}
              // onEndReached={fetchSpotlightData}
            />
            <View style={styles.hedingTextMain}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>CLUBS NEARBY</Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>
            {/* <SafeAreaView> */}
            <FlatList
              horizontal={true}
              data={clubsNearby?.slice(0, 5)}
              renderItem={ClubNarDatarenderItem}
              showsHorizontalScrollIndicator={false}
              // ListFooterComponent={renderFooter}
              style={{marginTop: 20, marginBottom: -hp(2),paddingStart:5}}
              // onEndReachedThreshold={0.7}
              // onMomentumScrollBegin={() => {
              //   setonEndReachedCalledDuringMomentum(false);
              // }}
              // onEndReached={fetchMoreData}
              ListEmptyComponent={
                <View
                  style={{
                    width: width,
                    paddingBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {locationLatLong?.latitude ? (
                    <Text style={styles.titleText1}>No Clubs Found</Text>
                  ) : (
                    <View>
                      <Text
                        style={[
                          styles.titleText1,
                          {marginHorizontal: 30, textAlign: 'center'},
                        ]}>
                        AZZIR needs to detect you location to show the clubs
                        near you.
                      </Text>
                      <View
                        style={{
                          width: 100,
                          alignSelf: 'center',
                          marginBottom: -hp(2),
                        }}>
                        <CustomButton
                          onclick={() => {
                            openSettings();
                          }}
                          top={10}
                          title="ALLOW"
                          bgColor="#000"
                          textColor="#fff"
                        />
                      </View>
                    </View>
                  )}
                </View>
              }
            />
            {/* <FlatList
              horizontal={true}
              data={Tabs}
              renderItem={_renderItem}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={fetchMoreData}
            /> */}
            {/* </SafeAreaView> */}
            <View style={styles.hedingTextMain}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>ARTISTS IN SPOTLIGHT</Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>
            <FlatList
              horizontal={true}
              data={artistsSpotlight}
              renderItem={artistRenderItem}
              contentContainerStyle={{paddingStart:5}}
              showsHorizontalScrollIndicator={false}
              // ListFooterComponent={artistRenderFooter}
              // onEndReachedThreshold={0.7}
              // onMomentumScrollBegin={() => {
              //   setonEndReachedCalledDuringArtist(false);
              // }}
              // onEndReached={fetchArtistData}
            />
            {/* <TouchableOpacity
            style={[
              styles.fllter,
              {
                width: wp(33),
                elevation: 0,
                alignSelf: 'center',
                backgroundColor: 'transparent ',
                borderWidth: 1,
                borderRadius: 20,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => {
              ('');
            }}>
            <Text style={[styles.filtersText, {fontFamily: FONTS.RobotoBold}]}>
              Explore More
            </Text>
            <Image
              source={ImagePath.arrowRight}
              style={[styles.iconStyle, {width: 10, height: 8}]}
            />
          </TouchableOpacity> */}
            <View style={styles.hedingTextMain}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>UPCOMING EVENTS</Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                }}>
                {/* <Image style={styles.hedingImg} source={ImagePath.rightLine1} /> */}
                <Text style={styles.cardText}> Coming Soon </Text>
                {/* <Image style={styles.hedingImg} source={ImagePath.rightLine} /> */}
              </View>
            </View>
            {/* <SafeAreaView style={{marginBottom: 10}}>
            <FlatList
              horizontal={true}
              data={UpcomingData}
              renderItem={UpcomingData_RenderItem}
              ListFooterComponent={UpcomingrenderFooter}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringUpcoming(false);
              }}
              onEndReached={fetchUpcomingData}
              ListEmptyComponent={
                <View
                  style={{
                    height: 100,
                    width: width,
                    paddingBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleText1}>Coming Soon</Text>
                </View>
              }
            />
          </SafeAreaView> */}
            {/* <Text style={[styles.aboutText]}>Clubs Nearby </Text> */}

            {/* <SafeAreaView style={{marginBottom: 20}}>
            <FlatList
              horizontal={true}
              data={clubsNearby}
              renderItem={ClubNarDatarenderItem}
              ListEmptyComponent={
                <View
                  style={{
                    width: width,
                    paddingBottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleText1}>No Clubs Found</Text>
                </View>
              }
            />
          </SafeAreaView> */}
          </ScrollView>
      </ImageBackground>
      {/* <Disclamer
        isVisible={modalVisible}
        setVisible={visible => setModalVisible(visible)}
        onPress={async () => {
          await openSettings();
          setModalVisible(false);
        }}
      /> */}
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
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

  // modal css
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    width: wp(100),
    height: hp(65),
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: wp(4),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  redioText: {color: COLORS.black},
  textModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  redioImg: {height: 15, width: 15, tintColor: COLORS.black},

  button: {
    height: 60,
    // width: '100%', alignSelf: 'center',marginVertical: 5,padding:10,backgroundColor: 'pink',
  },

  filtersText: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.RobotoMedium,
  },
  fllter: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 16,
    width: wp(23),
    marginTop: hp(5),
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    height: hp(4),
  },

  titleText1: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    marginTop: hp(1),
  },
  aboutText: {
    color: '#202020',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: FONTS.AxiformaBold,
  },
  LoctionText: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 12,
    color: '#5B5959',
  },
  titleText: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
    fontSize: 14,
    marginTop: hp(1),
  },
});
