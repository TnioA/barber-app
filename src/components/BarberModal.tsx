import React, { Component } from 'react';
import styled from 'styled-components/native';

import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';
import { Alert } from 'react-native';
import Api from '../Api';

const Modal = styled.Modal``;

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
  color: #000000;
`;

const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
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

const DateInfo = styled.View`
  flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TimeList = styled.ScrollView`

`;

const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const TimeItemText = styled.Text`
  font-size: 16px;
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
  state = {
    dayList: [],
    hourList: [],

    selectedYear: 0,
    selectedMonth: 0,
    selectedDay: 0,
    selectedHour: null,
  }

  componentDidMount(){
    var today = new Date(); 

    this.setState({
      selectedYear: today.getFullYear(),
      selectedMonth: today.getMonth(),
      selectedDay: today.getDate(),
    });
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot?:any){
    if(prevProps.barber !== this.props.barber || prevState.selectedMonth !== this.state.selectedMonth || 
        prevState.selectedYear !== this.state.selectedYear){
      this.changeDayList();
    }

    if(this.state.selectedDay > 0 && prevState.selectedDay !== this.state.selectedDay){
      this.changeHourList();
    }
  }

  handleLeftDateClick(){
    var mountDate = new Date(this.state.selectedYear, this.state.selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);

    this.setState({
      selectedYear: mountDate.getFullYear(),
      selectedMonth: mountDate.getMonth(),
      selectedDay: 1,
    });
  }

  handleRightDateClick(){
    var mountDate = new Date(this.state.selectedYear, this.state.selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);

    this.setState({
      selectedYear: mountDate.getFullYear(),
      selectedMonth: mountDate.getMonth(),
      selectedDay: 1,
    });
  }

  changeDayList(){
    let daysInMonthh = new Date(this.state.selectedYear, this.state.selectedMonth + 1, 0).getDate();
    var newListDays: any[] = [];

    this.setState({dayList: newListDays});
    for(let i = 1; i <= daysInMonthh; i++){
      let d = new Date(this.state.selectedYear, this.state.selectedMonth, i);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let selectedMonth = month < 10 ? `0${month}` : month;
      let selectedDay = day < 10 ? `0${day}` : day;
      let selectedDate = `${year}-${selectedMonth}-${selectedDay}`;

      let availability = this.props.barber.available.filter((x: any)=> x.date === selectedDate);

      newListDays.push({
        status: availability.length > 0,
        weekday: days[d.getDay()],
        number: i
      });
    }

    this.setState({dayList: newListDays, hourList: [], selectedDay: 0, selectedHour: 0});
  }

  changeHourList(){
    let d = new Date(this.state.selectedYear, this.state.selectedMonth, this.state.selectedDay);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let selectedMonth = month < 10 ? `0${month}` : month;
    let selectedDay = day < 10 ? `0${day}` : day;
    let selectedDate = `${year}-${selectedMonth}-${selectedDay}`;

    let availability = this.props.barber.available.filter((x: any)=> x.date === selectedDate);

    if(availability.length === 0)
      return;

    this.setState({hourList: availability[0].hours, selectedHour: null});
  }

  handleCloseButton(){
    this.props.setShow(false);
  }

  async handleFinishClick(){
    if(!this.props.barber.id || this.props.service === undefined){
      Alert.alert("Ops!", "Preencha todos os dados");
      return;
    }
    
    if(this.state.selectedYear === 0 || this.state.selectedMonth === 0 || 
        this.state.selectedDay === 0 || this.state.selectedHour === null){
          Alert.alert("Ops!", "Preencha todos os dados");
          return;
        }

    var response = await Api.setAppointment({
      barberId: this.props.barber.id,
      serviceId: this.props.service,
      year: this.state.selectedYear,
      month: this.state.selectedMonth,
      day: this.state.selectedDay,
      hour: this.state.selectedHour
    });
    if(!response.success)
      Alert.alert("Ops!", response.error);
    
    this.props.setShow(false);
    this.props.navigation.navigate('Appointments');
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
              <DateInfo>
                <DatePrevArea onPress={()=> this.handleLeftDateClick()}>
                  <NavPrevIcon width="35" height="35" fill="#000000" />
                </DatePrevArea>
                <DateTitleArea>
                  <DateTitle>{months[this.state.selectedMonth]} {this.state.selectedYear}</DateTitle>
                </DateTitleArea>
                <DateNextArea onPress={()=> this.handleRightDateClick()}>
                  <NavNextIcon width="35" height="35" fill="#000000" />
                </DateNextArea>
              </DateInfo>
              <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.dayList.map((item: any, key: number)=> (
                  <DateItem 
                    key={key} 
                    onPress={()=> item.status ? this.setState({selectedDay: item.number}) : null} 
                    style={{
                      opacity: item.status ? 1 : 0.5,
                      backgroundColor: item.number === this.state.selectedDay ? '#4EADBE' : '#FFFFFF'
                    }}
                  >
                    <DateItemWeekDay 
                      style={{color: item.number === this.state.selectedDay ? '#FFFFFF' : '#000000'}}
                    >{item.weekday}</DateItemWeekDay>
                    <DateItemNumber
                      style={{color: item.number === this.state.selectedDay ? '#FFFFFF' : '#000000'}}
                    >{item.number}</DateItemNumber>
                  </DateItem>
                ))}
              </DateList>
            </ModalItem>
            {this.state.selectedDay > 0 && this.state.hourList.length > 0 &&
              <ModalItem>
                <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.hourList.map((item: any, key: number)=> (
                    <TimeItem 
                      key={key} 
                      onPress={()=> this.setState({selectedHour: item})}
                      style={{
                        backgroundColor: item === this.state.selectedHour ? '#4EADBE' : '#FFFFFF'
                      }}
                    >
                      <TimeItemText
                        style={{
                          color: item === this.state.selectedHour ? '#FFFFFF' : '#000000',
                          fontWeight: item === this.state.selectedHour ? 'bold' : 'normal'
                        }}
                      >{item}</TimeItemText>
                    </TimeItem>
                  ))}
                </TimeList>
              </ModalItem>
            }
            <FinishButtom onPress={()=> this.handleFinishClick()}>
              <FinishButtomText>Finalizar Agendamento</FinishButtomText>
            </FinishButtom>
          </ModalBody>
        </ModalArea>
      </Modal>
    );
  }
}