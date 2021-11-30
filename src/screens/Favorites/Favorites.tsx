import React, { Component } from 'react';
import { Alert, RefreshControl } from 'react-native';
import Api from '../../Api';
import {
  Container,
  Scroller,
  BackButton,

  HeaderArea,
  HeaderTitle,
  ListArea,

  LoadingIcon
} from './Styles';

import BarberItem from '../../components/BarberItem';
import BackIcon from '../../assets/back.svg';

export default class Favorites extends Component<any, any> {
  state={
    barberList: [],
    loading: false,
    refreshing: false
  }

  componentDidMount(){
    this.getFavoriteBarbers();
  }

  async getFavoriteBarbers(){
    this.setState({loading: true, barberList: []});
    var response = await Api.getFavoritedBarbers();
    if(!response.success){
      this.setState({loading: false});
      Alert.alert('Ops!', 'Error'); 
      return;
    }

    this.setState({barberList: response.data, loading: false});
  }

  onRefresh(){
    this.setState({refreshing: false});
    this.getFavoriteBarbers();
  }

  handleBackButton(){
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Scroller refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=> this.onRefresh()} />
        }>
          <HeaderArea>
            <HeaderTitle numberOfLines={2}>Favoritos</HeaderTitle>
          </HeaderArea>
          {this.state.loading && <LoadingIcon size="large" color="#FFFFFF"></LoadingIcon>}
          <ListArea>
            {this.state.barberList.map((x: any, key: number) => (
              <BarberItem key={key} data={x} navigation={this.props.navigation} />
            ))}
          </ListArea>
        </Scroller>
        <BackButton onPress={()=> this.handleBackButton()}>
          <BackIcon width="44" height="44" fill="#FFFFFF" />
        </BackButton>
      </Container>
    );
  }
}