import { mergeDeepRight } from 'ramda';
import { TrackAction } from 'redux/actions/track';
import { TrackActionType } from 'redux/actionTypes/track';

interface TrackState {
  isFetching: boolean;
  tracks: any;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

const initialState = {
  isFetching: false,
  tracks: [],
  limit: 100,
  offset: 0,
  next: null,
  previous: null,
};

const reducer = (
  state: TrackState = initialState,
  action: TrackAction
): TrackState => {
  const { type } = action;
  switch (type) {
    case TrackActionType.READ_TRACKS_REQUEST:
      return mergeDeepRight(state, {
        isFetching: true,
      });

    case TrackActionType.READ_TRACKS_SUCCESS: {
      const { tracks } = action.payload;
      return mergeDeepRight(state, {
        isFetching: false,
        tracks: tracks.items,
        limit: tracks.limit,
        offset: tracks.offset,
        next: tracks.next,
        previous: tracks.previous,
      });
    }

    case TrackActionType.READ_TRACKS_FAILURE:
      return mergeDeepRight(state, { isFetching: false });

    case TrackActionType.CLEAR_TRACKS:
      return mergeDeepRight(state, initialState);

    default:
      return state;
  }
};

export default reducer;
