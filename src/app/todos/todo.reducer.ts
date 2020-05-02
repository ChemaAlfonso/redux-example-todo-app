import { createReducer, on } from '@ngrx/store';
import { crear, toggle, edit, remove, toggleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo';

export const initialState: Todo[] = [new Todo( 'Salvar al mundo' ),new Todo( 'Salvar al mundo 2' ),new Todo( 'Salvar al mundo 3' )];

const _todoReducer = createReducer(initialState,
  on(crear, (state, { texto })   => [...state, new Todo( texto )]),
  on(remove, (state, { id })     => state.filter( todo => todo.id !== id )),
  on(limpiarCompletados, (state) => state.filter( todo => !todo.completado )),
  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo
      }
    });
  }),
  on(toggleAll, (state, { completado }) => state.map( todo => ({...todo, completado }) )),
  on(edit, (state, { id, text }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ...todo,
          texto: text
        }
      } else {
        return todo
      }
    });
  })
);
//on( limpiarCompletados, (state) => state)
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
