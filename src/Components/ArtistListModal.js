import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Text,
  FlatList,
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ArtistListModal = ({isVisible, onClose, data}) => {
  console.log(data, 'item===');
  const sendEmail = () => {
    Linking.openURL('mailto:info@azzirevents.com');
  };

  const openWhatsApp = () => {
    Linking.openURL('http://api.whatsapp.com/send?phone=919819955551');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
            <Image style={styles.closeIcon} source={ImagePath.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>
            {data[0]?.name ? 'Artists' : 'Contact List'}
          </Text>
          <View style={{maxHeight:250, marginTop:hp(1)}}>
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            key={item => item.toString()}
            showsVerticalScrollIndicator={false}
          />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const renderItem = item => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 12,
        marginVertical: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: Array.isArray(item?.images) ? 45 : 30,
          width: Array.isArray(item?.images) ? 45 : 30,
          borderRadius: 80,
          resizeMode: 'contain',
          marginRight: 6,
        }}
        source={
          Array.isArray(item?.images)
            ? item?.images[0]
              ? {
                  uri: item.images[0],
                }
              : ImagePath.artistImage
            : ImagePath.callIcon
        }
      />
      <Text
        style={{
          paddingLeft: item.name ? hp(0.5) : hp(1),
          fontSize: item.name ? 16 : 20,
          marginVertical: item.name ? hp(0.5) : hp(1),
          fontFamily: FONTS.AxiformaMedium,
          color: '#575757',
        }}
        onPress={!item.name ? () => Linking.openURL('tel:' + item) : () => {}}>
        {item.name ? item.name : item}
      </Text>
    </View>
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
  buttonsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
  },
  emailButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  whatsappButton: {
    backgroundColor: COLORS.primary,
  },
  buttonIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.black,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.AxiformaBold,
    textAlign: 'center',
    color: COLORS.white,
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FONTS.AxiformaRegular,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    lineHeight: 20,
    color: COLORS.darkGray,
  },
});

export default ArtistListModal;
