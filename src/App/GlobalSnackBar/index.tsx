import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getSnackBar } from 'redux/selectors/user';
import { closeSnackBar } from 'redux/actions/user';

const GlobaSnackBar: React.FC = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector(getSnackBar);
  const { open, id, key, message, error } = snackBar;

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackBar());
  };

  return (
    <Snackbar
      id={id || 'snackbar'}
      key={key}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobaSnackBar;
