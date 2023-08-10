import {PixelRatio} from 'react-native';
import moment from 'moment';
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
  console.log('fcmToken', fcmToken);
  global.fcmToken = fcmToken;
}

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');

  if (checkToken == null || checkToken == '' || !checkToken) {
    try {
      await messaging().deleteToken();
      const fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Error raised', error);
    }
  }
};

export function parseYouTubeLink(youtubeLink) {
  if (!youtubeLink) {
    return null;
  }

  // Regular expression patterns to match YouTube URLs
  const channelPattern = /\/channel\/([a-zA-Z0-9_-]{24})/;
  const videoPattern = /\/watch\?v=([a-zA-Z0-9_-]{11})/;
  const shortLinkPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const usernamePattern = /\/@([a-zA-Z0-9_-]+)/;

  // Check if it's a channel URL
  const channelMatch = youtubeLink.match(channelPattern);
  if (channelMatch) {
    const channelId = channelMatch[1];
    const customLink = `https://www.youtube.com/channel/${channelId}`;
    return customLink;
  }

  // Check if it's a video URL
  const videoMatch = youtubeLink.match(videoPattern);
  if (videoMatch) {
    const videoId = videoMatch[1];
    const customLink = `https://www.youtube.com/watch?v=${videoId}`;
    return customLink;
  }

  // Check if it's a short link format (youtu.be)
  const shortLinkMatch = youtubeLink.match(shortLinkPattern);
  if (shortLinkMatch) {
    const videoId = shortLinkMatch[1];
    const customLink = `https://www.youtube.com/watch?v=${videoId}`;
    return customLink;
  }

  // Check if it's a URL with "@username"
  const usernameMatch = youtubeLink.match(usernamePattern);
  if (usernameMatch) {
    const username = usernameMatch[1];
    const customLink = `https://www.youtube.com/@${username}`;
    return customLink;
  }

  // Check if "https" is present, if not, add it
  if (
    !youtubeLink.startsWith('https://') &&
    !youtubeLink.startsWith('http://')
  ) {
    return 'https://' + youtubeLink;
  }

  // Invalid or unsupported YouTube link
  return null;
}

export function createEventName(eventName) {
  return eventName.toLowerCase().split(' ').join('_');
}

export const formatTimeRange = (start, end, dash = true) => {
  const localStart = start ? moment.utc(start).local() : null;
  const localEnd = end ? moment.utc(end).local() : null;

  if (!localStart && !localEnd) {
    return '8pm onwards';
  } else if (localStart && !localEnd) {
    return `${localStart.format(
      'h' + (localStart.minutes() === 0 ? '' : ':mm') + ' a',
    )} onwards`;
  } else if (!localStart && localEnd) {
    return '8pm onwards';
  } else {
    const startFormat = localStart.minutes() === 0 ? 'h' : 'hh:mm';
    const endFormat = localEnd.minutes() === 0 ? 'h' : 'hh:mm';
    return `${localStart.format(startFormat + ' a')} ${
      dash ? '-' : 'to'
    } ${localEnd.format(endFormat + ' a')}`;
  }
};
