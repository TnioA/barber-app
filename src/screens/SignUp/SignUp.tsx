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
  SignMessageButtonTextBold,
  LoadingIcon
} from './Styles';

import BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';


export default class SignUp extends Component<any, any> {
  state = {
    nameField: '',
    emailField: '',
    passwordField: '',
    loading: false
  }

  static contextType = UserContext;

  async handleSignClick(){
    if(this.state.loading) 
      return;

    if(this.state.nameField === '' || this.state.emailField === '' || this.state.passwordField === ''){
      Alert.alert("Ops!", "Preencha os campos");
      return;
    }

    this.setState({loading: true});
    var response: any = await Api.signUp(this.state.nameField, this.state.emailField, this.state.passwordField);
    if(!response.success)
      this.setState({loading: false}, ()=> {
        Alert.alert("Ops!", "E-mail e/ou senha incorretos!");
      });

    await AsyncStorage.setItem('token', response.data.token); 
    await this.context.setAvatar(response.data.avatar);

    this.setState({loading: false});
    this.props.navigation.reset({
      routes: [{name: 'MainTab'}]
    });
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
              <CustomButtonText>{this.state.loading ? <LoadingIcon size="large" color="#FFFFFF"></LoadingIcon> : "Cadastrar"}</CustomButtonText>
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