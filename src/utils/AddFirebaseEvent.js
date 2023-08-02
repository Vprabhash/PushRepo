import analytics from '@react-native-firebase/analytics';
import ApiCall from '../redux/CommanApi';
import {Platform} from 'react-native';
export const logEvent = async (eventName, params) => {
  if (params) {
    await analytics().logEvent(eventName, params);
  } else {
    await analytics().logEvent(eventName);
  }
};

export function sendUXActivity(eventName, data) {
  const payload = {
    eventName: eventName,
    data: {...data, source: Platform.OS},
  };

  ApiCall('api/ux-activity', 'POST', JSON.stringify(payload))
    .then(response => {
      if (response?.ok) {
        // console.log('UX activity sent successfully!');
      } else {
        console.log('Failed to send UX activity:', response);
      }
    })
    .catch(error => {
      console.error('Error occurred while sending UX activity:', error);
    });
}
