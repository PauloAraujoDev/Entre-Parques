import { UnidadesConservacao } from '../core/models/unidades-conservacao/unidadesConservacao';

import { User } from '../core/models/user/User';
import { CREATE_USER, DELETE_USER, Actions } from '../actions/user.actions';


const initialState: User = {
    id: '',
    idToken: '',
    name: '',
    image: '',
    provider: '',
    token: ''
};

export function reducerUser(state: User = initialState, action: Actions) {
    switch (action.type) {
        case CREATE_USER:
            return  action.payload;

        case DELETE_USER:
            return undefined;

        default:
            return state;
    }
}
