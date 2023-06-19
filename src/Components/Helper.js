import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

// const navigation=useNavigation()

export const setData = async (key, val) => {
  try {
    let tempval = JSON.stringify(val);
    await AsyncStorage.setItem(key, tempval);
    return true;
  } catch (error) {
    return false;
    console.error(error, '----------SetAsyncStorage');
  }
};

export const getData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error, '---------GetAsyncStorage');
    logOut()
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};


const logOut = async ({navigation}) => {
  Toast.showWithGravity(
    'Something went wrong',
    Toast.LONG,
    Toast.BOTTOM,
  );
  GoogleSignin.signOut();
  await removeData('userToken');
  await removeData('userData');
  navigation.reset({
    index: 0,
    routes: [{name: 'Login'}],
  });
};
