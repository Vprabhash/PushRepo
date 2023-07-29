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
import Toast from 'react-native-simple-toast';
import {logEvent, sendUXActivity} from '../utils/AddFirebaseEvent';
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
      menuTitle: itemdata?.cost ? `₹${itemdata?.cost}` : '₹',
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
        itemdata?.vegNonVeg?.toLowerCase() === 'non-veg'
          ? `${itemdata?.vegNonVeg}`
          : itemdata?.vegNonVeg || 'N/A',
    },
    {
      menuIcon: ImagePath.menuUser3,
      menuTitle: 'Music Genre',
      menuTitleText: itemdata?.musicGenre || 'N/A',
    },
    {
      menuIcon: ImagePath.liveDjIcon,
      menuTitle: 'Live Music/DJ',
      menuTitleText: itemdata?.liveMusicDj || 'N/A',
    },
  ];
  const stagsData = [
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
          justifyContent: 'center',
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
  const stagsRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: 7,
          justifyContent: 'center',
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
            }}>
            <Text style={styles.menuText}>{item.menuTitle}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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
        <FlatList
          data={stagsData}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={stagsRenderItem}
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
          contentContainerStyle={{
            justifyContent: 'space-between',
            flex: 1,
          }}
          ItemSeparatorComponent={
            <View
              style={{
                width: 10,
              }}
            />
          }
        />
      </SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            logEvent(`direction_pressed ${itemdata?.name}`, itemdata);
            sendUXActivity('clubs.direction_pressed', {
              screen: 'ClubDetailScreen',
              clubId: itemdata?._id,
            });
            Linking.openURL(itemdata?.googleMapLink);
          }}
          style={[styles.btnmain, {borderBottomLeftRadius: 10}]}>
          <Image
            style={[styles.btnIcon, {height: 18, width: 18}]}
            source={ImagePath.direction}
          />
          <Text style={[styles.buttonText, {}]}>Direction</Text>
        </TouchableOpacity>
        {itemdata?.whatsappNumber ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              logEvent(`whatsapp_pressed  ${itemdata?.name}`, itemdata);
              sendUXActivity('clubs.whatsapp_pressed', {
                screen: 'ClubDetailScreen',
                clubId: itemdata?._id,
              });
              if (itemdata?.whatsappNumber) {
                Linking.openURL(
                  'http://api.whatsapp.com/send?phone=91' +
                    itemdata?.whatsappNumber,
                );
              } else {
                Toast.showWithGravity(
                  'Sorry! WhatsApp number is not available',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }
            }}
            style={[styles.btnmain, {marginHorizontal: 1}]}>
            <Image style={styles.btnIcon} source={ImagePath.WhatsApp} />
            <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              logEvent(`whatsapp_pressed ${itemdata?.name}`, itemdata);
              sendUXActivity('clubs.whatsapp_pressed', {
                screen: 'ClubDetailScreen',
                clubId: itemdata?._id,
              });
              if (itemdata?.whatsappNumber) {
                Linking.openURL(
                  'http://api.whatsapp.com/send?phone=91' +
                    itemdata?.whatsappNumber,
                );
              } else {
                Toast.showWithGravity(
                  'Sorry! WhatsApp number is not available',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }
            }}
            style={[styles.btnmainDisabled, {marginHorizontal: 1}]}>
            <Image
              style={styles.btnIconDisabled}
              source={ImagePath.WhatsAppDisabled}
            />
            <Text style={[styles.buttonText, {}]}>WhatsApp</Text>
          </TouchableOpacity>
        )}
        {itemdata?.phoneNumber ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              logEvent(`call_pressed ${itemdata?.name}`, itemdata);
              sendUXActivity('clubs.call_pressed', {
                screen: 'ClubDetailScreen',
                clubId: itemdata?._id,
              });
              if (itemdata?.phoneNumber) {
                Linking.openURL('tel:' + itemdata?.phoneNumber);
              } else {
                Toast.showWithGravity(
                  'Sorry! Phone number is not available',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }
            }}
            style={[styles.btnmain, {borderBottomRightRadius: 10}]}>
            <Image style={styles.btnIcon} source={ImagePath.callIcon} />
            <Text style={[styles.buttonText, {}]}>Call</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              logEvent(`call_pressed ${itemdata?.name}`, itemdata);
              sendUXActivity('clubs.call_pressed', {
                screen: 'ClubDetailScreen',
                clubId: itemdata?._id,
              });
              if (itemdata?.phoneNumber) {
                Linking.openURL('tel:' + itemdata?.phoneNumber);
              } else {
                Toast.showWithGravity(
                  'Sorry! Phone number is not available',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }
            }}
            style={[styles.btnmainDisabled, {borderBottomRightRadius: 10}]}>
            <Image
              style={styles.btnIconDisabled}
              source={ImagePath.callIconDisabled}
            />
            <Text style={[styles.buttonText, {}]}>Call</Text>
          </TouchableOpacity>
        )}
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
  btnmainDisabled: {
    flexDirection: 'row',
    flex: 0.4,
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
  btnIcon: {height: 16, width: 16, resizeMode: 'contain'},
  btnIconDisabled: {height: 16, width: 16, resizeMode: 'contain'},
});
export default MenuCard;
