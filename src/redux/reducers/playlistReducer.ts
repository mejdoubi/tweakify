import { mergeDeepRight } from 'ramda';
import { PlaylistAction } from 'redux/actions/playlist';
import { PlaylistActionType } from 'redux/actionTypes/playlist';

interface CurrentPlaylist {
  isFetching: boolean;
  details: any;
  tracks: any;
}

const defaultCurrentPlaylist = {
  isFetching: false,
  details: undefined,
  tracks: [],
};

interface CreateUpdatePlaylist {
  open: boolean;
  submitting: boolean;
  errors: {} | null;
  success: boolean;
}

const defaultCreateUpdate = {
  open: false,
  submitting: false,
  errors: null,
  success: false,
};

interface PlaylistState {
  isFetching: boolean;
  playlists: any;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  current: CurrentPlaylist;
  create: CreateUpdatePlaylist;
  update: CreateUpdatePlaylist;
}

const initialState = {
  isFetching: false,
  playlists: [],
  limit: 10,
  offset: 0,
  next: null,
  previous: null,
  current: defaultCurrentPlaylist,
  create: defaultCreateUpdate,
  update: defaultCreateUpdate,
};

const reducer = (
  state: PlaylistState = initialState,
  action: PlaylistAction
): PlaylistState => {
  const { type } = action;
  switch (type) {
    case PlaylistActionType.READ_PLAYLISTS_REQUEST:
      return mergeDeepRight(state, {
        isFetching: true,
      });

    case PlaylistActionType.READ_PLAYLISTS_SUCCESS:
      return mergeDeepRight(state, {
        isFetching: false,
        playlists: action.payload.items,
        limit: action.payload.limit,
        offset: action.payload.offset,
        next: action.payload.next,
        previous: action.payload.previous,
      });

    case PlaylistActionType.READ_PLAYLISTS_FAILURE:
      return mergeDeepRight(state, { isFetching: false });

    case PlaylistActionType.READ_CURRENT_PLAYLIST_REQUEST:
      return mergeDeepRight(state, {
        current: {
          isFetching: true,
        },
      });

    case PlaylistActionType.READ_CURRENT_PLAYLIST_SUCCESS:
      return mergeDeepRight(state, {
        current: {
          isFetching: false,
          details: action.payload,
        },
      });

    case PlaylistActionType.READ_CURRENT_PLAYLIST_FAILURE:
      return mergeDeepRight(state, { current: { isFetching: false } });

    case PlaylistActionType.READ_PLAYLIST_TRACKS_REQUEST:
      return mergeDeepRight(state, {
        current: {
          isFetching: true,
        },
      });

    case PlaylistActionType.READ_PLAYLIST_TRACKS_SUCCESS:
      return mergeDeepRight(state, {
        current: {
          isFetching: false,
          tracks: action.payload.items,
        },
      });

    case PlaylistActionType.READ_PLAYLIST_TRACKS_FAILURE:
      return mergeDeepRight(state, { current: { isFetching: false } });

    case PlaylistActionType.CREATE_PLAYLIST_REQUEST:
      return mergeDeepRight(state, {
        create: {
          submitting: true,
          errors: null,
          success: false,
        },
      });

    case PlaylistActionType.CREATE_PLAYLIST_SUCCESS:
      return mergeDeepRight(state, {
        create: {
          submitting: false,
          errors: null,
          success: true,
        },
      });

    case PlaylistActionType.CREATE_PLAYLIST_FAILURE:
      return mergeDeepRight(state, {
        create: {
          submitting: false,
          errors: action.payload,
          success: false,
        },
      });

    case PlaylistActionType.UPDATE_PLAYLIST_REQUEST: {
      return mergeDeepRight(state, {
        update: {
          submitting: true,
          errors: null,
          success: false,
        },
      });
    }

    case PlaylistActionType.UPDATE_PLAYLIST_SUCCESS: {
      return mergeDeepRight(state, {
        update: {
          submitting: false,
          errors: null,
          success: true,
        },
      });
    }

    case PlaylistActionType.UPDATE_PLAYLIST_FAILURE: {
      return mergeDeepRight(state, {
        update: {
          submitting: false,
          errors: action.payload,
          success: false,
        },
      });
    }

    case PlaylistActionType.CLEAR_CURRENT_PLAYLIST:
      return mergeDeepRight(state, {
        current: defaultCurrentPlaylist,
      });

    case PlaylistActionType.SET_CURRENT_PLAYLIST:
      return mergeDeepRight(state, {
        current: { details: action.payload },
      });

    case PlaylistActionType.OPEN_CREATE_PLAYLIST:
      return mergeDeepRight(state, {
        create: {
          ...defaultCreateUpdate,
          open: true,
        },
      });

    case PlaylistActionType.CLOSE_CREATE_PLAYLIST:
      return mergeDeepRight(state, {
        create: defaultCreateUpdate,
      });

    case PlaylistActionType.OPEN_UPDATE_PLAYLIST:
      return mergeDeepRight(state, {
        update: {
          ...defaultCreateUpdate,
          open: true,
        },
      });

    case PlaylistActionType.CLOSE_UPDATE_PLAYLIST:
      return mergeDeepRight(state, {
        update: defaultCreateUpdate,
      });

    default:
      return state;
  }
};

export default reducer;
