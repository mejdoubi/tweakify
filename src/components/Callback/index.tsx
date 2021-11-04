import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ATTEMPT_LOGIN_RESPONSE } from 'redux/types/user';
import { attemptLogin } from 'redux/actions/user';
import Loader from '../Loader';

const Callback: React.FC<RouteComponentProps> = ({
  location,
  history,
}: RouteComponentProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.replace('#', '?'));
    let data: any = {};
    for (const [key, val] of params.entries()) {
      data[key] = val;
    }

    ATTEMPT_LOGIN_RESPONSE.forEach((key) => {
      if (!params.has(key)) {
        dispatch(attemptLogin.failure(data));
        history.push('/');
        return;
      }
    });

    dispatch(attemptLogin.success(data));
    history.push('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default withRouter(Callback);
