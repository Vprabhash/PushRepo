import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ClubListing = props => {
  const [clubs, setClubs] = useState();
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    list(page);
    console.log('Page', page);
  }, [page]);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      list(1);
      setSearchValue('');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);
  const list = async page => {
    try {
      const res = await ApiCall(`api/clubs?page=${page}`, 'GET');
      console.log('---res--club listin---', res.data);
      if (Array.isArray(res?.data)) {
        if (page === 1) {
          setClubs(res?.data);
          setTeamArray(res.data);
        } else {
          setClubs([...clubs, ...res?.data]);
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
  const [searchValue, setSearchValue] = useState('');
  const [teamArray, setTeamArray] = useState([]);

  const searchApi = async text => {
    // const res = await ApiCall(`api/search?q=${text}`, 'GET');
    // console.log('---searchApi--->', JSON.stringify(res));
    // setClubs(res?.data.clubs);

    if (text) {
      const newData = teamArray.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setClubs(newData);
      setSearchValue(text);
    } else {
      setClubs(teamArray);
      setSearchValue(text);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', paddingBottom: hp(3)}}>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            elevation: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClubDetails', {listDetail: item});
            }}
            activeOpacity={0.7}>
            {item?.media?.ambienceImages ? (
              <Image
                style={{
                  height: hp(29),
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: item?.media?.ambienceImages[0],
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
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              position: 'absolute',
              top: 10,
              right: 10,
            }}
            source={item.heartIcon}
          />
          <View style={{paddingHorizontal: wp(2), paddingVertical: hp(1)}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listinhHeading}>{item?.name}</Text>
              <LinearGradient
                style={{
                  flexDirection: 'row',
                  height: 24,
                  width: 40,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  alignItems: 'center',
                }}
                start={{x: 0.3, y: 0.4}}
                colors={['rgba(254, 0, 182, 1)', 'rgba(1, 172, 203, 1)']}>
                <Image
                  style={{height: 10, width: 10, tintColor: '#FFFFFF'}}
                  source={ImagePath.star}
                />
                <Text
                  style={{
                    fontFamily: FONTS.RobotoBold,
                    color: '#FFFFFF',
                    fontSize: 12,
                  }}>
                  {item?.zomatoRating || '-'}
                </Text>
              </LinearGradient>
            </View>
            <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
              Restrobar
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.listingText}>
                {`${item?.locality}, ${item?.city}`}
              </Text>
              <Text style={styles.listingText} numberOfLines={1}>
                ₹{item?.cost}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return <Text style={styles.noDataText}>No Data Found</Text>;
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View style={{marginHorizontal: 5}}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />

          <View style={[styles.inputMain, {marginTop: 50, marginBottom: 20}]}>
            <TextInput
              style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
              placeholderTextColor="rgba(0, 0, 0, 0.7)"
              placeholder={'Search clubs'}
              onChangeText={text => {
                searchApi(text);
              }}
              value={searchValue}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                // searchApi();
              }}>
              <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.fllter]}
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate('FilterScreen');
            }}>
            <Image source={ImagePath.settingIcon} style={styles.iconStyle} />
            <Text style={styles.filtersText}>Filters</Text>
          </TouchableOpacity>

          <FlatList
            data={clubs}
            renderItem={_renderItem}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              setonEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={fetchMoreData}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default ClubListing;
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
    elevation: 16,
    width: wp(23),
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    height: hp(4),
  },
  iconStyle: {
    tintColor: COLORS.black,
    width: 16,
    resizeMode: 'contain',
    height: 16,
  },
  noDataText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: hp(1),
  },
  listinhHeading: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
    width: '85%',
  },
  listingText: {
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    color: '#575757',
  },

  inputMain: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 16,
    marginHorizontal: 10,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
  },

  textInput: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 16,
    padding: 0,
    height: hp(6),
    color: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },

  titleText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    marginTop: hp(1),
  },
  iconStyle: {
    tintColor: '#000000',
    width: 16,
    resizeMode: 'contain',
    height: 16,
  },
});
