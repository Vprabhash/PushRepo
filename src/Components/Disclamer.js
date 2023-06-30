import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Text, StyleSheet, View, BackHandler, Modal, Button} from 'react-native';
import {responsiveFontSize} from '../utils/common';
import CustomButton from './TextInput_And_Button/CustomButton';
import {FONTS} from './constants';

const Disclamer = ({onPress, isVisible, setVisible}) => {
  return (
    <Modal visible={isVisible} transparent={true} statusBarTranslucent={true}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.icon_text}>Welcome to Azzir!</Text>
          <Text style={styles.small_text}>
            {
              'Azzir collects location data for the following \n - To detect your current location while creating a \n    new itinerary. \n - Recommending places near your location.'
            }
          </Text>
          <Text style={styles.small_text}>
            {
              'Azzir collects background location information to provide realtime information for the following \n - Time to reach a point of interest.\n - Time to leave a point of interest. \n - Travel time with traffic considerations. \n - When the user reaches or leaves a point of interest.'
            }
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: 8,
            }}>
            <CustomButton
              onclick={() => {
                setVisible(false);
                // BackHandler.exitApp();
              }}
              top={30}
              title="DISAGREE"
              bgColor="#FF4636"
              textColor="#fff"
            />
            <CustomButton
              onclick={() => {
                onPress();
              }}
              top={30}
              title="AGREE"
              bgColor="#000"
              textColor="#fff"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Disclamer;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    // flex: 0.7,
    flexDirection: 'column',
    padding: 16,
    borderRadius: 10,
  },
  icon_text: {
    color: '#494949',
    fontSize: responsiveFontSize(17),
    marginVertical: 8,
    fontFamily: FONTS.AxiformaRegular,
  },
  small_text: {
    color: '#494949',
    fontSize: responsiveFontSize(14),
    marginVertical: 8,
    fontFamily: FONTS.AxiformaRegular,
  },
});
