import React, { Component, createContext } from 'react';

export interface IinitialState {
    token: string;
    avatar: string,
    favorites: any[],
    appointments: any[],
    setAvatar(value: string): void;
}

export const UserContext = createContext<IinitialState>({} as IinitialState);

export default class UserContextProvider extends Component<any, any> {
    state = {
        token: '',
        avatar: '',
        favorites: [],
        appointments: []
    }

    setAvatar(value: string): void {
        this.setState({ avatar: value});
    }
  
    render() {
        return (
            <UserContext.Provider value={{...this.state, setAvatar: (value: any): void => this.setAvatar(value)}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}