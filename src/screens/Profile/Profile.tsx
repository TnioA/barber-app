import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';
import React, { Component } from 'react';
import Api from '../../Api';
import { 
  Container,
  InputArea, 
  CustomButton, 
  CustomButtonText 
} from './Styles';

export default class Profile extends Component<any, any> {

  state = {
    name: 'Juremildo Souza',
    email: 'juremo@hotmail.com'
  }
  static contextType = UserContext;

  componentDidMount(){
  }

  async handleLogoutClick(){
    await Api.logout();

    await AsyncStorage.clear(); 
    this.props.navigation.reset({
      routes:[{name: 'SignIn'}]
    });
  }

  render() {
    return (
      <Container>
        <InputArea>
          <CustomButton onPress={()=> this.handleLogoutClick()}>
            <CustomButtonText>Sair</CustomButtonText>
          </CustomButton>
        </InputArea>
      </Container>
    );
  }
}