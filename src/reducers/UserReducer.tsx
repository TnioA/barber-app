export interface initialState {
    signed: boolean;
    token: string;
    avatar: '',
    user: object;
    favorites: [],
    appointments: []
}

export const UserReducer = (state: any, action: any) => {
    switch(action.type){
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        break;
        default:
            return state;
    }
}