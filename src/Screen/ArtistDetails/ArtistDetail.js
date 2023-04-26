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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';
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
  const [valuekey, setValuekey] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      clubsNearbyDataApi(1);
      setValuekey('');
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    clubsNearbyDataApi(page);
    console.log('Page', page);
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
  const searchApi = async text => {
    const res = await ApiCall(`api/search?q=${text}`, 'GET');
    console.log('---searchApi--->', JSON.stringify(res?.data.artists));
    setArtistList(res?.data.artists);
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
      <View style={{paddingTop: 50, paddingBottom: 10}}>
        <ActivityIndicator
          color={COLORS.primary}
          size={'small'}
          style={{marginLeft: 8}}
        />
      </View>
    ) : null;
  };

  const artistListRenderItem = ({item, index}) => {
    console.log('---item---', item);
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
  const [searchValue, setSearchValue] = useState('');
  const EmptyListMessage = () => {
    return <Text style={styles.titleText}>No Data Found</Text>;
  };
  return (
    <View style={{flex: 1}}>
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
        <View style={[styles.inputMain, {marginVertical: 20}]}>
          <TextInput
            style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            placeholder={'Search artists'}
            onChangeText={text => {
              searchApi(text), setValuekey(text);
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
        <TouchableOpacity
          style={styles.fllter}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('FilterScreen');
          }}>
          <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
          <Text style={styles.filtersText}>Filters</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{flexGrow: 1, flex: 1}}>
          <FlatList
            data={artistList}
            renderItem={artistListRenderItem}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={fetchMoreData}
            ListEmptyComponent={EmptyListMessage}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default ArtistDetail;
const styles = StyleSheet.create({
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
    elevation: 9,
    width: wp(23),
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    height: hp(4),
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
    tintColor: '#000000',
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
