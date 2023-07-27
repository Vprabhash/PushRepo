import React, {useEffect, useRef, useState} from 'react';
import Routes from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {AppState, LogBox} from 'react-native';
import {Settings} from 'react-native-fbsdk-next';
import {requestUserPermission} from './src/utils/common';
import InAppUpdate from './inAppUpdate';
import SplashScreen from './src/Components/SplashScreen';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const appState = useRef(AppState.currentState);
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    InAppUpdate?.checkUpdate();
    Settings.initializeSDK();
    requestUserPermission();
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      handleShow();
      return;
    }

    // handleShow();
    appState.current = nextAppState;
  };

  const handleShow = () => {
    if (global.isUserFirstTime == true) {
      setShow(true);
    }
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  return (
    <Provider store={store}>
      <SplashScreen isVisible={isShow}animationType={'fade'} />
      <Routes />
    </Provider>
  );
};
export default App;
