import * as React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ImagePath from '../assets/ImagePath';
import Home from '../Screen/Dashboard/Home';
import ClubListing from '../Screen/Listing/ClubListing';
import EventListing from '../Screen/Listing/EventListing';
import ArtistDetail from '../Screen/ArtistDetails/ArtistDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClubDetails from '../Screen/Details/ClubDetails';
import Profile from '../Components/Profile/Profile';
import {FONTS} from '../Components/constants';
import ArtistEventDetail from '../Screen/ArtistDetails/ArtistEventDetail';
import ArtistPlayingDetail from '../Screen/ArtistDetails/ArtistPlayingDetail';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-screen-helper';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const Tab = createBottomTabNavigator();
// const Tab = AnimatedTabBarNavigator();

const Club = createNativeStackNavigator();
const ClubStack = () => {
  return (
    <Club.Navigator initialRouteName="ClubListing">
      <Club.Screen
        name="ClubListing"
        component={ClubListing}
        options={{headerShown: false}}
      />
      <Club.Screen
        name="ClubDetails"
        component={ClubDetails}
        options={{headerShown: false}}
      />
    </Club.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Club.Navigator initialRouteName="Home">
      <Club.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Club.Screen
        name="ClubDetails"
        component={ClubDetails}
        options={{headerShown: false}}
      />
      <Club.Screen
        name="ArtistEventDetail"
        component={ArtistEventDetail}
        options={{headerShown: false}}
      />
      <Club.Screen
        name="ArtistPlayingDetail"
        component={ArtistPlayingDetail}
        options={{headerShown: false}}
      />
    </Club.Navigator>
  );
};
function BottomTab() {
  return (
    <Tab.Navigator
      safeAreaInsets={{bottom: 0}}
      screenOptions={({focused}) => ({
        tabBarActiveTintColor: '#9700AF',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          elevation: 3,
          borderTopWidth: 1,
          marginTop: 0.5,
          // marginBottom:2,
          position: 'absolute',
          bottom: isIphoneX() ? 20 : 15,
          height: Platform.OS === 'ios' ? 65 : 65,
          borderRadius: 100,
          backgroundColor: '#fff',
          overflow: 'hidden',
          marginHorizontal: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
          fontFamily: FONTS.DMSansMedium,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.tab_Icon}
              source={focused ? ImagePath.homeActive : ImagePath.homeIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ClubListing"
        component={ClubStack}
        options={{
          headerShown: false,
          tabBarLabel: 'CLUB',
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tab_Icon,
                {tintColor: focused ? '#9700AF' : 'black'},
              ]}
              source={focused ? ImagePath.clubActive : ImagePath.clubActive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ArtistDetail"
        component={ArtistDetail}
        options={{
          headerShown: false,
          tabBarLabel: 'ARTIST',
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tab_Icon,
                {tintColor: focused ? '#9700AF' : 'black'},
              ]}
              source={focused ? ImagePath.artistIcon : ImagePath.artistIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EventListing"
        component={EventListing}
        options={{
          headerShown: false,
          tabBarLabel: 'EVENT',
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tab_Icon,
                {tintColor: focused ? '#9700AF' : 'black'},
              ]}
              source={focused ? ImagePath.calendarIcon : ImagePath.calendarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                styles.tab_Icon,
                {tintColor: focused ? '#9700AF' : 'black'},
              ]}
              source={focused ? ImagePath.profile : ImagePath.profile}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tab_Icon: {height: 20, width: 20, resizeMode: 'contain'},
  tab_Icon_Ae: {height: 66, width: 70, resizeMode: 'contain', bottom: 30},
});
export default BottomTab;
