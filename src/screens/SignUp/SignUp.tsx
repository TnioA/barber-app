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
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import Api from '../../Api';

export default class SignUp extends Component<any, any> {
  state = {
    nameField: '',
    emailField: '',
    passwordField: ''
  }

  async handleSignClick(){
    if(this.state.nameField === '' || this.state.emailField === '' || this.state.passwordField === ''){
      alert("Preencha os campos");
      return;
    }

    var response = await Api.signUp(this.state.nameField, this.state.emailField, this.state.passwordField);
    if(!response.Success)
      alert("Erro na requisição");

    console.log(response);
  }

  handleMessageButtonClick(){
    this.props.navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  render() {
    return (
      <Container>
        	<BarberLogo width="100%" height="160"></BarberLogo>
          <InputArea>
            <SignInput 
              IconSvg={PersonIcon} 
              placeholder="Digite seu Nome" 
              value={this.state.nameField}
              onChangeText={(x: any) => this.setState({nameField: x})}
            />
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
              <CustomButtonText>Cadastrar</CustomButtonText>
            </CustomButton>
          </InputArea>

          <SignMessageButton onPress={()=> this.handleMessageButtonClick()}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
          </SignMessageButton>
      </Container>
    );
  }
}