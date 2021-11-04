import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from 'redux/store';
import { history } from 'redux/reducers';
import App from 'App';

const Main: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<Main />, MOUNT_NODE);
