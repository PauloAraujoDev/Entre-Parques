import { UnidadesConservacao } from './core/models/unidades-conservacao/unidadesConservacao';
import { User } from './core/models/user/User';

export interface AppState {
    readonly unitsConservation: UnidadesConservacao[];
    readonly user: User;
}
