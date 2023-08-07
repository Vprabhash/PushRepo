import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import CustomButton from './TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from './constants';
import moment from 'moment';
import ImagePath from '../assets/ImagePath';
import FastImage from 'react-native-fast-image';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const UpcomingEventModal = ({
  visible = false,
  data = [],
  onPress,
  onPressCancel,
}) => {
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={[
              styles.textModal,
              {
                borderBottomWidth: 0.6,
                paddingBottom: hp(3),
                marginTop: hp(3),
                borderBottomColor: COLORS.black,
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                fontSize: 20,
                fontFamily: FONTS.AxiformaBold,
                textAlign: 'center',
              }}>
              Upcoming Events
            </Text>
          </View>
          <FlatList
            data={data || []}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => onPress(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.rectangle4}>
                      {Array.isArray(item?.images) &&
                      item?.images?.length &&
                      item?.images[0] &&
                      typeof item?.images[0]?.path == 'string' ? (
                        <FastImage
                          style={styles.clipPath}
                          source={{uri: item?.images[0]?.path}}
                        />
                      ) : (
                        <View
                          style={[
                            styles.clipPath,
                            {backgroundColor: COLORS.gray},
                          ]}
                        />
                      )}
                    </View>
                    <Text style={[styles.dateText, {width: wp(40)}]}>
                      <Text
                        style={[
                          styles.dateText,
                          {fontFamily: FONTS.AxiformaBold},
                        ]}>
                        {item?.title}
                      </Text>
                      {'\n'}
                      {item?.eventDate
                        ? moment(item?.eventDate).format('DD MMMM, YYYY')
                        : null}
                      {'\n'}
                      8pm onwards
                    </Text>
                  </View>
                  {item?.artists?.length ? (
                    <View
                      style={{
                        marginLeft: wp(2),
                        width: wp(35),
                        alignItems: 'flex-end',
                      }}>
                      <Text style={styles.byAviEvents}>
                        By {item?.artists?.map(e => e?.name)?.join(', ')}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{paddingBottom: 80}}
            ListEmptyComponent={
              <View
                style={{
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleText, {textAlign: 'center'}]}>
                  No Upcoming Events.{'\n'}Please check back later.
                </Text>
              </View>
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: hp(3),
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignSelf: 'center',
            }}>
            <CustomButton
              onclick={onPressCancel}
              title="Cancel"
              flex={1}
              bgColor="#fff"
              textColor={COLORS.black}
            />
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};
export default UpcomingEventModal;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
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
    backgroundColor: 'rgba(0,0,0,0.8)',
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
  rectangle4: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  clipPath: {
    width: 48,
    height: 48,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  dateText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FONTS.AxiformaRegular,
    marginLeft: 8,
    lineHeight: 20,
  },
  djChetas: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FONTS.AxiformaRegular,
  },
  byAviEvents: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.AxiformaRegular,
  },
  titleText: {
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    fontSize: 16,
    marginTop: hp(1),
  },
});
