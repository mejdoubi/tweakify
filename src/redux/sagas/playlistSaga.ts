import {
  call,
  put,
  takeEvery,
  all,
  select,
  debounce,
} from 'redux-saga/effects';
import qs from 'qs';
import spotifyApi from 'redux/apis/spotify';
import { readUserProfile, newSnackBar } from 'redux/actions/user';
import {
  readPlaylists,
  readCurrentPlaylist,
  readPlaylistTracks,
  createPlaylist,
  updatePlaylist,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  closeCreatePlaylist,
  closeUpdatePlaylist,
} from 'redux/actions/playlist';
import { getCurrentPlaylistId } from 'redux/selectors/playlist';
import { getUserId } from 'redux/selectors/user';

function* readPlaylistsSaga(): Generator {
  try {
    const response: any = yield call(spotifyApi.get, '/me/playlists');
    yield put(readPlaylists.success(response.data));
  } catch (e: any) {
    yield put(readPlaylists.failure({ error: e.message }));
  }
}

function* readCurrentPlaylistSaga(): Generator {
  const playlistId = yield select(getCurrentPlaylistId);
  try {
    const response: any = yield call(
      spotifyApi.get,
      `/playlists/${playlistId}`
    );
    yield put(readCurrentPlaylist.success(response.data));
  } catch (e: any) {
    yield put(readCurrentPlaylist.failure({ error: e.message }));
  }
}

function* readPlaylistTracksSaga(): Generator {
  const playlistId = yield select(getCurrentPlaylistId);
  try {
    const response: any = yield call(
      spotifyApi.get,
      `/playlists/${playlistId}/tracks`
    );
    yield put(readPlaylistTracks.success(response.data));
  } catch (e: any) {
    yield put(readPlaylistTracks.failure({ error: e.message }));
  }
}

function* createPlaylistSaga(
  action: ReturnType<typeof createPlaylist.request>
): Generator {
  const userId = yield select(getUserId);
  try {
    const response: any = yield call(
      spotifyApi.post,
      `/users/${userId}/playlists`,
      action.payload
    );
    yield put(closeCreatePlaylist());
    yield put(createPlaylist.success(response.data));
    yield put(
      newSnackBar({
        id: 'create-playlist',
        message: 'New Playlist Created',
        error: false,
      })
    );
  } catch (e: any) {
    yield put(createPlaylist.failure({ error: e.message }));
  }
}

function* updatePlaylistSaga(
  action: ReturnType<typeof updatePlaylist.request>
): Generator {
  const playlistId = yield select(getCurrentPlaylistId);
  try {
    const response: any = yield call(
      spotifyApi.put,
      `/playlists/${playlistId}`,
      action.payload
    );
    yield put(closeUpdatePlaylist());
    yield put(updatePlaylist.success(response.data));
    yield put(
      newSnackBar({
        id: 'update-playlist',
        message: 'Playlist Updated',
        error: false,
      })
    );
  } catch (e: any) {
    yield put(updatePlaylist.failure({ error: e.message }));
  }
}

function* addTrackToPlaylistSaga(
  action: ReturnType<typeof addTrackToPlaylist.request>
): Generator {
  const playlistId = yield select(getCurrentPlaylistId);
  const query = qs.stringify(action.payload.query);
  try {
    const response: any = yield call(
      spotifyApi.post,
      `/playlists/${playlistId}/tracks?${query}`
    );
    yield put(addTrackToPlaylist.success(response.data));
    yield put(
      newSnackBar({
        id: 'add-track-to-playlist',
        message: 'Added Track to Playlist',
        error: false,
      })
    );
  } catch (e: any) {
    yield put(addTrackToPlaylist.failure({ error: e.message }));
  }
}

function* debounceAddTrackToPlaylistSaga() {
  yield debounce(300, addTrackToPlaylist.request, addTrackToPlaylistSaga);
}

function* deleteTrackFromPlaylistSaga(
  action: ReturnType<typeof deleteTrackFromPlaylist.request>
): Generator {
  const playlistId = yield select(getCurrentPlaylistId);
  try {
    const response: any = yield call(
      spotifyApi.delete,
      `/playlists/${playlistId}/tracks`,
      { data: action.payload }
    );
    yield put(deleteTrackFromPlaylist.success(response.data));
    yield put(
      newSnackBar({
        id: 'delete-track-from-playlist',
        message: 'Deleted Track from Playlist',
        error: false,
      })
    );
  } catch (e: any) {
    yield put(deleteTrackFromPlaylist.failure({ error: e.message }));
  }
}

function* debounceDeleteTrackFromPlaylistSaga() {
  yield debounce(
    300,
    deleteTrackFromPlaylist.request,
    deleteTrackFromPlaylistSaga
  );
}
function* playlistSaga() {
  yield all([
    takeEvery(readUserProfile.success, readPlaylistsSaga),
    takeEvery(readPlaylists.request, readPlaylistsSaga),
    takeEvery(createPlaylist.request, createPlaylistSaga),
    takeEvery(createPlaylist.success, readPlaylistsSaga),
    takeEvery(updatePlaylist.request, updatePlaylistSaga),
    takeEvery(updatePlaylist.success, readPlaylistsSaga),
    takeEvery(updatePlaylist.success, readCurrentPlaylistSaga),
    debounceAddTrackToPlaylistSaga(),
    debounceDeleteTrackFromPlaylistSaga(),
    // refetch current playlist tracks
    takeEvery(readPlaylistTracks.request, readPlaylistTracksSaga),
    takeEvery(addTrackToPlaylist.success, readPlaylistTracksSaga),
    takeEvery(deleteTrackFromPlaylist.success, readPlaylistTracksSaga),
  ]);
}

export default playlistSaga;
