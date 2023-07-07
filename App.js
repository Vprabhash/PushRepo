import React, { useEffect } from 'react';
import Routes from './src/Navigation/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LogBox } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import { requestUserPermission } from './src/utils/common';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    Settings.initializeSDK()
    requestUserPermission()
  }, [])
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
