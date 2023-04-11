import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagePath from '../assets/ImagePath';
import SignUp from '../Screen/User_Auth/SignUp';
import Login from '../Screen/User_Auth/Login';
import Home from '../Screen/Dashboard/Home';
import PasswordSuccessful from '../Screen/User_Auth/PasswordSuccessful';
import ClubListing from '../Screen/Listing/ClubListing';
import EventListing from '../Screen/Listing/EventListing';
import ClubDetails from '../Screen/Details/ClubDetails';

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator 
        // initialRouteName='Explore'
            screenOptions={({ focused }) => ({
                tabBarActiveTintColor: '#9700AF',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: { elevation: 3, borderTopWidth: 1, marginTop: 0.5, height: 60, backgroundColor: '#fff', },
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10, fontWeight: '700', },
            })}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'HOME',
                    tabBarIcon: ({ focused,  }) => (
                         <Image style={styles.tab_Icon} source={focused ? ImagePath.homeActive : ImagePath.homeIcon} />
                        // <Image style={[focused ? styles = { tab_Icon } : styles = { tab_Icon }]} source={focused ? ImagePath.homeActive : ImagePath.homeIcon} />
                    ),
                }}
            />
            <Tab.Screen name="ClubListing" component={ClubListing}
                options={{
                    headerShown: false,
                    tabBarLabel: 'CLUB',
                    tabBarIcon: ({ focused }) => (
                        <Image style={styles.tab_Icon} source={focused ? ImagePath.clubActive : ImagePath.clubActive} />
                    ),
                }} />
                 <Tab.Screen name="EventListing" component={EventListing}
                options={{
                    headerShown: false,
                    tabBarLabel: 'EVENT',
                    tabBarIcon: ({ focused,  }) => (
                         <Image style={styles.tab_Icon} source={focused ? ImagePath.calendarIcon : ImagePath.calendarIcon} />
                        // <Image style={[focused ? styles = { tab_Icon } : styles = { tab_Icon }]} source={focused ? ImagePath.homeActive : ImagePath.homeIcon} />
                    ),
                }}
            />
            <Tab.Screen name="ClubDetails" component={ClubDetails}
                options={{
                    headerShown: false,
                    tabBarLabel: 'VANUE',
                    tabBarIcon: ({ focused }) => (
                        <Image style={styles.tab_Icon} source={focused ? ImagePath.location : ImagePath.location} />
                    ),
                }} />
           
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    tab_Icon: { height: 20, width: 20, resizeMode: 'contain' },
    tab_Icon_Ae: { height: 66, width: 70, resizeMode: 'contain', bottom: 30, },
});
export default BottomTab;