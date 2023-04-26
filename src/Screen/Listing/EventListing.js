import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const EventListing = props => {
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
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

  const list = async () => {
    let data = {
      page: page + 1,
    };
    const res = await ApiCall(ARTIST, 'GET', data);
    console.log('---res--logIn--artist---', res);
  };
  useEffect(() => {
    list();
  }, []);

  const fetchMoreData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      list();
      setLoading(true);
      setonEndReachedCalledDuringMomentum(true);
    } else {
      setLoading(false);
    }
  };
  const [ENTRIES1, setENTRIES1] = useState([
    {
      mapIcon: ImagePath.upcoming_Evn_Img,
      title: 'Justice Tour',
      singerName: 'By Arijit Singh',
      barLocation: 'Colaba, Mumbai',
      price: '₹1499',
      priceText: 'onwards',
      cardDAte: '07',
      cardDAte1: 'APR',
    },
    {
      mapIcon: ImagePath.upcoming_Evn_Img1,
      title: 'Runaway',
      singerName: 'By Arijit Singh',
      barLocation: 'Colaba, Mumbai',
      price: '₹1499',
      priceText: 'onwards',
      cardDAte: '07',
      cardDAte1: 'APR',
    },

    {
      mapIcon: ImagePath.upcoming_Evn_Img2,
      title: 'Sweetener',
      singerName: 'By Ariana Grande',
      barLocation: 'Colaba, Mumbai',
      price: '₹1499',
      priceText: 'onwards',
      cardDAte: '07',
      cardDAte1: 'APR',
    },
    {
      mapIcon: ImagePath.upcoming_Evn_Img3,
      title: 'Red',
      singerName: 'By Taylor Swift',
      barLocation: 'Colaba, Mumbai',
      price: '₹1499',
      priceText: 'onwards',
      cardDAte: '07',
      cardDAte1: 'APR',
    },
    {
      mapIcon: ImagePath.upcoming_Evn_Img4,
      title: 'Happier Than Ever',
      singerName: 'By Billie Eilish',
      barLocation: 'Colaba, Mumbai',
      price: '₹1499',
      priceText: 'onwards',
      cardDAte: '07',
      cardDAte1: 'APR',
    },
  ]);
  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: hp(3)}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ArtistPlayingDetail');
          }}
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
          <View
            style={{
              height: 39,
              width: 32,
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
              {item.cardDAte}
            </Text>
            <Text
              style={{
                color: '#666666',
                textAlign: 'center',
                fontFamily: FONTS.AxiformaRegular,
                fontSize: 12,
              }}>
              {item.cardDAte1}
            </Text>
          </View>
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <Text style={styles.listinhHeading}>{item.title}</Text>
            <Text style={[styles.singerName]}>{item.singerName}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.listinhText1, {}]}>{item.barLocation}</Text>
              <View style={{marginTop: -10, alignItems: 'center'}}>
                <Text
                  style={[
                    styles.listinhHeading1,
                    {
                      fontSize: 12,
                      fontFamily: FONTS.AxiformaMedium,
                      color: COLORS.black,
                    },
                  ]}>
                  {item.price}
                </Text>
                <Text
                  style={[
                    styles.listinhText,
                    {marginTop: 0, fontFamily: FONTS.AxiformaRegular},
                  ]}>
                  {item.priceText}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const EventListingData = [
    {
      mapIcon: ImagePath.Nucleya_Event,
      title: 'Arambh ft. Nucleya',
      date: 'Fri, 09 Apr',
      time: '02:00 PM - 10:00 PM',
      location: 'Gomti Nagar, Lucknow',
      price: '₹1499',
      priceText: 'onwards',
    },
    {
      mapIcon: ImagePath.Nucleya_Event1,
      title: 'The Math ft. Dua',
      date: 'Fri, 09 Apr',
      time: '02:00 PM - 10:00 PM',
      location: 'Gomti Nagar, Lucknow',
      price: '₹1499',
      priceText: 'onwards',
    },
    {
      mapIcon: ImagePath.Nucleya_Event,
      title: 'Night L. ft. Divine',
      date: 'Fri, 09 Apr',
      time: '02:00 PM - 10:00 PM',
      location: 'Gomti Nagar, Lucknow',
      price: '₹1499',
      priceText: 'onwards',
    },
  ];
  const eventRenderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '50%', marginBottom: hp(3)}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ArtistDetail');
          }}
          style={{
            marginLeft: 15,
            marginRight: index == 2 ? 15 : 0,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <Image
            style={{
              height: hp(22),
              width: '100%',
              resizeMode: 'cover',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={item.mapIcon}
          />
          <View style={{padding: wp(3)}}>
            <Text style={[styles.listinhHeading1, {marginBottom: hp(1)}]}>
              {item.title}
            </Text>
            <Text style={styles.listinhText}>{item.date}</Text>
            <Text style={styles.listinhText}>{item.time}</Text>
            <Text style={styles.listinhText}>{item.location}</Text>
            <Text style={[styles.listinhHeading1, {marginTop: hp(2)}]}>
              {item.price}
            </Text>
            <Text style={[styles.listinhText, {marginTop: 0}]}>
              {item.priceText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
            searchIcon={ImagePath.searchIcon}
            placeholder="Search"
            iconHeight={12}
            iconWidth={18}
            profileIcon={ImagePath.profilePic}
          />
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <View style={{}}>
              <Text style={styles.cardText}>Events near me</Text>
            </View>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          <SafeAreaView>
            <FlatList
              horizontal
              data={EventListingData}
              renderItem={eventRenderItem}
            />
          </SafeAreaView>
          <View style={[styles.hedingTextMain, {}]}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <View style={{}}>
              <Text
                style={[
                  styles.cardText,
                  {fontSize: 16, fontFamily: FONTS.AxiformaMedium},
                ]}>
                UPCOMING EVENTS IN TOWN
              </Text>
            </View>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          <SafeAreaView>
            <FlatList
              data={ENTRIES1}
              renderItem={_renderItem}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={fetchMoreData}
            />
          </SafeAreaView>
        </ScrollView> */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <View style={{}}>
              <Text style={styles.cardText}> Coming Soon </Text>
            </View>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default EventListing;
const styles = StyleSheet.create({
  //event
  singerName: {
    fontSize: 12,
    marginVertical: hp(0.5),
    fontFamily: FONTS.AxiformaBold,
    color: '#575757',
  },
  hedingTextMain: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  hedingImg: {width: wp(30), resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaSemiBold,
    fontSize: 20,
    color: 'rgba(32, 32, 32, 1)',
  },

  listinhHeading1: {
    fontSize: 16,
    fontFamily: FONTS.AxiformaSemiBold,
    color: '#202020',
  },
  listinhText: {
    fontSize: 12,
    fontFamily: FONTS.AxiformaSemiBold,
    color: '#575757',
    marginTop: hp(0.5),
  },

  listinhHeading: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaSemiBold,
    color: COLORS.black,
  },
  listinhText1: {
    fontSize: 14,
    fontFamily: FONTS.RobotoMedium,
    color: '#5B5959',
  },
});
