import AsyncStorage from '@react-native-async-storage/async-storage';

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
