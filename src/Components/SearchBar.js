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
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';
import ApiCall from '../redux/CommanApi';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SearchBar = props => {
  const [clubs, setClubs] = useState();

  useEffect(() => {
    searchApi();
    setValuekey();
  }, []);

  const [valuekey, setValuekey] = useState('');
  const searchApi = async text => {
    if (valuekey) {
      const res = await ApiCall(`api/search?q=${valuekey}`, 'GET');
      console.log('---searchApi--->', JSON.stringify(res?.data?.clubs));
      let temArray = [];
      let clubs = res?.data?.clubs;
      let artist = res?.data?.artists;
      temArray = clubs.concat(artist);
      setClubs(temArray);
      console.log('--------temArray: ', temArray);
    } else {
      //   setPage(1);
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
              if (item.type) {
                props.navigation.navigate('ArtistEventDetail', {
                  artistListDetail: item,
                });
              } else {
                props.navigation.navigate('ClubDetails', {listDetail: item});
              }
            }}
            activeOpacity={0.7}>
            {item?.media?.ambienceImages ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
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
              {item?.zomatoRating && (
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
              )}
            </View>
            {/* {item.type == 'dj' && ( */}
            {item?.cost && (
              <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
                Restrobar
              </Text>
            )}
            {/* )} */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {item.musicGenre ? (
                <Text style={styles.listingText}>{`${item?.musicGenre}`}</Text>
              ) : (
                <Text style={styles.listingText}>
                  {`${item?.locality}, ${item?.city}`}
                </Text>
              )}
              {item?.cost && (
                <Text style={styles.listingText} numberOfLines={1}>
                  ₹{item?.cost}
                </Text>
              )}
            </View>
          </View>
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
        <View style={{marginHorizontal: 5, marginTop: 50}}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{marginLeft: 5}}>
              <Image
                style={{
                  height: 16,
                  width: 20,
                  resizeMode: 'contain',
                }}
                source={ImagePath.goBack}
              />
            </TouchableOpacity>
            <View style={[styles.inputMain]}>
              <TextInput
                style={[styles.textInput, {color: 'rgba(0, 0, 0, 0.7)'}]}
                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                placeholder={'Search'}
                onChangeText={text => {
                  // searchApi(text)
                  setValuekey(text);
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
          </View>
          <FlatList
            data={clubs}
            renderItem={_renderItem}
            onEndReachedThreshold={0.3}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default SearchBar;
const EmptyListMessage = () => {
  return <Text style={styles.noDataText}>No Data Found</Text>;
};
const styles = StyleSheet.create({
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
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp(5),
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
    flex: 1,
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
});
