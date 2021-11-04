import { action, createAsyncAction, ActionType } from 'typesafe-actions';
import { FailureResponse } from 'redux/types/spotify';
import {
  ReadPlaylistsSuccess,
  ReadCurrentPlaylistSuccess,
  ReadPlaylistTracksSuccess,
  ChangePlaylistRequest,
  ChangePlaylistSuccess,
  AddTrackToPlaylistRequest,
  AddTrackToPlaylistSuccess,
  DeleteTrackFromPlaylistRequest,
  DeleteTrackFromPlaylistSuccess,
} from 'redux/types/playlist';
import { PlaylistActionType } from 'redux/actionTypes/playlist';

// request actions
export const readPlaylists = createAsyncAction(
  PlaylistActionType.READ_PLAYLISTS_REQUEST,
  PlaylistActionType.READ_PLAYLISTS_SUCCESS,
  PlaylistActionType.READ_PLAYLISTS_FAILURE
)<undefined, ReadPlaylistsSuccess, FailureResponse>();

export const readCurrentPlaylist = createAsyncAction(
  PlaylistActionType.READ_CURRENT_PLAYLIST_REQUEST,
  PlaylistActionType.READ_CURRENT_PLAYLIST_SUCCESS,
  PlaylistActionType.READ_CURRENT_PLAYLIST_FAILURE
)<undefined, ReadCurrentPlaylistSuccess, FailureResponse>();

export const readPlaylistTracks = createAsyncAction(
  PlaylistActionType.READ_PLAYLIST_TRACKS_REQUEST,
  PlaylistActionType.READ_PLAYLIST_TRACKS_SUCCESS,
  PlaylistActionType.READ_PLAYLIST_TRACKS_FAILURE
)<undefined, ReadPlaylistTracksSuccess, FailureResponse>();

export const createPlaylist = createAsyncAction(
  PlaylistActionType.CREATE_PLAYLIST_REQUEST,
  PlaylistActionType.CREATE_PLAYLIST_SUCCESS,
  PlaylistActionType.CREATE_PLAYLIST_FAILURE
)<ChangePlaylistRequest, ChangePlaylistSuccess, FailureResponse>();

export const updatePlaylist = createAsyncAction(
  PlaylistActionType.UPDATE_PLAYLIST_REQUEST,
  PlaylistActionType.UPDATE_PLAYLIST_SUCCESS,
  PlaylistActionType.UPDATE_PLAYLIST_FAILURE
)<ChangePlaylistRequest, ChangePlaylistSuccess, FailureResponse>();

export const addTrackToPlaylist = createAsyncAction(
  PlaylistActionType.ADD_TRACK_TO_PLAYLIST_REQUEST,
  PlaylistActionType.ADD_TRACK_TO_PLAYLIST_SUCCESS,
  PlaylistActionType.ADD_TRACK_TO_PLAYLIST_FAILURE
)<AddTrackToPlaylistRequest, AddTrackToPlaylistSuccess, FailureResponse>();

export const deleteTrackFromPlaylist = createAsyncAction(
  PlaylistActionType.DELETE_TRACK_FROM_PLAYLIST_REQUEST,
  PlaylistActionType.DELETE_TRACK_FROM_PLAYLIST_SUCCESS,
  PlaylistActionType.DELETE_TRACK_FROM_PLAYLIST_FAILURE
)<
  DeleteTrackFromPlaylistRequest,
  DeleteTrackFromPlaylistSuccess,
  FailureResponse
>();

// simple actions
export const setCurrentPlaylist = (playlist: any) =>
  action(PlaylistActionType.SET_CURRENT_PLAYLIST, playlist);

export const clearCurrentPlaylist = () =>
  action(PlaylistActionType.CLEAR_CURRENT_PLAYLIST);

export const openCreatePlaylist = () =>
  action(PlaylistActionType.OPEN_CREATE_PLAYLIST);

export const closeCreatePlaylist = () =>
  action(PlaylistActionType.CLOSE_CREATE_PLAYLIST);

export const openUpdatePlaylist = () =>
  action(PlaylistActionType.OPEN_UPDATE_PLAYLIST);

export const closeUpdatePlaylist = () =>
  action(PlaylistActionType.CLOSE_UPDATE_PLAYLIST);

export type PlaylistAction = ActionType<
  // request
  | typeof readPlaylists
  | typeof readCurrentPlaylist
  | typeof readPlaylistTracks
  | typeof createPlaylist
  | typeof updatePlaylist
  | typeof addTrackToPlaylist
  | typeof deleteTrackFromPlaylist
  // simple
  | typeof setCurrentPlaylist
  | typeof clearCurrentPlaylist
  | typeof openCreatePlaylist
  | typeof closeCreatePlaylist
  | typeof openUpdatePlaylist
  | typeof closeUpdatePlaylist
>;
