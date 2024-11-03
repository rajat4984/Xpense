import { createAction, props } from '@ngrx/store';

export const getUser = createAction(
  '[User] getUser',
  props<{ userId: string }>()
);
