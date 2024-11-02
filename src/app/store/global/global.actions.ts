import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
  '[Global] showNotification',
  props<{ notificationText: string; notificationIcon: string }>()
);

export const hideNotification = createAction('[Global] hideNotification');
