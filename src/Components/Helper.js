import * as React from 'react';
import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Helper extends React.Component {
  static device_type = Platform.OS == 'android' ? 'Android' : 'IOS';
  static device_token = '1213123123';
  static location = '';

  static async setData(key, val) {
    try {
      let tempval = JSON.stringify(val);
      await AsyncStorage.setItem(key, tempval);
    } catch (error) {
      console.error(error, '----------SetAsyncStorage');
    }
  }
  static async getData(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value) {
        let newvalue = JSON.parse(value);
        return newvalue;
      } else {
        return value;
      }
    } catch (error) {
      console.error(error, '---------GetAsyncStorage');
    }
  }
  static async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }
}
