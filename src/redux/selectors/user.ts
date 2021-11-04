import { RootState } from 'redux/reducers';

export const getRootUser = (state: RootState) => state.user;
export const getUserId = (state: RootState) => state.user.profile.id;
export const getSnackBar = (state: RootState) => state.user.snackBar;
