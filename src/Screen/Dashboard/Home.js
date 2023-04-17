import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import ImagePath from '../../assets/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import {COLORS, FONTS} from '../../Components/constants';
import {useDispatch} from 'react-redux';
import {spotLightApi} from '../../redux/reducers/spotLightSlice';
import {artistApi} from '../../redux/reducers/artistSlice';
import {LocationApi} from '../../redux/reducers/clubLocationSlice';
// import { upComingEventApi } from '../../redux/reducers/UpComingEventSlice';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Home = props => {
  const dispatch = useDispatch();

  const spotLightList = async () => {
    const data = await dispatch(spotLightApi()).then(data => {
      console.log('------spotLightList data--------', data.payload.movies);
    });
  };
  const clubLocationList = async () => {
    const data = await dispatch(LocationApi()).then(data => {
      console.log('------clubLocationList data--------', data.payload.movies);
    });
  };
  const artistList = async () => {
    const data = await dispatch(artistApi()).then(data => {
      console.log('------artistList data--------', data.payload.movies);
    });
  };
  // const UpComingEventList = async () => {
  //   const data = await dispatch(upComingEventApi()).then(data => {
  //     console.log('------UpComingEventList data--------', data.payload.movies);
  //   });
  // };
  useEffect(() => {
    spotLightList();
    clubLocationList();
    artistList();
    // UpComingEventList();
  }, []);

  const ENTRIES1 = [
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail Bar'},
    {mapIcon: ImagePath.clubLocation, title: 'Nightclub'},
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail'},
    {mapIcon: ImagePath.clubLocation, title: 'Nightclub'},
    {mapIcon: ImagePath.listTwoImg, title: 'Cocktail'},
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View style={{}}>
        <Image
          style={{
            marginRight: index == 4 ? 15 : 0,
            height: hp(20),
            width: wp(50),
            marginLeft: 15,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.mapIcon}
        />
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
    );
  };
  const DATA = [
    {Bar_Icon: ImagePath.listImg},
    {Bar_Icon: ImagePath.artistImg},
    {Bar_Icon: ImagePath.artistImg1},
    {Bar_Icon: ImagePath.listImg},
    {Bar_Icon: ImagePath.artistImg},
  ];
  const renderItem = ({item, index}) => (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{
          marginRight: index == 4 ? 15 : 0,
          height: hp(20),
          width: wp(29),
          marginLeft: 15,
          resizeMode: 'contain',
        }}
        source={item.Bar_Icon}
      />
    </View>
  );

  const UpcomingData = [
    {
      mapIcon: ImagePath.eventImg,
      button: 'CONCERT',
      Name: 'Darshan Raval',
      icon: ImagePath.location,
      Location: '10 Downing Street, Near Bombay hospital',
    },
    {
      mapIcon: ImagePath.eventImg1,
      button: 'CONCERT',
      Name: 'Divine',
      icon: ImagePath.location,
      Location: '10 Downing Street, Near Bombay hospital',
    },
  ];

  const UpcomingData_RenderItem = ({item, index}) => {
    return (
      <View style={{}}>
        <Image
          style={{
            marginLeft: 15,
            marginRight: index == 1 ? 15 : 0,
            height: hp(20),
            width: wp(50),
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.mapIcon}
        />
        <View style={{position: 'absolute', left: 27, bottom: 9}}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: '#5B5959',
              alignSelf: 'flex-start',
              paddingHorizontal: wp(3),
              paddingVertical: wp(1),
            }}>
            <Text
              style={[
                {
                  color: COLORS.white,
                  fontSize: 7,
                  fontFamily: FONTS.RobotoMedium,
                },
              ]}>
              {item.button}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.white,
              fontFamily: FONTS.RobotoBold,
              marginVertical: hp(1.5),
            }}>
            {item.Name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 10,
                width: 10,
                tintColor: 'rgba(255, 175, 175, 1)',
                resizeMode: 'contain',
              }}
              source={item.icon}
            />
            <Text
              style={[
                {
                  fontSize: 8,
                  color: COLORS.white,
                  marginLeft: 3,
                  fontFamily: FONTS.RobotoBold,
                },
              ]}>
              {item.Location}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const SpotlightData = [
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
    {
      mapIcon: ImagePath.slider_img,
      button: 'Get 20% off on Drinks',
      Name: 'Azzir Events',
      Location: 'Sector 52, Near Ahuja Tower',
    },
  ];

  const SpotlightData_RenderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: wp(2.5),
          marginRight: index == 0 ? 15 : 15,
          marginLeft: index == 0 ? 15 : 0,
        }}>
        <Image
          style={{
            height: hp(26),
            width: wp(83),
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={item.mapIcon}
        />
        <View style={{position: 'absolute', left: 15, bottom: 30}}>
          <Text
            style={[
              {color: COLORS.white, fontSize: 12, fontFamily: FONTS.PTBold},
            ]}>
            {item.button}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.white,
              fontFamily: FONTS.PTItalic,
            }}>
            {item.Name}
          </Text>
          <Text
            style={[
              {
                fontSize: 10,
                color: COLORS.white,
                marginLeft: 3,
                fontFamily: FONTS.PTBold,
              },
            ]}>
            {item.Location}
          </Text>
        </View>
      </View>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={ImagePath.Azzir_Bg}
        resizeMode="cover"
        style={{height: '100%'}}>
        <View style={{marginHorizontal: 15, marginTop: 46, marginBottom: 14}}>
          <Header
            Back_Arrow={ImagePath.manueIcon}
            tital="Near me"
            titalTwo="Sector 52, Noida, UP 435464"
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

          <View style={[styles.inputMain, {marginTop: 10}]}>
            <TextInput
              style={[styles.textInput, {}]}
              placeholder={'Search near you'}
              placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
              // onChangeText={onChangeText}
              // value={value}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                ('');
              }}>
              <Image source={ImagePath.searchIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          {/* // modal */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      height: 2,
                      marginTop: 10,
                      width: wp(16),
                      backgroundColor: '#000',
                      alignSelf: 'center',
                    }}></View>
                  <View
                    style={[
                      styles.textModal,
                      {borderBottomWidth: 1, paddingBottom: hp(3)},
                    ]}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Sort By
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        ('');
                      }}>
                      <Text style={{color: 'red'}}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Top Rated</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {tintColor: 'red'}]}
                        source={ImagePath.redioRed}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Rating High to Low</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {}]}
                        source={ImagePath.redio}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Nearest</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {}]}
                        source={ImagePath.redio}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Event</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {}]}
                        source={ImagePath.redio}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Artist</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {}]}
                        source={ImagePath.redio}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.textModal, {}]}>
                    <Text style={styles.redioText}>Distance</Text>
                    <TouchableOpacity>
                      <Image
                        style={[styles.redioImg, {}]}
                        source={ImagePath.redio}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp(3),
                    }}>
                    <CustomButton
                      onclick={() => {
                        setModalVisible(!modalVisible);
                      }}
                      title="Cancel"
                      flex={0.47}
                      bgColor="#fff"
                      textColor="#000000"
                    />
                    <CustomButton
                      onclick={() => {
                        props.navigation.navigate('Login');
                      }}
                      flex={0.47}
                      title="Submit"
                      borderColor="#000"
                      bgColor="#000"
                      textColor="#FAFAFA"
                    />
                  </View>
                </View>
              </View>
            </Modal>
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

          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <Text style={styles.cardText}>IN THE SPOTLIGHT</Text>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>

          <SafeAreaView>
            <FlatList
              horizontal={true}
              data={SpotlightData}
              renderItem={SpotlightData_RenderItem}
            />
          </SafeAreaView>

          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <Text style={styles.cardText}>THE CLUB NEARBY YOUR LOCATION </Text>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          <SafeAreaView style={{}}>
            <FlatList
              horizontal={true}
              data={ENTRIES1}
              renderItem={_renderItem}
            />
          </SafeAreaView>
          <SafeAreaView>
            <View style={styles.hedingTextMain}>
              <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
              <Text style={styles.cardText}>ARTIST PLAYING NEARBY </Text>
              <Image style={styles.hedingImg} source={ImagePath.rightLine} />
            </View>

            <FlatList horizontal={true} data={DATA} renderItem={renderItem} />
          </SafeAreaView>
          <TouchableOpacity
            style={[
              styles.fllter,
              {
                width: wp(33),
                elevation: 0,
                alignSelf: 'center',
                backgroundColor: 'transparent ',
                borderWidth: 1,
                borderRadius: 20,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => {
              ('');
            }}>
            <Text style={[styles.filtersText, {fontFamily: FONTS.RobotoBold}]}>
              Explore More
            </Text>
            <Image
              source={ImagePath.arrowRight}
              style={[styles.iconStyle, {width: 10, height: 8}]}
            />
          </TouchableOpacity>
          <View style={styles.hedingTextMain}>
            <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
            <Text style={styles.cardText}>UP COMING EVENTS</Text>
            <Image style={styles.hedingImg} source={ImagePath.rightLine} />
          </View>
          <SafeAreaView style={{marginBottom: 20}}>
            <FlatList
              horizontal={true}
              data={UpcomingData}
              renderItem={UpcomingData_RenderItem}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  hedingTextMain: {
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hedingImg: {width: '30%', resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
  },

  // modal css
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    width: wp(100),
    height: hp(65),
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
  redioText: {color: COLORS.black},
  textModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  redioImg: {height: 15, width: 15, tintColor: COLORS.black},

  button: {
    height: 60,
    // width: '100%', alignSelf: 'center',marginVertical: 5,padding:10,backgroundColor: 'pink',
  },

  inputMain: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 16,
    marginHorizontal: 15,
    borderRadius: 30,
    paddingHorizontal: wp(4),
    height: hp(6),
  },
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
    marginTop: hp(5),
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: wp(4),
    height: hp(4),
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
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
    fontSize: 14,
    marginTop: hp(1),
  },
  iconStyle: {
    tintColor: COLORS.black,
    width: 16,
    resizeMode: 'contain',
    height: 16,
  },
});
