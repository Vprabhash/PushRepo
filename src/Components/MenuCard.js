import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import ImagePath from '../assets/ImagePath';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from './constants';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const MenuCard = ({navigation, itemdata}, props) => {
  console.log('==itemdatamenu----', itemdata);
  const MenuData = [
    {
      menuIcon: ImagePath.watchIcon,
      menuTitle: 'Mon-Fri',
      menuTitleText: itemdata?._doc?.timings,
      menuIcon1: ImagePath.menuUser,
      menuTitle1: '₹ 2000',
      menuTitleText1: itemdata?._doc?.averageCost2People,
    },
    {
      menuIcon: ImagePath.menuUser1,
      menuTitle: 'Fri, Sat',
      menuTitleText: itemdata?._doc?.timings,
      menuIcon1: ImagePath.menuUser2,
      menuTitle1: 'VEG & NON-VEG',
      menuTitleText1: itemdata?._doc?.vegNonVeg,
    },
    {
      menuIcon: ImagePath.menuUser3,
      menuTitle: 'POP, BLUES, EDM',
      menuTitleText: itemdata?._doc?.musicGenre,
      menuIcon1: ImagePath.doneIcon,
      menuTitle1: 'Stags ',
      menuTitleText1: itemdata?._doc?.stagsAllowed,
    },
    {
      menuIcon: ImagePath.doneIcon,
      menuTitle: 'Sheesha',
      menuIcon1: ImagePath.menuUser4,
      menuTitle1: 'Kids Friendly',
      menuTitleText1: itemdata?._doc?.kidsFriendly,
    },
  ];
  const MenuDataRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          marginBottom: index == 1 ? 11 : 0,
          marginTop: index == 3 ? 22 : 11,
          // paddingLeft: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            flex: 0.45,
            alignItems: 'center',
          }}>
          <Image style={styles.menuIconCss} source={item.menuIcon} />
          <View>
            <Text style={styles.menuText}>{item.menuTitle}</Text>
            {item.menuTitleText && (
              <Text style={styles.menuText2}>{item.menuTitleText}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 20,
            flex: 0.45,
            alignItems: 'center',
          }}>
          <Image style={styles.menuIconCss} source={item.menuIcon1} />
          <View>
            <Text style={styles.menuText}>{item.menuTitle1}</Text>
            {item.menuTitleText1 && (
              <Text style={styles.menuText2}>{item.menuTitleText1}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        elevation: 4,
        borderRadius: 10,
      }}>
      <SafeAreaView>
        <FlatList data={MenuData} renderItem={MenuDataRenderItem} />
      </SafeAreaView>
      <View style={{flexDirection: 'row', marginTop: hp(4)}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL(
              'google.navigation:q=100+101' + itemdata?._doc?.googleMapLink,
            );
          }}
          style={[styles.btnmain, {borderBottomLeftRadius: 10}]}>
          <Image style={styles.btnIcon} source={ImagePath.direction} />
          <Text style={[styles.buttonText, {}]}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL(
              'http://api.whatsapp.com/send?phone=91' +
                itemdata?._doc?.whatsappNumber,
            );
          }}
          style={[styles.btnmain, {marginHorizontal: 1}]}>
          <Image style={styles.btnIcon} source={ImagePath.WhatsApp} />
          <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            alert('ok');
            Linking.openURL('tel:' + itemdata?._doc?.phoneNumber);
          }}
          style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
          <Image style={styles.btnIcon} source={ImagePath.callIcon} />
          <Text style={[styles.buttonText, {}]}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  menuIconCss: {height: 20, width: 20, resizeMode: 'contain'},
  menuText: {
    color: '#5B5959',
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    marginLeft: hp(1.6),
  },
  menuText2: {
    color: '#BBBBBB',
    fontSize: 12,
    fontFamily: FONTS.RobotoRegular,
    marginLeft: hp(1.6),
  },
  //btn
  btnmain: {
    flexDirection: 'row',
    flex: 0.4,
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
  btnIcon: {height: 16, width: 16, resizeMode: 'contain'},
});
export default MenuCard;
