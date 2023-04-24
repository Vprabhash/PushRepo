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
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistDetail = props => {
  const [artistList, setArtistList] = useState();
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      clubsNearbyDataApi(page);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    // clubsNearbyDataApi(page);
    // console.log('Page', page);
  }, [page]);

  const clubsNearbyDataApi = async page => {
    console.log('------page :', page);
    try {
      const res = await ApiCall(`api/artists?page=${page}`, 'GET');
      console.log('---resartists--->', res.data);
      if (Array.isArray(res?.data)) {
        if (page === 1) {
          setArtistList(res?.data);
        } else {
          setArtistList([...artistList, ...res?.data]);
        }
      } else {
        Toast.show('Something went wrong', Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      Toast.show(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setLoading(false);
    }
  };
  const fetchMoreData = () => {
    // clubsNearbyDataApi(page + 1);
    if (!onEndReachedCalledDuringMomentum) {
      setLoading(true);
      setPage(page + 1);
      setonEndReachedCalledDuringMomentum(true);
    }
  };
  const renderFooter = () => {
    return loading ? (
      <View style={{paddingTop: 50, paddingBottom: 130}}>
        <ActivityIndicator
          color={COLORS.primary}
          size={'small'}
          style={{marginLeft: 8}}
        />
      </View>
    ) : null;
  };

  const artistListRenderItem = ({item, index}) => {
    console.log('---item---', item?.media);
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ArtistEventDetail', {
                artistListDetail: item,
              });
            }}
            activeOpacity={0.7}>
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
          </TouchableOpacity>

          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <View>
              <Text style={styles.listinhHeading}>{item?.name}</Text>
            </View>
            <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
              {item.musicGenre}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <Text style={{color: '#000', textAlign: 'center', marginTop: 50}}>
        No Data Found
      </Text>
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
          titalTwo="Artist"
          iconHeight={13}
          iconWidth={30}
          onclick={() => {
            props.navigation.goBack();
          }}

          //  profileIcon={ImagePath.profilePic}
        />
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1, flex: 1}}>
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
          {/* <SafeAreaView> */}
          <FlatList
            data={artistList}
            renderItem={artistListRenderItem}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
              // console.log('----rechBegin');
            }}
            onEndReached={fetchMoreData}
            ListEmptyComponent={EmptyListMessage}
          />
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
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },
  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
});
