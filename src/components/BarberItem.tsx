import React, { Component } from 'react';
import styled from 'styled-components/native';
import Stars from './Stars';

const Area = styled.TouchableOpacity`
  background-color: #FFFFFF;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`;

const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const SeeProfileButton = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid #4EADBE;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const SeeProfileButtonText = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export default class BarberItem extends Component<any, any> {

  handleClick(){
    this.props.navigation.navigate('Barber', this.props.data);
  }

  render() {
    return (
      <Area onPress={()=> this.handleClick()}>
        <Avatar source={{uri: this.props.data.avatar}} />
        <InfoArea>
          <UserName>{this.props.data.name}</UserName>
          <Stars stars={this.props.data.stars} showNumber={true} />
          <SeeProfileButton>
            <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
          </SeeProfileButton>
        </InfoArea>
      </Area>
    );
  }
}