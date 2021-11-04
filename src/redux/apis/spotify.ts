import axios from 'axios';
import { identity } from 'ramda';
import store from 'redux/store';
import { attemptLogin } from 'redux/actions/user';
import { loadState } from 'redux/localStorage';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_URL,
  timeout: 10000,
});

spotifyApi.interceptors.request.use(function (config) {
  const { access_token: token } = loadState('USER_AUTH');

  if (!!token && !!config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, Promise.reject);

spotifyApi.interceptors.response.use(identity, function (error) {
  const status = error.status || error.response.status;
  // bad or expired token
  if (status === 401) {
    const { dispatch } = store;
    dispatch(attemptLogin.request());
  }
  return Promise.reject(error);
});

export default spotifyApi;
