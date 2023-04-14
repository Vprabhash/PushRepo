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
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import MenuCard from '../../Components/MenuCard';
import {COLORS, FONTS} from '../../Components/constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ClubDetails = props => {
  const ENTRIES1 = [
    {
      mapIcon: ImagePath.upcoming_Evn_Img,
      title: 'Fabulous friday',
      singerName: 'By AVGSS Group',
      singerNameIcon: ImagePath.Explore,
      musicIcon: ImagePath.menuUser3,
      musicText: 'Bollywood, Commercial',
    },
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <Image
            style={{
              height: hp(29),
              width: '100%',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={item.mapIcon}
          />
          <View style={{paddingHorizontal: wp(3), paddingVertical: hp(3)}}>
            <Text style={styles.listinhHeading}>{item.title}</Text>
            <View style={{flexDirection: 'row', marginTop: hp(2)}}>
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
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                style={{
                  height: 17,
                  width: 17,
                  tintColor: '#D200FD',
                  borderRadius: 10,
                  resizeMode: 'contain',
                }}
                source={item.musicIcon}
              />
              <Text style={[styles.singerName]}>{item.musicText}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const MenuData = [
    {menuImg: ImagePath.clubLocation, title: 'Food'},
    {menuImg: ImagePath.food, title: 'Beverages'},
  ];
  const MenuDatarenderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index == 0 ? 15 : 0,
          marginRight: index == 1 ? 15 : 15,
        }}>
        <Image
          style={{
            height: hp(20),
            width: wp(50),
            // marginLeft: wp(4),
            // marginRight: index == 1 ? 15 : 0,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.menuImg}
        />
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
    );
  };

  const ClubNarData = [
    {
      menuImg: ImagePath.lightHoush,
      title: 'Light house- the club',
      Loction: '6.9 km| Sayaji Hotel, Vijay nagar',
    },
    {
      menuImg: ImagePath.lightHoush,
      title: 'Light house- the club',
      Loction: '6.9 km| Sayaji Hotel, Vijay nagar',
    },
    {
      menuImg: ImagePath.lightHoush,
      title: 'Light house- the club',
      Loction: '6.9 km| Sayaji Hotel, Vijay nagar',
    },
  ];
  const ClubNarDatarenderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index == 0 ? 15 : 0,
          marginRight: index == 2 ? 15 : 15,
          marginBottom: 10,
        }}>
        <Image
          style={{
            height: hp(20),
            width: wp(50),
            // marginLeft: wp(4),
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.menuImg}
        />
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.LoctionText}>{item.Loction}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* <Header
                // Back_Arrow={ImagePath.manueIcon}
                searchIcon={ImagePath.searchIcon}
                placeholder='Search'
            // profileIcon={ImagePath.profilePic}
            /> */}
      <View style={[styles.inputMain, {marginTop: hp(6)}]}>
        <TextInput
          style={[styles.textInput, {color: COLORS.black}]}
          placeholder={'Search'}
          placeholderTextColor="#A3A3A3"
          // onChangeText={onChangeText}
          // value={value}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            ('');
          }}>
          <Image
            source={ImagePath.searchIcon}
            style={[styles.iconStyle, {tintColor: '#A3A3A3'}]}
          />
        </TouchableOpacity>
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
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 26,
              justifyContent: 'center',
            }}>
            <Swiper
              style={styles.wrapper}
              paginationStyle={{
                bottom: hp(-3),
                backgroundColor: '#C9C9C9',
                borderRadius: 20,
                marginHorizontal: '40%',
                alignSelf: 'center',
              }}
              activeDotStyle={{backgroundColor: '#717171', borderRadius: 4}}
              dotStyle={{
                backgroundColor: COLORS.white,
                padding: 4,
                width: 6,
                height: 6,
                borderRadius: 4,
              }}
              showsButtons={true}
              showsPagination={true}
              prevButton={
                <Image
                  source={ImagePath.prew}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              }
              nextButton={
                <Image
                  source={ImagePath.next}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              }>
              <View style={styles.slide1}>
                <Image
                  style={{resizeMode: 'contain', width: '100%'}}
                  source={ImagePath.Explore}
                />
              </View>
              <View style={styles.slide2}>
                <Image
                  style={{resizeMode: 'contain', width: '100%'}}
                  source={ImagePath.eventImg}
                />
              </View>
              <View style={styles.slide3}>
                <Image
                  style={{resizeMode: 'contain', width: '100%'}}
                  source={ImagePath.eventImg1}
                />
              </View>
            </Swiper>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(3),
              marginHorizontal: 15,
            }}>
            <View>
              <Text
                style={{
                  color: '#202020',
                  fontSize: 20,
                  fontFamily: FONTS.AxiformaBold,
                }}>
                Effingut
              </Text>
              <Text
                style={{
                  color: '#5B5959',
                  fontSize: 12,
                  fontFamily: FONTS.RobotoMedium,
                }}>
                Restobar
              </Text>
            </View>

            <LinearGradient
              style={{
                flexDirection: 'row',
                height: 20,
                width: 40,
                borderRadius: 8,
                justifyContent: 'center',
                backgroundColor: 'red',
                alignItems: 'center',
              }}
              start={{x: 0.3, y: 0.5}}
              colors={['deeppink', 'dodgerblue']}>
              <Text style={{fontWeight: '700', color: '#FFFFFF', fontSize: 12}}>
                5
              </Text>
              <Image
                style={{height: 13, width: 13, tintColor: '#FFFFFF'}}
                source={ImagePath.star}
              />
            </LinearGradient>
          </View>
          <Text
            style={{
              fontSize: 16,
              lineHeight: hp(3),
              marginTop: hp(1.7),
              color: COLORS.black,
              marginHorizontal: 15,
              fontFamily: FONTS.HankenGroteskReglur,
            }}>
            Dhanraj Mahal, Next to The Bentley Showroom, Colaba, Mumbai,
            Maharashtra 400005
          </Text>
          <Text style={styles.aboutText}>About the Club </Text>
          <MenuCard />

          <Text style={styles.aboutText}>Whats Happening Today </Text>

          <View style={{marginHorizontal: 0}}>
            <FlatList data={ENTRIES1} renderItem={_renderItem} />
          </View>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <LinearGradient
              style={{
                height: hp(6),
                width: wp(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              start={{x: 0.3, y: 0.5}}
              colors={['deeppink', 'dodgerblue']}>
              <Text style={{fontWeight: '700', color: '#FFFFFF', fontSize: 12}}>
                Events For the month
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.aboutText}>Menu </Text>

          <View style={{}}>
            <FlatList
              horizontal={true}
              data={MenuData}
              renderItem={MenuDatarenderItem}
            />
          </View>
          <Text style={[styles.aboutText]}>Clubs Nearby </Text>
          <View style={{}}>
            <FlatList
              horizontal={true}
              data={ClubNarData}
              renderItem={ClubNarDatarenderItem}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default ClubDetails;
const styles = StyleSheet.create({
  aboutText: {
    color: '#202020',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: hp(2.5),
    marginTop: hp(4),
    fontFamily: FONTS.AxiformaBold,
  },
  wrapper: {height: 200, alignItems: 'center', justifyContent: 'center'},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
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
    marginHorizontal: wp(2.5),
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
  listinhText1: {fontSize: 14, fontWeight: '400', color: '#575757'},
});
