import React, { Component } from 'react';
import { Alert, RefreshControl } from 'react-native';
import Api from '../../Api';
import {
  Container,
  Content,
  Scroller,
  BackButton,
  
  SearchArea,
  SearchInput,
  ListArea,

  LoadingIcon
} from './Styles';

import BarberItem from '../../components/BarberItem';
import BackIcon from '../../assets/back.svg';

export default class Search extends Component<any, any> {
  state={
    barberList: [],
    principalBarberList: [],
    searchField: '',

    loading: false,
    refreshing: false
  }

  componentDidMount(){
    this.getBarbers();
  }

  async getBarbers(){
    this.setState({loading: true, barberList: []});
    var response = await Api.getBarbers();
    if(!response.success){
      this.setState({loading: false});
      Alert.alert('Ops!', 'Error'); 
      return;
    }

    this.setState({
      barberList: response.data, 
      principalBarberList: response.data, 
      searchField: '',
      loading: false
    });
  }

  onRefresh(){
    this.setState({refreshing: false});
    this.getBarbers();
  }

  handleBackButton(){
    this.props.navigation.goBack();
  }

  handleSearchBarber(value: string){
    this.setState({searchField: value});

    if(value === ''){
      this.setState({barberList: this.state.principalBarberList});
      return;
    }

    var newList: any[] = [];
    newList = this.state.principalBarberList.filter((x: any)=> x.name.includes(value));
    this.setState({barberList: newList});
  }

  render() {
    return (
      <Container>
        <Content>
          <Scroller refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={()=> this.onRefresh()} />
          }>
            <SearchArea>
              <SearchInput 
                placeholder="Digite o nome do barbeiro" 
                placeholderTextColor="#FFFFFF" 
                value={this.state.searchField}
                onChangeText={(x: any)=> this.handleSearchBarber(x)}
              />
            </SearchArea>
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
        </Content>
      </Container>
    );
  }
}