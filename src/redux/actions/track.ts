import { action, createAsyncAction, ActionType } from 'typesafe-actions';
import { FailureResponse } from 'redux/types/spotify';
import { ReadTracksRequest, ReadTracksSuccess } from 'redux/types/track';
import { TrackActionType } from 'redux/actionTypes/track';

// request actions
export const readTracks = createAsyncAction(
  TrackActionType.READ_TRACKS_REQUEST,
  TrackActionType.READ_TRACKS_SUCCESS,
  TrackActionType.READ_TRACKS_FAILURE
)<ReadTracksRequest, ReadTracksSuccess, FailureResponse>();

// simple actions
export const clearTracks = () => action(TrackActionType.CLEAR_TRACKS);

export type TrackAction = ActionType<
  // request
  | typeof readTracks
  // simple
  | typeof clearTracks
>;
