import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';
import Appointments from '../screens/Appointments/Appointments';
import Favorites from '../screens/Favorites/Favorites';
import Profile from '../screens/Profile/Profile';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default class MainTab extends Component {
  render() {
    return (
      <Tab.Navigator tabBar={props=> <CustomTabBar {...props} />} initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}