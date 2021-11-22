import React, { Component } from 'react';
import { Container, LoadingIcon } from './Styles';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';

export default class Preload extends Component<any, any> {

  static contextType = UserContext;

  componentDidMount(){
    
    this.checkToken();
  }

  async checkToken(){
    const token = await AsyncStorage.getItem('token');
    if(!token){
      this.props.navigation.navigate('SignIn');
      return;
    }

    var response: any = await Api.checkToken(token);
    if(!response.success){
      this.props.navigation.navigate('SignIn');
      return;
    }

    await AsyncStorage.setItem('token', response.data.token);
    await this.context.setAvatar(response.data.avatar);
    this.props.navigation.reset({
      routes: [{name: 'MainTab'}]
    });
  }

  render() {
    return (
      <Container>
        	<BarberLogo width="100%" height="160"></BarberLogo>
          <LoadingIcon size="large" color="#FFFFFF"></LoadingIcon>
      </Container>
    );
  }
}