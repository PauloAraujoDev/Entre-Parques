import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UnidadesConservacao } from '../core/models/unidades-conservacao/unidadesConservacao';

export const Create_UnitsConservation = 'Create_UnitsConservation';
export const Delete_UnitsConservation = 'Delete_UnitsConservation';

export class CreateUnitsConservation implements Action {
    readonly type = Create_UnitsConservation;

    constructor(public payload: UnidadesConservacao) { }
}

export class DeleteConservation implements Action {
    readonly type = Delete_UnitsConservation;

    constructor(public name: string) { }
}

export type Actions = CreateUnitsConservation | DeleteConservation;
