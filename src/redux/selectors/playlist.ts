import { RootState } from 'redux/reducers';
import { getUserId } from './user';

export const getPlaylists = (state: RootState) => state.playlist.playlists;
export const getCreate = (state: RootState) => state.playlist.create;
export const getUpdate = (state: RootState) => state.playlist.update;
export const getCurrentPlaylist = (state: RootState) => state.playlist.current;
export const getCurrentPlaylistDetails = (state: RootState) =>
  state.playlist.current.details;
export const getCurrentPlaylistDescription = (state: RootState) =>
  !!getCurrentPlaylistDetails(state)
    ? getCurrentPlaylistDetails(state).description
    : undefined;
export const getCurrentPlaylistId = (state: RootState) =>
  !!getCurrentPlaylistDetails(state)
    ? getCurrentPlaylistDetails(state).id
    : undefined;
export const getCurrentPlaylistOwnerId = (state: RootState) =>
  !!getCurrentPlaylistDetails(state)
    ? getCurrentPlaylistDetails(state).owner.id
    : undefined;
export const getIsOwnerCurrentPlaylist = (state: RootState) =>
  getUserId(state) === getCurrentPlaylistOwnerId(state) || false;
