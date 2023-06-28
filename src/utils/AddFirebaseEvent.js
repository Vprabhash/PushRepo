import analytics from '@react-native-firebase/analytics';
export const logEvent = async (eventName, params) => {
  if (params) {
    await analytics().logEvent(eventName, params);
  } else {
    await analytics().logEvent(eventName);
  }
};
