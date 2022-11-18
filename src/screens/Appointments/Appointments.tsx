import React, { Component } from 'react';
import { Alert, RefreshControl } from 'react-native';
import Api from '../../Api';
import {
  Container,
  Scroller,
  ListArea,
  LoadingIcon
} from './Styles';

import AppointmentItem from '../../components/AppointmentItem';

export default class Appointments extends Component<any, any> {
  state={
    appointmentList: [],
    loading: false,
    refreshing: false
  }

  componentDidMount(){
    this.getAppointments();
  }

  async getAppointments(){
    this.setState({loading: true, barberList: []});
    var response = await Api.getAppointments();
    if(!response.success){
      this.setState({loading: false});
      Alert.alert('Ops!', 'Error'); 
      return;
    }

    response.data = response.data.sort(function (a, b) {
      if (new Date(`${a.date.date}T${a.date.hour}`) > new Date(`${b.date.date}T${b.date.hour}`)) {
        return 1;
      }
      if (new Date(`${a.date.date}T${a.date.hour}`) < new Date(`${b.date.date}T${b.date.hour}`)) {
        return -1;
      }
      return 0;
    }).reverse();

    this.setState({appointmentList: response.data, loading: false});
  }

  onRefresh(){
    this.setState({refreshing: false});
    this.getAppointments();
  }

  render() {
    return (
      <Container>
        <Scroller refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=> this.onRefresh()} />
        }>
          {this.state.loading && <LoadingIcon size="large" color="#FFFFFF"></LoadingIcon>}
          <ListArea>
            {this.state.appointmentList.map((item: any, key: number) => (
              <AppointmentItem key={key} data={item} navigation={this.props.navigation} />
            ))}
          </ListArea>
        </Scroller>
      </Container>
    );
  }
}