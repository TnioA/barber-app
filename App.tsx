import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

export default class App extends Component {
  render() {
    return (
      <UserContextProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UserContextProvider>
    );
  }
}