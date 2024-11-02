import { createReducer, on } from '@ngrx/store';
import { showNotification, hideNotification } from './global.actions';

export interface globalStateInterface {
  isShowNotification: boolean;
  notificationText: string;
  notificationIcon: string;
}

export const globalState: globalStateInterface = {
  isShowNotification: false,
  notificationText: '',
  notificationIcon: '',
};

const showNotificationReducer = (
  state: globalStateInterface,
  notificationText: string,
  notificationIcon: string
): globalStateInterface => {
  return {
    ...state,
    isShowNotification: true,
    notificationText,
    notificationIcon,
  };
};

export const globalReducer = createReducer(
  globalState,
  on(showNotification, (state, { notificationText, notificationIcon }) =>
    showNotificationReducer(state, notificationText, notificationIcon)
  ),
  on(hideNotification, (state) => ({ ...state, isShowNotification: false }))
);
