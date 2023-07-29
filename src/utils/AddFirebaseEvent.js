import analytics from '@react-native-firebase/analytics';
import ApiCall from '../redux/CommanApi';
export const logEvent = async (eventName, params) => {
  if (params) {
    await analytics().logEvent(eventName, params);
  } else {
    await analytics().logEvent(eventName);
  }
};

export async function sendUXActivity(eventName, data) {
  try {
    const payload = {
      eventName: eventName,
      data: data,
    };

    ApiCall('api/ux-activity', 'POST', JSON.stringify(payload));

    if (response?.ok) {
      console.log('UX activity sent successfully!');
    } else {
      console.log('Failed to send UX activity:', response);
    }
  } catch (error) {
    console.error('Error occurred while sending UX activity:', error);
  }
}
