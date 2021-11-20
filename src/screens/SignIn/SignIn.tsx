import React, { Component } from 'react';
import SignInput from '../../components/SignInput';
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
import Api from '../../Api';

export default class SignIn extends Component<any, any> {
  state = {
    emailField: '',
    passwordField: ''
  }

  async handleSignClick(){
    if(this.state.emailField === '' || this.state.passwordField === ''){
      alert("Preencha os campos");
      return;
    }

    var response = await Api.signIn(this.state.emailField, this.state.passwordField);
    if(!response.Success)
      alert("Erro na requisição");

    console.log(response);
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