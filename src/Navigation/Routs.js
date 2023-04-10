// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash_Screen from '../Screen/User_Auth/Splash_Screen';
import Login from '../Screen/User_Auth/Login';
import Explore from '../Screen/User_Auth/Explore';
import SignUp from '../Screen/User_Auth/SignUp';
import ForgetPassword from '../Screen/User_Auth/ForgetPassword';
import ResetPassword from '../Screen/User_Auth/ResetPassword';
import PasswordSuccessful from '../Screen/User_Auth/PasswordSuccessful';
import BottomTab from './Bottom_Tab';
import Otp from '../Screen/User_Auth/Otp';


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash_Screen" component={Splash_Screen} options={{headerShown:false}}/>
        <Stack.Screen name="Explore" component={Explore} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Otp" component={Otp} options={{headerShown:false}}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown:false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
        <Stack.Screen name="PasswordSuccessful" component={PasswordSuccessful} options={{headerShown:false}}/>
        <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown:false}}/>
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

export default Routes;