import { call, put, all, debounce } from 'redux-saga/effects';
import qs from 'qs';
import spotifyApi from 'redux/apis/spotify';
import { readTracks } from 'redux/actions/track';

function* readTracksSaga(
  action: ReturnType<typeof readTracks.request>
): Generator {
  const query = qs.stringify(action.payload.query);
  try {
    const response: any = yield call(spotifyApi.get, `/search?${query}`);
    yield put(readTracks.success(response.data));
  } catch (e: any) {
    yield put(readTracks.failure({ error: e.message }));
  }
}

function* debounceReadTracksSaga() {
  yield debounce(500, readTracks.request, readTracksSaga);
}

function* trackSaga() {
  yield all([debounceReadTracksSaga()]);
}

export default trackSaga;
