import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInput from '../../components/SignInput';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';
import { Alert } from 'react-native';
import { 
  Container, 
  InputArea, 
  CustomButton, 
  CustomButtonText, 
  SignMessageButton, 
  SignMessageButtonText, 
  SignMessageButtonTextBold 
} from './Styles';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default class SignIn extends Component<any, any> {
  state = {
    emailField: '',
    passwordField: '',
    appointments: null
  }

  static contextType = UserContext;

  async handleSignClick(){
    if(this.state.emailField === '' || this.state.passwordField === ''){
      Alert.alert("Ops!", "Preencha os campos");
      return;
    }

    var response: any = await Api.signIn(this.state.emailField, this.state.passwordField);
    if(!response.success){
      Alert.alert("Ops!", response.error);
      return;
    }

    await AsyncStorage.setItem('token', response.data.token); 
    await this.context.setAvatar(response.data.avatar);

    this.props.navigation.reset({
      routes: [{name: 'MainTab'}]
    });
  }

  handleMessageButtonClick(){
    this.props.navigation.reset({
      routes: [{name: 'SignUp'}]
    });
  }

  render() {
    return (
      <Container>
        	<BarberLogo width="100%" height="160"></BarberLogo>
          <InputArea>
            <SignInput 
              IconSvg={EmailIcon} 
              placeholder="Digite seu E-mail" 
              value={this.state.emailField}
              onChangeText={(x: any) => this.setState({emailField: x})}
            />
            <SignInput 
              IconSvg={LockIcon} 
              placeholder="Digite sua senha" 
              value={this.state.passwordField}
              onChangeText={(x: any) => this.setState({passwordField: x})}
              password={true}
            />

            <CustomButton onPress={()=> this.handleSignClick()}>
              <CustomButtonText>Login</CustomButtonText>
            </CustomButton>
          </InputArea>

          <SignMessageButton onPress={()=> this.handleMessageButtonClick()}>
            <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
          </SignMessageButton>
      </Container>
    );
  }
}