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
const ArtistDetail = props => {
  const ENTRIES1 = [
    {
      mapIcon: ImagePath.aadat,
      title: 'Worth The Shot',
      singerName: 'By ',
      singerNameTwo: 'DJ Snake',
      singerNameIcon: ImagePath.Explore,
      price: '₹1499',
      priceText: 'onwards',
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 16,
            elevation: 4,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}>
          <Image
            style={{height: hp(29), width: '100%', borderRadius: 16}}
            source={item.mapIcon}
          />
          <View
            style={{
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
              backgroundColor: COLORS.white,
            }}>
            <Text style={styles.listinhHeading}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 17,
                    width: 17,
                    borderRadius: 10,
                    resizeMode: 'contain',
                  }}
                  source={item.singerNameIcon}
                />
                <Text style={[styles.singerName]}>{item.singerName}</Text>
                <Text
                  style={[
                    styles.singerName,
                    {textDecorationLine: 'underline', marginLeft: 0},
                  ]}>
                  {item.singerNameTwo}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#FAFAFA',
                  borderWidth: 1,
                  alignItems: 'center',
                  borderColor: 'rgba(239, 239, 239, 1)',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: FONTS.AxiformaBold,
                    fontSize: 16,
                    marginBottom: -4,
                    color: '#292929',
                  }}>
                  {item.price}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.AxiformaRegular,
                    fontSize: 12,
                    color: '#292929',
                  }}>
                  {item.priceText}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const TimeData = [
    {
      mapIcon: ImagePath.watchIcon,
      title: 'Fri Mar 24 at 8:00 PM   ',
    },
    {
      mapIcon: ImagePath.location,
      title: 'BoomBox, Lucknowx',
      dis: '13th Floor The Summit, Vibhuti Khand, Lucknow, Uttar Pradesh 226010',
    },
  ];
  const TimerenderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          alignItems: index == 1 ? 'flex-start' : 'center',
          marginTop: index == 1 ? 4 : 0,
          paddingLeft: 16,
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
        <View style={{flex: 0.7}}>
          <Text style={styles.listinhHeading1}>{item.title}</Text>
          {item.dis && <Text style={styles.dicText}>{item.dis}</Text>}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
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

          //  profileIcon={ImagePath.profilePic}
        />
      </View>
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
          style={{height: '100%'}}>
          <SafeAreaView>
            <FlatList data={ENTRIES1} renderItem={_renderItem} />
          </SafeAreaView>
          <Text style={styles.aboutText}>Timing & Venue </Text>

          <View
            style={{
              marginHorizontal: 15,
              backgroundColor: '#FFFFFF',
              elevation: 5,
              borderRadius: 10,
            }}>
            <FlatList data={TimeData} renderItem={TimerenderItem} />
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                borderTopWidth: 1,
                borderTopColor: '#9D9D9D',
                paddingVertical: 6,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image style={styles.btnIcon} source={ImagePath.direction} />
              <Text style={styles.buttonText}>Get Direction</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default ArtistDetail;
const styles = StyleSheet.create({
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
  singerName: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: FONTS.AxiformaBold,
    color: '#5B5959',
  },
  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
});
