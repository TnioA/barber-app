import React, { Component } from 'react';
import { Container, LoadingIcon } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BarberLogo from '../../assets/barber.svg';

export default class Preload extends Component<any, any> {

  componentDidMount(){

    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
        // validate token
      }else{
        this.props.navigation.navigate('SignIn');
      }
    }

    var timer = setTimeout(function(){
      checkToken();
      clearTimeout(timer);
    }, 3000);
    
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