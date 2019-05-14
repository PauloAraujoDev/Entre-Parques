import { Action } from '@ngrx/store';
import { User } from '../core/models/user/User';


export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

export class CreateUser implements Action {
    readonly type = CREATE_USER;

    constructor(public payload: User) { }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;

    constructor(public name: string) { }
}

export type Actions = CreateUser | DeleteUser;
