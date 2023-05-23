import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../../Components/constants';
import Header from '../../Components/Header';
import Toast from 'react-native-simple-toast';

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
                  {detailData?.musicGenre}
                </Text>
                <Text
                  style={[
                    styles.listingText,
                    {marginVertical: hp(0.3), textTransform: 'uppercase'},
                  ]}>
                  {detailData?.type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                {  detailData?.instagramLink? (
                    <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (detailData?.instagramLink) {
                        Linking.openURL(detailData?.instagramLink);
                      } else {
                        Toast.showWithGravity(
                          'Instagram link is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[
                      styles.btnmain,
                      {borderBottomLeftRadius: 10, marginRight: 1},
                    ]}>
                    <Image style={styles.btnIcon} source={ImagePath.Instagram} />
                    <Text style={styles.buttonText}>Instagram</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (detailData?.instagramLink) {
                        Linking.openURL(detailData?.instagramLink);
                      } else {
                        Toast.showWithGravity(
                          'Instagram link is not available',
                          Toast.LONG,
                          Toast.BOTTOM,
                        );
                      }
                    }}
                    style={[
                      styles.btnmainDisabled,
                      {borderBottomLeftRadius: 10, marginRight: 1},
                    ]}>
                    <Image style={styles.btnIconDisabled} source={ImagePath.InstagramDisabled} />
                    <Text style={styles.buttonText}>Instagram</Text>
                  </TouchableOpacity>
                ) }  
                

                { detailData?.youtubeChannelLink? (
                   <TouchableOpacity
                   activeOpacity={0.7}
                   onPress={() => {
                     if (detailData?.youtubeChannelLink) {
                       Linking.openURL(detailData?.youtubeChannelLink);
                     } else {
                       Toast.showWithGravity(
                         'Youtube link is not available',
                         Toast.LONG,
                         Toast.BOTTOM,
                       );
                     }
                   }}
                   style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
                   <Image style={styles.btnIcon} source={ImagePath.youtube} />
                   <Text style={styles.buttonText}>YouTube</Text>
                 </TouchableOpacity> 
                ) : (
                  <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (detailData?.youtubeChannelLink) {
                      Linking.openURL(detailData?.youtubeChannelLink);
                    } else {
                      Toast.showWithGravity(
                        'Youtube link is not available',
                        Toast.LONG,
                        Toast.BOTTOM,
                      );
                    }
                  }}
                  style={[styles.btnmainDisabled, {borderBottomRightRadius: 10}]}>
                  <Image style={styles.btnIconDisabled} source={ImagePath.youtubeDisabled} />
                  <Text style={styles.buttonText}>YouTube</Text>
                </TouchableOpacity>
                )  }
                
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
  btnmainDisabled: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#a1a1a1',
    borderWidth: 1,
    height: hp('6.5%'),
    borderColor: '#a1a1a1',
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
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  btnIconDisabled: {
    height: 16,
    width: 16,
    resizeMode: 'contain'
  },
});
