import React from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../../Components/constants';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistPlayingDetail = props => {
  const ENTRIES1 = [
    {
      mapIcon1: ImagePath.aadat,
      title1: 'Worth The Shot',
      singerName: 'By',
      singerNametwo: ' DJ Nyk',
      mapIcon: ImagePath.watchIcon,
      title: 'Fri Mar 24 at 8:00 PM  ',
      location: ImagePath.location,
      locationText: 'Ametrine24, Bhopal',
      play: ImagePath.play_pause,
      playText: 'Live Music Concert',
      btn: 'Free',
      btnText: 'Onwards',
    },
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: 7}}>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <Image
            style={{height: hp(29), width: '100%', borderRadius: 10}}
            source={item.mapIcon1}
          />
          <View style={{paddingHorizontal: 15, paddingVertical: hp(2)}}>
            <Text style={[styles.listinhHeading]}>{item.title1}</Text>
            <Text style={[styles.singerName]}>
              {item.singerName}
              <Text style={{textDecorationLine: 'underline', paddingLeft: 2}}>
                {item.singerNametwo}
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
                source={item.mapIcon}
              />
              <View style={{flex: 0.6}}>
                <View style={{}}>
                  <Text style={styles.listinhHeading1}>{item.title}</Text>
                </View>
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
                source={item.location}
              />
              <View style={{flex: 0.6}}>
                <View style={{}}>
                  <Text style={styles.listinhHeading1}>
                    {item.locationText}
                  </Text>
                </View>
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
                source={item.play}
              />
              <View style={{}}>
                <View style={{}}>
                  <Text style={styles.listinhHeading1}>{item.playText}</Text>
                </View>
              </View>
            </View>
            {item.btnText && (
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
                  {' '}
                  {item.btn}
                </Text>
                <Text
                  style={{
                    color: '#DD2AFB',
                    textAlign: 'center',
                    fontFamily: FONTS.RobotoMedium,
                    fontSize: 12,
                  }}>
                  {item.btnText}
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
            }}>
            <Image style={styles.btnIcon} source={ImagePath.direction} />
            <Text style={styles.buttonText}>Get Direction</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        Back_Arrow={ImagePath.goBack}
        tital="Artist playing Nearby"
        titalTwo="DJ NYK- Wort the shot"
        onclick={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <ImageBackground
          source={ImagePath.Azzir_Bg}
          resizeMode="cover"
          style={{height: '100%', paddingBottom: 20}}>
          <SafeAreaView>
            <FlatList data={ENTRIES1} renderItem={_renderItem} />
          </SafeAreaView>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 8,
              elevation: 5,
              marginHorizontal: 15,
            }}>
            <Text style={styles.aboutText}>About the event </Text>
            <Text
              style={{
                color: COLORS.black,
                marginHorizontal: 10,
                fontSize: 16,
                marginVertical: 12,
                fontFamily: FONTS.RobotoRegular,
              }}>
              experience the mesmerizing voice of darshan raval live in concert!
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginHorizontal: 10,
                fontSize: 16,
                marginBottom: 12,
                fontFamily: FONTS.RobotoRegular,
              }}>
              The concert will be held on Saturday, October 1st, 2022. Gates
              will open at 6:00 PM, and the show will start at 8:00 PM.{' '}
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
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
    marginLeft: 10,
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
});
