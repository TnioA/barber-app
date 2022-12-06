import React, { Component } from 'react';
import styled from 'styled-components/native';

const Area = styled.View`
  background-color: #FFFFFF;
  flex: 1;
  margin-bottom: 20px;
  border-radius: 15px;
  padding: 15px;
`;

const UserInfoArea = styled.View`
  flex-direction: row;
`;

const UserAvatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 20px;
  margin-right: 10px;
`;

const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const UserInfoName = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ServiceArea = styled.View`
  margin-top: 10px;
`;

const ServiceItem = styled.View`
  flex-direction: row;
`;

const ServiceInfo = styled.View`
    flex: 1;
`;

const ServiceName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;
const ServicePrice = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-align: right;
`;

const DateButtomInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-top: 10px;
`;

const HourButtomInfo = styled.View`
  flex: 1;
  align-items: flex-end;
  margin-top: 10px;
`;

const ServiceChooseButton = styled.View`
  background-color: #4EADBE;
  border-radius: 10px;
  padding: 10px 15px;
`;

const ServiceChooseBtnText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
`;

export default class BarberItem extends Component<any, any> {

  handleClick(){
    this.props.navigation.navigate('Barber', this.props.data);
  }

  render() {
    return (
      <Area>
        <UserInfoArea>
          <UserAvatar source={{uri: this.props.data.barber.avatar}} />
          <UserInfo>
            <UserInfoName>{this.props.data.barber.name}</UserInfoName>
          </UserInfo>
        </UserInfoArea>
        <ServiceArea>            
          <ServiceItem>
            <ServiceInfo>
                <ServiceName>{this.props.data.service.name}</ServiceName>
            </ServiceInfo>
            <ServiceInfo>
                <ServicePrice>R$ {this.props.data.service.price}</ServicePrice>
            </ServiceInfo>
          </ServiceItem>        
          <ServiceItem>
            <DateButtomInfo>
              <ServiceChooseButton>
                <ServiceChooseBtnText>{this.props.data.date.date}</ServiceChooseBtnText>
              </ServiceChooseButton>         
            </DateButtomInfo>
            <HourButtomInfo>
              <ServiceChooseButton>
                <ServiceChooseBtnText>{this.props.data.date.hour}</ServiceChooseBtnText>
              </ServiceChooseButton>
            </HourButtomInfo>             
          </ServiceItem>
        </ServiceArea>           
      </Area>
    );
  }
}