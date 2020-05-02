import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] Crear todo',
  props<{ texto: string }>()
);

export const toggle = createAction(
  '[TODO] Toggle todo',
  props<{ id: number }>()
);

export const edit = createAction(
  '[TODO] Edit todo',
  props<{ id: number, text: string }>()
);

export const remove = createAction(
  '[TODO] Remove todo',
  props<{ id: number }>()
);

export const toggleAll = createAction(
  '[TODO] ToggleAll todo',
  props<{ completado: boolean }>()
);

export const limpiarCompletados = createAction('[TODO] LimpiarCompletados todo');

