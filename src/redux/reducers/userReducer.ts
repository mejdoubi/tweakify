import { mergeDeepRight } from 'ramda';
import { ThemeMode } from 'theme';
import { UserAction } from 'redux/actions/user';
import { UserActionType } from 'redux/actionTypes/user';

interface UserState {
  themeMode: ThemeMode;
  snackBar: {
    open: boolean;
    id: string | undefined;
    key: any;
    message: string | undefined;
    error: boolean;
  };
  auth: {
    logging: boolean;
    loggedIn: boolean;
    error: boolean;
  };
  profile: {
    fetching: boolean;
    error: boolean;
    displayName: string | undefined;
    id: string | undefined;
  };
}

const initialState = {
  themeMode: window.matchMedia('(prefers-color-scheme: dark)')
    ? ThemeMode.DARK
    : ThemeMode.LIGHT,
  snackBar: {
    open: false,
    id: undefined,
    key: null,
    message: undefined,
    error: false,
  },
  auth: {
    logging: false,
    loggedIn: false,
    error: false,
  },
  profile: {
    fetching: false,
    error: false,
    displayName: undefined,
    id: undefined,
  },
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionType.ATTEMPT_LOGIN_REQUEST:
      return mergeDeepRight(state, {
        auth: {
          logging: true,
          loggedIn: false,
          error: false,
        },
      });

    case UserActionType.ATTEMPT_LOGIN_SUCCESS:
      return mergeDeepRight(state, {
        auth: {
          logging: false,
          loggedIn: true,
          error: false,
        },
      });

    case UserActionType.ATTEMPT_LOGIN_FAILURE:
      return mergeDeepRight(state, {
        auth: {
          logging: false,
          loggedIn: false,
          error: true,
        },
      });

    case UserActionType.READ_USER_PROFILE_REQUEST:
      return mergeDeepRight(state, {
        profile: {
          fetching: true,
        },
      });

    case UserActionType.READ_USER_PROFILE_SUCCESS:
      return mergeDeepRight(state, {
        profile: {
          fetching: false,
          displayName: action.payload.display_name,
          id: action.payload.id,
        },
      });

    case UserActionType.READ_USER_PROFILE_FAILURE:
      return mergeDeepRight(state, {
        profile: {
          fetching: false,
          error: true,
        },
      });

    case UserActionType.CHANGE_THEME_MODE:
      return mergeDeepRight(state, {
        themeMode:
          state.themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK,
      });

    case UserActionType.NEW_SNACK_BAR:
      return mergeDeepRight(state, {
        snackBar: action.payload,
      });

    case UserActionType.CLOSE_SNACK_BAR:
      return mergeDeepRight(state, {
        snackBar: { open: false },
      });

    default:
      return state;
  }
};

export default reducer;
