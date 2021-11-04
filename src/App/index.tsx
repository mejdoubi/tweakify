import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from 'redux/reducers';
import { theme } from 'theme';
import GlobaSnackBar from './GlobalSnackBar';

// routes
import Tweakify from 'components/Tweakify/';
import Callback from 'components/Callback/';

const App: React.FC = () => {
  const { themeMode } = useSelector((state: RootState) => state.user);

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Tweakify} />
        <Route exact path="/callback" component={Callback} />
      </Switch>
      <GlobaSnackBar />
    </ThemeProvider>
  );
};

export default App;
