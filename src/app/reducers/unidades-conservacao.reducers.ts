import { UnidadesConservacao } from '../core/models/unidades-conservacao/unidadesConservacao';
import { Actions, Create_UnitsConservation, Delete_UnitsConservation } from '../actions/unidades-conservacao.action';
import { data } from '../core/data/data';

const initialState: UnidadesConservacao = {
    id: '',
    name: '',
    description: '',
    state: '',
    pathImage: [],
    position: { latitude: 0, longitude : 0},
    attractive:  [{ label: '', description: '', image: ''}],
    warnings: [{ label: '', description: '', image: ''}]
};

export function reducerUnits(state: UnidadesConservacao[] = [initialState], action: Actions) {
    switch (action.type) {
        case Create_UnitsConservation:
            return [...state, action.payload];

        case Delete_UnitsConservation:
            return state.filter(({ name }) => name !== action.name);

        default:
            return state;
    }
}
