import { action, createAsyncAction, ActionType } from 'typesafe-actions';
import {
  AttemptLoginSuccess,
  AttemptLoginFailure,
  ReadUserProfileSuccess,
} from 'redux/types/user';
import { FailureResponse } from 'redux/types/spotify';
import { UserActionType } from 'redux/actionTypes/user';

// request actions
export const attemptLogin = createAsyncAction(
  UserActionType.ATTEMPT_LOGIN_REQUEST,
  UserActionType.ATTEMPT_LOGIN_SUCCESS,
  UserActionType.ATTEMPT_LOGIN_FAILURE
)<undefined, AttemptLoginSuccess, AttemptLoginFailure>();

export const readUserProfile = createAsyncAction(
  UserActionType.READ_USER_PROFILE_REQUEST,
  UserActionType.READ_USER_PROFILE_SUCCESS,
  UserActionType.READ_USER_PROFILE_FAILURE
)<undefined, ReadUserProfileSuccess, FailureResponse>();

// simple actions
export const changeThemeMode = () => action(UserActionType.CHANGE_THEME_MODE);

export const newSnackBar = (info: {
  id: string;
  message: string;
  error: boolean;
}) =>
  action(UserActionType.NEW_SNACK_BAR, {
    open: true,
    id: info.message,
    key: new Date().getTime(),
    message: info.message,
    error: info.error,
  });

export const closeSnackBar = () => action(UserActionType.CLOSE_SNACK_BAR);

export type UserAction = ActionType<
  // request
  | typeof attemptLogin
  | typeof readUserProfile
  // simple
  | typeof changeThemeMode
  | typeof newSnackBar
  | typeof closeSnackBar
>;
