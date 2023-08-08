import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Text,
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import {COLORS, FONTS} from './constants';

const SupportModal = ({isVisible, onClose}) => {
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
          <Text style={styles.welcomeText}>Contact Us</Text>
          <Text style={styles.descriptionText}>
            For any assistance or queries, feel free to reach out to our support
            team via email or WhatsApp. We are here to help you!
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.emailButton]}
              onPress={sendEmail}>
              <Image
                source={ImagePath.email}
                style={[styles.buttonIcon, {tintColor: COLORS.white}]}
              />
              <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.whatsappButton]}
              onPress={openWhatsApp}>
              <Image source={ImagePath.WhatsApp} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    padding: 20,
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
    width: 18,
    height: 18,
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
    fontSize: 24,
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

export default SupportModal;
