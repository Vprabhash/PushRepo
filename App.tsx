import React from 'react';
import Routes from './src/Navigation/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {


  return (
    <Provider store={store}>
      <Routes />
      </Provider>
  );
};
export default App;