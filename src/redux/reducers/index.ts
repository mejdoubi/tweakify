import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import trackReducer from './trackReducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  playlist: playlistReducer,
  track: trackReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
