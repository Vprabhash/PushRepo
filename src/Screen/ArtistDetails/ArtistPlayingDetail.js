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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistPlayingDetail = props => {
  const {artistData} = props?.route?.params;
  const [modalVisibleone, setModalVisibleone] = useState(false);

  const _renderItem = () => {
    return (
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
            <Text style={[styles.listinhHeading]}>{artistData?.title}</Text>
            <Text style={[styles.singerName]}>
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
                  )} to ${moment(artistData?.eventEndTime).format('hh:mm A')}`}
                </Text>
              </View>
            </View>
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
                <View style={{}}>
                  <Text style={styles.listinhHeading1}>
                    {[
                      artistData?.address?.locality || '',
                      artistData?.address?.city || '',
                    ]
                      .filter(e => e)
                      .join(', ')}
                  </Text>
                </View>
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
            {artistData?.priceText && (
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
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderTopWidth: 1,
              borderTopColor: '#9D9D9D',
              paddingVertical: 8,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              const scheme = Platform.select({
                ios: 'maps://0,0?q=',
                android: 'geo:0,0?q=',
              });
              const latLng = artistData?.club?.geoJson?.coordinates?.join(',');
              const label = artistData?.locationText;
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              });

              Linking.openURL(url);
            }}>
            <Image
              style={[styles.btnIcon, {tintColor: null}]}
              source={ImagePath.direction}
            />
            <Text style={styles.buttonText}>Get Direction</Text>
          </TouchableOpacity>
        </View>
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
            backgroundColor: COLORS.white,
            marginTop: getStatusBarHeight(),
            paddingVertical: 13,
            marginHorizontal: 15,
            elevation: 19,
          }}>
          <Header
            Back_Arrow={ImagePath.goBack}
            title="Event Details"
            titalTwo={`${artistData?.artists[0]?.name || ''} - ${
              artistData?.title || ''
            }`}
            iconHeight={20}
            iconWidth={29}
            onclick={() => {
              props.navigation.goBack();
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

          {_renderItem()}

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
  btnIcon: {height: 16, width: 16, resizeMode: 'contain', tintColor: '#FF00B7'},
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 9,
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.3,
  },
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
});
