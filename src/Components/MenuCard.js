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
const MenuCard = ({navigation, itemdata, scrollToEnd}, props) => {
  console.log('==itemdatamenu----', itemdata);
  const MenuData = [
    {
      menuIcon: ImagePath.watchIcon,
      menuTitle: 'Timings',
      menuTitleText: itemdata?.timings || 'N/A',
    },
    {
      menuIcon: ImagePath.menuUser,
      menuTitle: `₹${itemdata?.cost}`,
      menuTitleText: itemdata?.averageCost2People || 'N/A',
    },
    {
      menuIcon: ImagePath.menuUser1,
      menuTitle: 'Happy Hours',
      menuTitleText: itemdata?.happyHoursTimings || 'N/A',
    },
    {
      menuIcon: ImagePath.menuUser2,
      menuTitle: 'Menu',
      menuTitleText:
        itemdata?.vegNonVeg.toLowerCase() === 'non-veg'
          ? `Veg & ${itemdata?.vegNonVeg}`
          : itemdata?.vegNonVeg || 'N/A',
    },
    {
      menuIcon: ImagePath.menuUser3,
      menuTitle: 'Music Genre',
      menuTitleText: itemdata?.musicGenre || 'N/A',
    },
    {
      menuIcon:
        itemdata?.stagsAllowed?.toLowerCase() === 'yes'
          ? ImagePath.doneIcon
          : ImagePath.menuUser4,
      menuTitle: 'Stags',
      // menuTitleText: itemdata?.stagsAllowed || 'N/A',
    },

    {
      menuIcon:
        itemdata?.seeshaServe?.toLowerCase() === 'yes'
          ? ImagePath.doneIcon
          : ImagePath.menuUser4,
      menuTitle: 'Sheesha',
      // menuTitleText: itemdata?.seeshaServe || 'N/A',
    },
    {
      menuIcon:
        itemdata?.kidsFriendly?.toLowerCase() === 'yes'
          ? ImagePath.doneIcon
          : ImagePath.menuUser4,
      menuTitle: 'Kids Friendly',
      // menuTitleText: itemdata?.kidsFriendly || 'N/A',
    },
  ];
  const MenuDataRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={item.menuTitle != 'Menu'}
        activeOpacity={0.5}
        onPress={() => {
          item.menuTitle === 'Menu' && scrollToEnd();
        }}
        style={{
          flex: 1,
          paddingVertical: 7,
          // justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image style={styles.menuIconCss} source={item.menuIcon} />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 15,
              flex: 1,
            }}>
            <Text style={styles.menuText}>{item.menuTitle}</Text>
            {item.menuTitleText && (
              <View style={{width: '95%'}}>
                <Text style={styles.menuText2}>{item.menuTitleText}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
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
        <FlatList
          data={MenuData}
          numColumns={2}
          keyExtractor={(_, i) => i.toString()}
          renderItem={MenuDataRenderItem}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        />
      </SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL(itemdata?.googleMapLink);
          }}
          style={[styles.btnmain, {borderBottomLeftRadius: 10}]}>
          <Image
            style={[styles.btnIcon, {height: 18, width: 18}]}
            source={ImagePath.direction}
          />
          <Text style={[styles.buttonText, {}]}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL(
              'http://api.whatsapp.com/send?phone=91' +
                itemdata?.whatsappNumber,
            );
          }}
          style={[styles.btnmain, {marginHorizontal: 1}]}>
          <Image style={styles.btnIcon} source={ImagePath.WhatsApp} />
          <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Linking.openURL('tel:' + itemdata?.phoneNumber);
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
  },
  menuText2: {
    color: '#BBBBBB',
    fontSize: 12,
    fontFamily: FONTS.RobotoRegular,
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
