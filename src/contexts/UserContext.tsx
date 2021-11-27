import React, { Component, createContext } from 'react';

export interface IinitialState {
    token: string;
    avatar: string,
    favorites: any[],
    appointments: any[],
    setToken(value: string): void,
    setAvatar(value: string): void,
    setFavorites(value: any[]): void,
    setAppointments(value: any[]): void;
}

export const UserContext = createContext<IinitialState>({} as IinitialState);

export default class UserContextProvider extends Component<any, any> {
  state = {
      token: '',
      avatar: '',
      favorites: [],
      appointments: []
  }

  setToken(value: string): void {
    this.setState({ token: value});
  }

  setAvatar(value: string): void {
      this.setState({ avatar: value});
  }

  setFavorites(value: any[]): void {
    this.setState({ favorites: value});
  }

  setAppointments(value: any[]): void {
    this.setState({ appointments: value});
  }
  
  render() {
      return (
          <UserContext.Provider 
            value={{
              ...this.state, 
              setToken: (value: any): void => this.setToken(value),
              setAvatar: (value: any): void => this.setAvatar(value),
              setFavorites: (value: any[]): void => this.setFavorites(value),
              setAppointments: (value: any[]): void => this.setAppointments(value)
            }}
          >
            {this.props.children}
          </UserContext.Provider>
      );
  }
}