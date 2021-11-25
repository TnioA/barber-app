import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload/Preload';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import Barber from '../screens/Barber/Barber';
import MainTab from './MainTab';

const Stack = createStackNavigator();

export default class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Preload" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Barber" component={Barber} />
      </Stack.Navigator>
    );
  }
}