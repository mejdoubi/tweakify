import { call, put, takeEvery, all } from 'redux-saga/effects';
import spotifyApi from 'redux/apis/spotify';
import { attemptLogin, readUserProfile } from 'redux/actions/user';
import { saveState } from 'redux/localStorage';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'http://localhost:3000/callback';
const SCOPES = [
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
];

const navigateToExternalPage = (url: string) => {
  window.location.assign(url);
};

function* attemptLoginSaga() {
  const {
    REACT_APP_CLIENT_ID: CLIENT_ID,
    REACT_APP_CLIENT_SECRET: CLIENT_SECRET,
  } = process.env;
  if (!CLIENT_ID || !CLIENT_SECRET) {
    yield put(
      attemptLogin.failure({
        error: 'Something went wrong...',
      })
    );
    return;
  }

  const stateId = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`,
    'utf-8'
  ).toString('base64');

  const params = new URLSearchParams();
  params.set('client_id', CLIENT_ID);
  params.set('response_type', 'token');
  params.set('redirect_uri', REDIRECT_URL);
  params.set('scope', SCOPES.join(' '));
  params.set('state', stateId);

  const url = `${AUTH_URL}?${params.toString()}`;

  console.log(url);

  yield call(navigateToExternalPage, url);
}

function* attemptLoginSuccessSaga(
  action: ReturnType<typeof attemptLogin.success>
): Generator {
  yield call(saveState, 'USER_AUTH', action.payload);

  try {
    const response: any = yield call(spotifyApi.get, 'me');
    yield put(readUserProfile.success(response.data));
  } catch (e: any) {
    yield put(readUserProfile.failure({ error: e.message }));
  }
}

function* userSaga() {
  yield all([
    takeEvery(attemptLogin.request, attemptLoginSaga),
    takeEvery(attemptLogin.success, attemptLoginSuccessSaga),
  ]);
}

export default userSaga;
