import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import Api from '../../Api';
import { Container } from './Styles';

export default class Profile extends Component<any, any> {
  async handleLogoutClick(){
    await Api.logout();
    this.props.navigation.reset({
      routes:[{name: 'SignIn'}]
    });
  }

  render() {
    return (
      <Container>
        <Text>Profile</Text>
        <Button title="Sair" onPress={()=> this.handleLogoutClick()} />
      </Container>
    );
  }
}