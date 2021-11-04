import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeThemeMode, attemptLogin } from 'redux/actions/user';
import { getRootUser } from 'redux/selectors/user';
import Loader from 'components/Loader';
import Error from 'components/Error';
import NavigationBar from './NavigationBar';
import SelectPlaylist from './SelectPlaylist';
import PlaylistDetails from './PlaylistDetails';

const Tweakify: React.FC = () => {
  const dispatch = useDispatch();
  const { themeMode, auth, profile } = useSelector(getRootUser);
  const { logging, loggedIn, error } = auth;
  const { displayName } = profile;

  useEffect(() => {
    if (!logging && !loggedIn && !error) dispatch(attemptLogin.request());
  }, [logging, loggedIn, error, dispatch]);

  if (logging) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <NavigationBar
        displayName={displayName}
        themeMode={themeMode}
        onChangeTheme={() => dispatch(changeThemeMode())}
      />
      <SelectPlaylist />
      <PlaylistDetails />
    </>
  );
};

export default Tweakify;
