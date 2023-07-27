import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../../Components/constants';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import moment from 'moment';
import ImageView from 'react-native-image-viewing';
import {logEvent} from '../../utils/AddFirebaseEvent';
import ArtistsList from '../../Components/ArtistsList';
import Toast from 'react-native-simple-toast';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistPlayingDetail = props => {
  const {artistData} = props?.route?.params;
  const [modalVisibleone, setModalVisibleone] = useState(false);

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
            titalTwo="Event Details"
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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />
          <View
            style={{
              flex: 1,
              marginBottom: 7,
              marginHorizontal: 15,
              marginTop: 20,
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                // marginHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                elevation: 4,
              }}>
              {
                <Pressable onPress={() => setModalVisibleone(true)}>
                  <Swiper
                    autoplay={true}
                    autoplayTimeout={4}
                    style={[styles.wrapper]}
                    containerStyle={{
                      borderRadius: 8,
                      marginTop: 15,
                      marginHorizontal: 15,
                      overflow: 'hidden',
                    }}
                    paginationStyle={{
                      bottom: hp(1),
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
                    {artistData?.images.length ? (
                      artistData?.images?.slice(0, 5)?.map(item => (
                        <View style={styles.slide}>
                          <FastImage
                            style={styles.slideImg}
                            source={{uri: item?.path}}
                          />
                        </View>
                      ))
                    ) : (
                      <View />
                    )}
                  </Swiper>
                </Pressable>
              }
              <View style={{paddingHorizontal: 15, paddingVertical: hp(2)}}>
                <Text style={[styles.listinhHeading]}>
                  {artistData?.title}
                  <Text
                    style={[styles.listinhHeading]}
                    onPress={() => {
                      logEvent(`club_detail ${artistData?.club?.name}`);
                      props.navigation.navigate('ClubDetails', {
                        listDetail: artistData?.club,
                      });
                    }}>
                    {' '}
                    at {artistData?.club?.name}
                  </Text>
                </Text>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                  }}>
                  {artistData?.artists?.length &&
                  artistData?.artists[0]?.images?.length &&
                  artistData?.artists[0]?.images[0] ? (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 30,
                        resizeMode: 'contain',
                        marginRight: 6,
                      }}
                      source={{uri: artistData?.artists[0]?.images[0]}}
                    />
                  ) : null}
                  <Text style={[styles.singerName, {marginTop: 0}]}>
                    By{' '}
                    <Text
                      style={{textDecorationLine: 'underline', paddingLeft: 5}}
                      onPress={() =>
                        props.navigation.navigate('ArtistEventDetail', {
                          artistListDetail: artistData?.artists[0],
                        })
                      }>
                      {artistData?.artists[0]?.name}
                    </Text>
                  </Text>
                </View> */}
                {artistData?.artists?.length ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    {artistData?.artists[0]?.images?.length &&
                    artistData?.artists[0]?.images[0] ? (
                      <Image
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          resizeMode: 'contain',
                          marginRight: 10,
                        }}
                        source={{uri: artistData?.artists[0]?.images[0]}}
                      />
                    ) : artistData?.artists?.length ? (
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          resizeMode: 'contain',
                          marginRight: 10,
                          justifyContent: 'center',
                          backgroundColor: COLORS.gray,
                          overflow: 'hidden',
                        }}>
                        <Image
                          source={
                            artistData?.artists[0]?.type?.toLowerCase() ===
                            'artist'
                              ? ImagePath.placeholderSinger
                              : artistData?.artists[0]?.type?.toLowerCase() ===
                                'dj'
                              ? ImagePath.placeholderDj
                              : artistData?.artists[0]?.type?.toLowerCase() ===
                                'guest'
                              ? ImagePath.profile
                              : null
                          }
                          style={{
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            opacity: 0.5,
                          }}
                        />
                      </View>
                    ) : null}
                    <Text style={[styles.singerName, {marginTop: 0}]}>By </Text>
                    <View style={{width: '70%', flexDirection: 'row'}}>
                      <ArtistsList
                        artistData={artistData}
                        navigation={props.navigation}
                      />
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 22,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      height: 17,
                      tintColor: COLORS.black,
                      width: 17,
                      resizeMode: 'contain',
                    }}
                    source={ImagePath.watchIcon}
                  />
                  <View style={{flex: 0.7}}>
                    <Text style={styles.listinhHeading1}>
                      {`${moment(artistData?.eventStartTime).format(
                        'ddd MMM DD',
                      )} at ${moment(artistData?.eventStartTime).format(
                        'hh:mm A',
                      )} to ${moment(artistData?.eventEndTime).format(
                        'hh:mm A',
                      )}`}
                    </Text>
                  </View>
                </View>

                {/* {artistData?.club ? (
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
                      <Text
                        style={[
                          styles.listinhHeading1,
                          {
                            textDecorationLine: 'underline',
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate('ClubDetails', {
                            listDetail: artistData?.club,
                          })
                        }>
                        {artistData?.club?.name}
                      </Text>
                    </View>
                  </View>
                ) : null} */}
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
                    <Text style={styles.listinhHeading1}>
                      <Text
                        style={[
                          styles.listinhHeading1,
                          {
                            textDecorationLine: 'underline',
                          },
                        ]}
                        onPress={() => {
                          logEvent(`club_detail ${artistData?.club?.name}`);
                          props.navigation.navigate('ClubDetails', {
                            listDetail: artistData?.club,
                          });
                        }}>
                        {artistData?.club?.name}
                      </Text>
                      {'\n'}
                      {[
                        artistData?.club?.locality || '',
                        artistData?.address?.city || '',
                      ]
                        .filter(e => e)
                        .join(', ')}
                    </Text>
                  </View>
                </View>
                {/* <View
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
                source={ImagePath.play_pause}
              />
              <Text style={styles.listinhHeading1}>{'Live Music Concert'}</Text>
            </View> */}
                {artistData?.price?.amount && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      position: 'absolute',
                      borderWidth: 1,
                      borderColor: '#DD2AFB',
                      borderRadius: 10,
                      height: 56,
                      width: 56,
                      justifyContent: 'center',
                      right: 15,
                      bottom: 20,
                    }}>
                    <Text
                      style={{
                        color: '#DD2AFB',
                        textAlign: 'center',
                        fontFamily: FONTS.RobotoBlack,
                        fontSize: 12,
                      }}>
                      {'₹' + artistData?.price?.amount}
                    </Text>
                    <Text
                      style={{
                        color: '#DD2AFB',
                        textAlign: 'center',
                        fontFamily: FONTS.RobotoMedium,
                        fontSize: 12,
                      }}>
                      onwards
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  marginTop: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                onPress={() => {
                  logEvent('event_direction_press', artistData?.club?.name);
                  const scheme = Platform.select({
                    ios: 'maps://0,0?q=',
                    android: 'geo:0,0?q=',
                  });
                  const latLng =
                    artistData?.club?.geoJson?.coordinates?.join(',');
                  const label = artistData?.locationText;
                  const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`,
                  });

                  Linking.openURL(artistData?.club?.googleMapLink);
                }}>
                <Image
                  style={[styles.btnIcon, {tintColor: null}]}
                  source={ImagePath.direction}
                />
                <Text style={styles.buttonText}>Get Direction</Text>
              </TouchableOpacity> */}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    logEvent(`event_direction_press ${artistData?.club?.name}`);
                    Linking.openURL(artistData?.club?.googleMapLink);
                  }}
                  style={[styles.btnmain, {borderBottomLeftRadius: 10}]}>
                  <Image
                    style={[styles.btnIcon, {height: 18, width: 18}]}
                    source={ImagePath.direction}
                  />
                  <Text style={[styles.buttonText, {}]}>Direction</Text>
                </TouchableOpacity>
                {artistData?.club?.whatsappNumber ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(`whatsapp_pressed ${artistData?.club?.name}`);
                      if (artistData?.club?.whatsappNumber) {
                        Linking.openURL(
                          'http://api.whatsapp.com/send?phone=91' +
                            artistData?.club?.whatsappNumber,
                        );
                      } else {
                        Toast.showWithGravity(
                          'Sorry! WhatsApp number is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[styles.btnmain, {marginHorizontal: 1}]}>
                    <Image style={styles.btnIcon} source={ImagePath.WhatsApp} />
                    <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(`whatsapp_pressed ${artistData?.club?.name}`);
                      if (artistData?.club?.whatsappNumber) {
                        Linking.openURL(
                          'http://api.whatsapp.com/send?phone=91' +
                            artistData?.club?.whatsappNumber,
                        );
                      } else {
                        Toast.showWithGravity(
                          'Sorry! WhatsApp number is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[styles.btnmainDisabled, {marginHorizontal: 1}]}>
                    <Image
                      style={styles.btnIconDisabled}
                      source={ImagePath.WhatsAppDisabled}
                    />
                    <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
                  </TouchableOpacity>
                )}
                {artistData?.club?.phoneNumber ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(`call_pressed ${artistData?.club?.name}`);
                      if (artistData?.club?.phoneNumber) {
                        Linking.openURL('tel:' + artistData?.club?.phoneNumber);
                      } else {
                        Toast.showWithGravity(
                          'Sorry! Phone number is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
                    <Image style={styles.btnIcon} source={ImagePath.callIcon} />
                    <Text style={[styles.buttonText, {}]}>Call</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      logEvent(`call_pressed ${artistData?.club?.name}`);
                      if (artistData?.club?.phoneNumber) {
                        Linking.openURL('tel:' + artistData?.club?.phoneNumber);
                      } else {
                        Toast.showWithGravity(
                          'Sorry! Phone number is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[
                      styles.btnmainDisabled,
                      {borderBottomRightRadius: 10},
                    ]}>
                    <Image
                      style={styles.btnIconDisabled}
                      source={ImagePath.callIconDisabled}
                    />
                    <Text style={[styles.buttonText, {}]}>Call</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <ImageView
            visible={modalVisibleone}
            images={
              artistData?.images?.length
                ? artistData?.images?.map(e => ({
                    uri: e?.path,
                  }))
                : []
            }
            imageIndex={0}
            onRequestClose={() => setModalVisibleone(false)}
            swipeToCloseEnabled={true}
            FooterComponent={({imageIndex}) => {
              return (
                <Text style={styles.imageView}>
                  {`(${imageIndex + 1}/${artistData?.images?.length})`}
                </Text>
              );
            }}
          />
          {/* <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 22,
              paddingHorizontal: 14,
              borderRadius: 10,
              marginTop: 8,
              marginBottom: 20,
              elevation: 5,
              marginHorizontal: 15,
            }}>
            <Text style={styles.aboutText}>About the event </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                marginVertical: 5,
                fontFamily: FONTS.RobotoRegular,
              }}>
              experience the mesmerizing voice of darshan raval live in concert!
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                marginBottom: 12,
                fontFamily: FONTS.RobotoRegular,
              }}>
              The concert will be held on Saturday, October 1st, 2022. Gates
              will open at 6:00 PM, and the show will start at 8:00 PM.{' '}
            </Text>
          </View> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default ArtistPlayingDetail;
const styles = StyleSheet.create({
  listinhHeading1: {
    fontSize: 16,
    marginLeft: 15,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.black,
  },
  aboutText: {
    color: COLORS.black,
    fontSize: 24,
    // marginLeft: 10,
    // marginVertical: hp(1),
    fontFamily: FONTS.AxiformaBold,
  },
  // btnIcon: {height: 16, width: 16, resizeMode: 'contain', tintColor: '#FF00B7'},
  // buttonText: {
  //   fontSize: 16,
  //   color: COLORS.white,
  //   marginLeft: 9,
  //   fontFamily: FONTS.RobotoRegular,
  //   letterSpacing: 0.3,
  // },
  singerName: {
    fontSize: 16,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.black,
    marginTop: 6,
  },
  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
  wrapper: {height: 223},
  slideImg: {
    resizeMode: 'contain',
    borderRadius: 8,
    width: '100%',
    height: 300,
  },
  imageView: {
    alignSelf: 'center',
    paddingBottom: 30,
    zIndex: 99,
    elevation: 3,
    color: '#fff',
    fontFamily: FONTS.AxiformaRegular,
  },
  menuIconCss: {height: 20, width: 20, resizeMode: 'contain'},
  menuText: {
    color: '#5B5959',
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
  },
  menuText2: {
    color: '#BBBBBB',
    fontSize: 12,
    fontFamily: FONTS.RobotoRegular,
  },
  //btn
  btnmain: {
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'center',
    backgroundColor: '#202020',
    borderWidth: 1,
    height: hp('6.5%'),
    borderColor: '#000',
    justifyContent: 'center',
  },
  btnmainDisabled: {
    flexDirection: 'row',
    flex: 0.4,
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
  btnIcon: {height: 16, width: 16, resizeMode: 'contain'},
  btnIconDisabled: {height: 16, width: 16, resizeMode: 'contain'},
});
