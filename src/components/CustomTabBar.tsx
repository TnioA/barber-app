import React, { Component } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #4EADBE;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-radius: 35px;
  border: 3px solid #4EADBE;
  marginTop: -20px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default class CustomTabBar extends Component<any, any> {
  static contextType = UserContext;

  goTo(screenName: string){
    this.props.navigation.navigate(screenName);
  }

  render() {
    return (
      <TabArea>
        <TabItem onPress={()=> this.goTo('Home')}>
          <HomeIcon style={{opacity: this.props.state.index === 0 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></HomeIcon>
        </TabItem>
        <TabItem onPress={()=> this.goTo('Search')}>
          <SearchIcon style={{opacity: this.props.state.index === 1 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></SearchIcon>
        </TabItem>
        <TabItemCenter onPress={()=> this.goTo('Appointments')}>
          <TodayIcon width="32" height="32" fill="#4EADBE"></TodayIcon>
        </TabItemCenter>
        <TabItem onPress={()=> this.goTo('Favorites')}>
          <FavoriteIcon style={{opacity: this.props.state.index === 3 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></FavoriteIcon>
        </TabItem>
        <TabItem onPress={()=> this.goTo('Profile')}>
          {this.context.avatar !== '' ?
            <AvatarIcon source={{uri: this.context.avatar}}></AvatarIcon> :
            <AccountIcon style={{opacity: this.props.state.index === 4 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"></AccountIcon>
          }
        </TabItem>
      </TabArea>
    );
  }
}