import { PixelRatio } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const responsiveFontSize = f => {
  return f * PixelRatio.getFontScale();
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  const fcmToken = await messaging().getToken();
  global.fcmToken = fcmToken;
};

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('old token', checkToken);

  if (checkToken == null || checkToken == "" || !checkToken) {
    try {
      await messaging().deleteToken();
      const fcmToken = await messaging().getToken();
      console.log('fcm token generated', fcmToken);
      if (!!fcmToken) {
        console.log('fcm token generated', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Error raised', error);
    }
  }
};
