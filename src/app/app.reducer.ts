import { Todo } from './todos/models/todo';
import { ActionReducerMap } from '@ngrx/store';

import { todoReducer } from './todos/todo.reducer';
import { filtroReducer } from './filtros/filtros.reducer';

import { filtrosValidos } from './filtros/filtros.actions';

export interface AppState {
  todos: Todo[],
  filtro: filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer
}
