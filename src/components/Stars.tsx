import React, { Component } from 'react';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';
import { floor } from 'react-native-reanimated';

const StarArea = styled.View`
  flex-direction: row;
`;

const StarView = styled.View`
`;

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

export default class Stars extends Component<any, any> {
  state = {
    stars: [0, 0, 0, 0, 0],
    floor: Math.floor(this.props.stars),
    left: this.props.stars - Math.floor(this.props.stars),
  }

  componentDidMount(){
    this.calculateFloor();
  }
  
  calculateFloor(){
    var starListAux = this.state.stars;
    for(var i=0;i<this.state.floor;i++){
      starListAux[i] = 2;
    }
    if(this.state.left > 0)
      starListAux[i] = 1;

    this.setState({stars: starListAux});
  }
  
  render() {
    return (
      <StarArea>
        {this.state.stars.map((x, index)=> (
          <StarView key={index}>
            {x === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
            {x === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
            {x === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
          </StarView>
          
        ))}
        {this.props.showNumber && <StarText>{this.props.stars}</StarText>}
      </StarArea>
    );
  }
}