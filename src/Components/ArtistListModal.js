import React, {memo} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logEvent, sendUXActivity} from '../utils/AddFirebaseEvent';
import {createEventName} from '../utils/common';

const ArtistListModal = ({isVisible, onClose, data, navigation}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          onClose();
          if (!item.name) {
            Linking.openURL('tel:' + item);
          } else {
            if (item?.type?.toLowerCase() === 'guest') {
              return;
            }
            navigation.navigate('ArtistEventDetail', {
              artistListDetail: item,
            });
            logEvent(`artist_detail_${createEventName(item?.name)}`, item);
            sendUXActivity('Artists.view', {
              screen: 'ArtistDetailScreen',
              artistId: item?._id,
              name: item?.name,
              city: item?.address?.city,
              referer: 'ArtistDetailScreen',
            });
          }
        }}>
        {Array.isArray(item?.images) &&
        item?.images?.length &&
        item?.images[0] ? (
          <Image style={styles.imageWrapper} source={{uri: item?.images[0]}} />
        ) : item?.type ? (
          <View style={styles.imageWrapper}>
            <Image
              source={
                item?.type?.toLowerCase() === 'artist'
                  ? ImagePath.placeholderSinger
                  : item?.type?.toLowerCase() === 'dj'
                  ? ImagePath.placeholderDj
                  : item?.type?.toLowerCase() === 'guest'
                  ? ImagePath.profile
                  : null
              }
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.imageWrapper}>
            <Image source={ImagePath.callIcon} style={[styles.imageWrapper]} />
          </View>
        )}
        <View>
          <Text
            style={{
              paddingLeft: item.name ? 3 : 5,
              fontSize: 16,
              fontFamily: FONTS.AxiformaMedium,
              color: COLORS.black,
            }}>
            {item.name ? item.name : item}
          </Text>
          {item.type ? (
            <Text
              style={{
                paddingLeft: item.name ? 3 : 5,
                fontSize: 12,
                fontFamily: FONTS.AxiformaMedium,
                color: '#575757',
                textTransform: 'uppercase',
              }}>
              {item.type}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Pressable style={styles.container} onPress={onClose}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={ImagePath.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.labelText}>
            {Array.isArray(data?.length) && data?.length && data[0]?.name
              ? 'Artists'
              : 'Contacts'}
          </Text>
          <View style={{maxHeight: 250, marginTop: hp(1)}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              key={(_, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              // ItemSeparatorComponent={<View style={styles.saperator} />}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 8,
    width: '90%',
    elevation: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  saperator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  labelText: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.black,
  },
  itemWrapper: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
    overflow: 'hidden',
  },
  image: {
    height: 15,
    width: 15,
    resizeMode: 'cover',
    alignSelf: 'center',
    opacity: 0.5,
  },
});

export default memo(ArtistListModal);
