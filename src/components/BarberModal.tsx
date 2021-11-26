import React, { Component } from 'react';
import styled from 'styled-components/native';

import ExpandIcon from '../assets/expand.svg';

const Modal = styled.Modal`
`;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83D6E3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const BarberInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BarberAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

const BarberName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const FinishButtom = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtomText = styled.Text`
  color: #FFFFFF;
  font-size: 17px;
  font-weight: bold;
`;


const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const days = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab",
  "Dom"
];

export default class BarberModal extends Component<any, any> {
  handleCloseButton(){
    this.props.setShow(false);
  }

  handleFinishClick(){

  }

  render() {
    return (
      <Modal 
        transparent={true}
        visible={this.props.show}
        animationType="slide"
      >
        <ModalArea>
          <ModalBody>
            <CloseButton onPress={()=> this.handleCloseButton()}>
              <ExpandIcon width="40" height="40" fill="#000000"></ExpandIcon>
            </CloseButton>
            <ModalItem>
              <BarberInfo>
                <BarberAvatar source={{uri: this.props.barber.avatar}}/>
                <BarberName>{this.props.barber.name}</BarberName>
              </BarberInfo>
            </ModalItem>
            {this.props.service != null &&
              <ModalItem>
                <ServiceInfo>
                  <ServiceName>{this.props.barber.services[this.props.service].name}</ServiceName>
                  <ServicePrice>R$ {this.props.barber.services[this.props.service].price.toFixed(2)}</ServicePrice>
                </ServiceInfo>
              </ModalItem>
            }
            <ModalItem>
              
            </ModalItem>
            <FinishButtom onPress={()=> this.handleFinishClick()}>
              <FinishButtomText>Finalizar Agendamento</FinishButtomText>
            </FinishButtom>
          </ModalBody>
        </ModalArea>
      </Modal>
    );
  }
}