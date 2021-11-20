import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  }
}