import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import playlistSaga from './playlistSaga';
import trackSaga from './trackSaga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(playlistSaga), fork(trackSaga)]);
}
