import React, { Component } from 'react';
import { Alert, Platform, RefreshControl } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Api from '../../Api';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  ListArea,

  LoadingIcon
} from './Styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import BarberItem from '../../components/BarberItem';

export default class Home extends Component<any, any> {
  state={
    locationField: undefined,
    coords: { latitude: undefined, longitude: undefined },
    barberList: [],
    loading: false,
    refreshing: false
  }

  componentDidMount(){
    this.getBarbers();
  }

  async handleLocationFinder(){
    this.setState({coords: null});

    var result = await request(
      Platform.OS === 'ios' ?
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if(result !== 'granted')
      return;

    this.setState({loading: true, locationField: undefined, barberList: []});
    Geolocation.getCurrentPosition((info)=> {
      this.setState({coords: info.coords}, ()=> {
        this.getBarbers();
      });
    });
  }

  async getBarbers(){
    this.setState({loading: true, barberList: []});

    var response = await Api.getBarbers(this.state.coords.latitude, this.state.coords.longitude, this.state.locationField);
    if(!response.success){
      this.setState({loading: false});
      Alert.alert('Ops!', 'Error'); 
      return;
    }

    this.setState({barberList: response.data, locationField: response.data.location, loading: false});
  }

  onRefresh(){
    this.setState({refreshing: false});
    this.getBarbers();
  }

  handleLocationSearch(){
    this.setState({coords: {}});
    this.getBarbers();
  }

  render() {
    return (
      <Container>
        <Scroller refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=> this.onRefresh()} />
        }>
          <HeaderArea>
            <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
            <SearchButton onPress={()=> this.props.navigation.navigate('Search')}>
              <SearchIcon width="26" height="26" fill="#FFFFFF" />
            </SearchButton>
          </HeaderArea>
          <LocationArea>
            <LocationInput 
              placeholder="Onde você está?" 
              placeholderTextColor="#FFFFFF" 
              value={this.state.locationField}
              onChangeText={(x: any)=> this.setState({locationField: x})}
              onEndEditing={()=> this.handleLocationSearch()}
            />
            <LocationFinder onPress={()=> this.handleLocationFinder()}>
              <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
            </LocationFinder>
          </LocationArea>
          {this.state.loading && <LoadingIcon size="large" color="#FFFFFF"></LoadingIcon>}
          <ListArea>
            {this.state.barberList.map((x: any, key: number) => (
              <BarberItem key={key} data={x} navigation={this.props.navigation} />
            ))}
          </ListArea>
        </Scroller>
      </Container>
    );
  }
}