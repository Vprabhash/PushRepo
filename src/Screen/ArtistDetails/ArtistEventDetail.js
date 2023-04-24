import React, {useEffect, useState, useRef} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper';
import MenuCard from '../../Components/MenuCard';
import {COLORS, FONTS} from '../../Components/constants';
import ApiCall from '../../redux/CommanApi';
import ImageView from 'react-native-image-viewing';
import Helper from '../../Components/Helper';
import Header from '../../Components/Header';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ArtistEventDetail = props => {
  const [clubsNearby, setClubNearby] = useState([]);
  const detailData = props?.route?.params?.artistListDetail;

  return (
    <View style={{flex: 1}}>
      {/* <View style={{marginTop: 50, marginBottom: 10}}></View> */}
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
          <View style={{flex: 1, width: '100%', marginTop: hp(3)}}>
            <View
              style={{
                marginHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                elevation: 4,
              }}>
              <TouchableOpacity activeOpacity={0.7}>
                {detailData?.images ? (
                  <Image
                    style={{
                      height: hp(29),
                      width: '100%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: detailData?.images[0],
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
                  <Text style={styles.listinhHeading}>{detailData?.name}</Text>
                </View>
                <Text style={[styles.listingText, {marginVertical: hp(0.3)}]}>
                  {detailData.musicGenre}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    Linking.openURL(detailData?.instagramLink);
                  }}
                  style={[
                    styles.btnmain,
                    {borderBottomLeftRadius: 10, marginRight: 1},
                  ]}>
                  <LinearGradient
                    style={{
                      // height: 24,
                      // width: 40,
                      // borderRadius: 5,
                      // justifyContent: 'center',
                      backgroundColor: 'red',
                      alignItems: 'center',
                    }}
                    start={{x: 1, y: 0}}
                    colors={['red', 'red']}>
                    <Image
                      style={[styles.btnIcon, {height: 14, width: 14}]}
                      source={ImagePath.Instagram}
                    />
                  </LinearGradient>
                  <Text style={[styles.buttonText, {}]}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    Linking.openURL(detailData?.youtubeChannelLink);
                  }}
                  style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
                  <Image style={styles.btnIcon} source={ImagePath.youtube} />
                  <Text style={[styles.buttonText, {}]}>YouTube</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
export default ArtistEventDetail;
const styles = StyleSheet.create({
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
  btnmain: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#202020',
    borderWidth: 1,
    height: hp('6.5%'),
    borderColor: '#000',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.white,
    // letterSpacing: 0.3,
  },
  btnIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
});
