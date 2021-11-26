import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Api from '../../Api';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import { 
  Container,
  Scroller,
  PageBody,
  BackButton,
  LoadingIcon,

  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  FakeSwiper,

  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  
  ServiceArea, 
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,

  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,

  TestimonialArea
} from './Styles';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

export default class Barber extends Component<any, any> {
  state = {
    barber: this.props.route.params,
    favorited: false,
    selectedService: null,

    showModal: false,
    loading: true
  }

  componentDidMount(){
    this.getBarberInfo();

  }

  async getBarberInfo(){
    var response = await Api.getBarber(this.state.barber.id);
    if(!response.success){
      this.setState({loading: false});
      Alert.alert("Ops!", response.error);
      return;
    }
    this.setState({barber: response.data, loading: false, favorited: response.data.favorited});
  }

  handleBackButton(){
    this.props.navigation.goBack();
  }

  async handleFavClick(){
    // var response = await Api.favoriteBarber(this.state.barber.id);
    // if(!response.success)
    //   return;

    this.setState({ favorited: !this.state.favorited});
  }

  handleServiceChoose(key: any){

    console.log("bosta", key);
    this.setState({selectedService: key, showModal: true});
  }

  render() {
    return (
      <Container>
        <Scroller>
          {this.state.barber.photos && this.state.barber.photos.length > 0 ? 
            <Swiper 
              style={{height: 240}} 
              dot={<SwipeDot />} 
              activeDot={<SwipeDotActive />}
              paginationStyle={{top: 15, right: 15, bottom: undefined, left: undefined}}
              autoplay={true}
              >
                {this.state.barber.photos.map((item: any, key: any)=> (
                  <SwipeItem key={key}>
                    <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                  </SwipeItem>
                ))} 
              </Swiper> :
            <FakeSwiper></FakeSwiper>
          }
          <PageBody>
            <UserInfoArea>
              <UserAvatar source={{uri: this.state.barber.avatar}} />
              <UserInfo>

                <UserInfoName>{this.state.barber.name}</UserInfoName>
                <Stars stars={this.state.barber.stars} showNumber={true} />
              </UserInfo>
              <UserFavButton onPress={()=> this.handleFavClick()}>
                {this.state.favorited ?
                  <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
                  :
                  <FavoriteIcon width="24" height="24" fill="#FF0000" />
                }
              </UserFavButton>
            </UserInfoArea>
            {this.state.loading &&
              <LoadingIcon size="large" color="#000000" />
            }
            {this.state.barber.services && 
              <ServiceArea>            
                <ServicesTitle>Lista de serviços</ServicesTitle>
                {this.state.barber.services.map((item:any, key: any)=> (
                  <ServiceItem key={key}>
                    <ServiceInfo>
                      <ServiceName>{item.name}</ServiceName>
                      <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                    </ServiceInfo>
                    <ServiceChooseButton onPress={()=> this.handleServiceChoose(key)}>
                      <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                    </ServiceChooseButton>
                  </ServiceItem>
                ))}
              </ServiceArea>
            }
            {this.state.barber.testimonials && this.state.barber.testimonials.length > 0 &&
              <TestimonialArea>
                <Swiper
                  style={{height: 110}}
                  showsPagination={false}
                  showsButtons={true}
                  prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                  nextButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                >
                  {this.state.barber.testimonials.map((item: any, key: any)=> (
                    <TestimonialItem key={key}>
                      <TestimonialInfo>
                        <TestimonialName>{item.name}</TestimonialName>
                        <Stars stars={item.rate} showNumber={false} />
                      </TestimonialInfo>
                      <TestimonialBody>{item.body}</TestimonialBody>
                    </TestimonialItem>

                  ))}
                </Swiper>
              </TestimonialArea>
            }
          </PageBody>
        </Scroller>
        <BackButton onPress={()=> this.handleBackButton()}>
          <BackIcon width="44" height="44" fill="#FFFFFF" />
        </BackButton>

        <BarberModal 
          show={this.state.showModal} 
          setShow={(e: any)=> this.setState({showModal: e})} 
          barber={this.state.barber}
          service={this.state.selectedService}
        />
      </Container>
    );
  }
}