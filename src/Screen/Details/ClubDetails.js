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
  Modal,
  TextInput,
  View,
  Linking,
  TouchableOpacity,
  Alert,
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
import ApiCall from '../../redux/CommanApi';
import {LetLong} from '../../services/Apis';

import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import Helper from '../../Components/Helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ClubDetails = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibletwo, setModalVisibletwo] = useState(false);
  // letLeng
  console.log('+++++++++((((((((-----', Helper.location);
  // console.log(
  //   '--ClubDetails--=----',
  //   props.route.params.listDetail?.menu,
  // );
  const detailData = props?.route?.params?.listDetail;

  const ENTRIES1 = [
    {
      mapIcon: ImagePath.upcoming_Evn_Img,
      title: 'Fabulous friday',
      singerName: 'by ',
      singerNameIcon: ImagePath.Explore,
      musicIcon: ImagePath.menuUser3,
      musicText: 'Bollywood, Commercial',
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, width: '100%', marginBottom: 31}}>
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
              <Text style={[styles.singerName]}>
                {item.singerName}
                <Text
                  style={[
                    styles.singerName,
                    {textDecorationLine: 'underline'},
                  ]}>
                  AVGSS Group
                </Text>
              </Text>
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
  const ClubNarDataApi = async () => {
    const res = await ApiCall(
      `api/nearby-clubs?coordinates=${Helper.location?.latitude},${Helper.location?.longitude}`,
      'GET',
    );
    // setENTRIES1(res.data);
    console.log('---res--club ClubNarData--artist---', res.data);
  };
  useEffect(() => {
    ClubNarDataApi();
  }, []);
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
  const [BeverageData, setBeverageData] = useState(
    detailData?.media?.drinkMenuImages,
  );
  const BeverageDataRender = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}} horizontal>
        <View style={{marginRight: 15}}>
          {item && (
            <Image
              style={{
                height: hp(22),
                width: wp(50),
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={{
                uri: item,
                //  detailData?.media?.drinkMenuImages[0],
              }}
            />
          )}
          {/* <Text style={styles.titleText}>menu</Text> */}
        </View>
      </View>
    );
  };
  const [manuRenderData, setManuRenderData] = useState(
    detailData?.media?.foodMenuImages,
  );

  const manuRender = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}} horizontal>
        <View style={{marginRight: 15}}>
          {item && (
            <Image
              style={{
                height: hp(20),
                width: wp(50),
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={{
                uri: item,
                //  detailData?.media?.drinkMenuImages[0],
              }}
            />
          )}
          {/* <Text style={styles.titleText}>menu</Text> */}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={[styles.inputMain, {marginTop: 50}]}>
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
          <Swiper
            autoplay={true}
            autoplayTimeout={4}
            style={[styles.wrapper]}
            containerStyle={{
              borderRadius: 8,
              marginTop: 26,
              marginHorizontal: 15,
              overflow: 'hidden',
            }}
            paginationStyle={{
              bottom: hp(0),
              zIndex: 9,
              backgroundColor: '#C9C9C9',
              borderRadius: 20,
              height: 18,
              marginHorizontal: '40%',
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
            {detailData?.media?.ambienceImages.length ? (
              detailData?.media?.ambienceImages?.map(item => (
                <View style={styles.slide}>
                  <Image style={styles.slideImg} source={{uri: item}} />
                </View>
              ))
            ) : (
              <View />
            )}
          </Swiper>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
              marginHorizontal: 15,
            }}>
            <View style={{marginTop: -5.5}}>
              <Text
                style={{
                  color: '#202020',
                  fontSize: 20,
                  fontFamily: FONTS.AxiformaBold,
                }}>
                {detailData?.name}
              </Text>
              <Text
                style={{
                  color: '#5B5959',
                  fontSize: 14,
                  fontFamily: FONTS.RobotoMedium,
                }}>
                Restobar
              </Text>
            </View>

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
              start={{x: 0.3, y: 0.5}}
              colors={['rgba(189, 12, 189, 1)', 'rgba(21, 154, 201, 1)']}>
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
                {detailData?.zomatoRating}
              </Text>
            </LinearGradient>
          </View>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 22,
              marginTop: 9,
              color: COLORS.black,
              marginHorizontal: 15,
              marginTop: 20,
              fontFamily: FONTS.HankenGroteskReglur,
            }}>
            {detailData?.address}
          </Text>
          <Text style={styles.aboutText}>About the Club</Text>
          <MenuCard itemdata={detailData} />

          {/* <Text style={styles.aboutText}>Whats Happening Today </Text>

          <View style={{marginHorizontal: 0}}>
            <FlatList data={ENTRIES1} renderItem={_renderItem} />
          </View> */}
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
            <LinearGradient
              style={{
                height: 43,
                width: 176,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
              }}
              start={{x: 0.4, y: 0}}
              // start={{x: 0.1, y: 0}}
              // end={{x: 1.1, y: 0.9}}
              colors={['rgba(189, 12, 189, 1)', 'rgba(21, 154, 201, 1)']}>
              <Text
                style={{
                  fontFamily: FONTS.AxiformaBlack,
                  color: '#FFFFFF',
                  fontSize: 14,
                }}>
                Events for the month
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={[styles.aboutText, {marginTop: 31}]}>Menu</Text>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FlatList
                    horizontal={true}
                    data={BeverageData}
                    renderItem={BeverageDataRender}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CustomButton
                      onclick={() => {
                        setModalVisible(!modalVisible);
                      }}
                      title="Cancel"
                      flex={1}
                      bgColor="#fff"
                      textColor="#000000"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <ScrollView style={{flexDirection: 'row'}} horizontal>
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image
                  style={{
                    height: hp(20),
                    width: wp(44),
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{uri: detailData?.media?.drinkMenuImages[0] || ''}}
                />
              </TouchableOpacity>
              <Text style={styles.titleText}>Beverages</Text>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibletwo}
              onRequestClose={() => {
                setModalVisibletwo(!modalVisibletwo);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FlatList
                    horizontal={true}
                    data={manuRenderData}
                    renderItem={manuRender}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CustomButton
                      onclick={() => {
                        setModalVisibletwo(!modalVisibletwo);
                      }}
                      title="Cancel"
                      flex={1}
                      bgColor="#fff"
                      textColor="#000000"
                    />
                    {/* <CustomButton
                      onclick={() => {
                        setModalVisible(!modalVisible);
                      }}
                      flex={0.47}
                      title="ok"
                      borderColor="#000"
                      bgColor="#fff"
                      textColor="#000"
                    /> */}
                  </View>
                </View>
              </View>
            </Modal>
            <View style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibletwo(true);
                }}>
                <Image
                  style={{
                    height: hp(20),
                    width: wp(44),
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{uri: detailData?.media?.foodMenuImages[0] || ''}}
                />
              </TouchableOpacity>
              <Text style={styles.titleText}>Food</Text>
            </View>
          </ScrollView>
          <Text style={[styles.aboutText]}>Clubs Nearby </Text>
          <FlatList
            horizontal={true}
            data={ClubNarData}
            renderItem={ClubNarDatarenderItem}
          />
        </ImageBackground>
      </ScrollView>
      {/* <FlatList
              horizontal={true}
              data={Tabs}
              renderItem={_renderItem}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={fetchMoreData}
            /> */}
    </View>
  );
};
export default ClubDetails;
const styles = StyleSheet.create({
  // modal css
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    width: wp(100),
    height: hp(30),
    // backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //

  aboutText: {
    color: '#202020',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: FONTS.AxiformaBold,
  },
  wrapper: {height: 223},
  slide: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImg: {
    resizeMode: 'cover',
    borderRadius: 8,
    width: '100%',
    height: 200,
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

  listinhHeading: {
    fontSize: 24,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
});
