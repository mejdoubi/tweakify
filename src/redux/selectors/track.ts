import { RootState } from 'redux/reducers';

export const getIsFetching = (state: RootState) => state.track.isFetching;
export const getTracks = (state: RootState) => state.track.tracks;
