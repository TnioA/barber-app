import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Api from '../../Api';
import Stars from '../../components/Stars';
import { 
  Container,
  Scroller,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  ServiceArea, 
  TestimonialArea,
  BackButton
} from './Styles';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';

export default class Barber extends Component<any, any> {
  state = {
    user: this.props.route.params,
    loading: false
  }

  componentDidMount(){
    this.getBarberInfo();

  }

  async getBarberInfo(){
    var response = await Api.getBarber(this.state.user.id);
    if(!response.success){
      Alert.alert("Ops!", response.error);
      return;
    }
    
    this.setState({user: response.data});
  }

  handleBackButton(){
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Scroller>
          {this.state.user.photos && this.state.user.photos.length > 0 ? 
            <Swiper 
              style={{height: 240}} 
              dot={<SwipeDot />} 
              activeDot={<SwipeDotActive />}
              paginationStyle={{top: 15, right: 15, bottom: undefined, left: undefined}}
              autoplay={true}
              >
                {this.state.user.photos.map((item: any, key: any)=> (
                  <SwipeItem key={key}>
                    <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                  </SwipeItem>
                ))} 
              </Swiper> :
            <FakeSwiper></FakeSwiper>
          }
          <PageBody>
            <UserInfoArea>
              <UserAvatar source={{uri: this.state.user.avatar}} />
              <UserInfo>

                <UserInfoName>{this.state.user.name}</UserInfoName>
                <Stars stars={this.state.user.stars} showNumber={true} />
              </UserInfo>
              <UserFavButton>
                <FavoriteIcon width="24" height="24" fill="#FF0000" />
              </UserFavButton>
            </UserInfoArea>
            <ServiceArea>

            </ServiceArea>
            <TestimonialArea>

            </TestimonialArea>
          </PageBody>
        </Scroller>
        <BackButton onPress={()=> this.handleBackButton()}>
          <BackIcon width="44" height="44" fill="#FFFFFF" />
        </BackButton>
      </Container>
    );
  }
}