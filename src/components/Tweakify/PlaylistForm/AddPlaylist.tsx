import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {
  openCreatePlaylist,
  closeCreatePlaylist,
  createPlaylist,
} from 'redux/actions/playlist';
import { getCreate } from 'redux/selectors/playlist';
import Form, { FormValues, NAME, DESCRIPTION } from './Form';

const defaultFormValues: FormValues = {
  [NAME]: '',
  [DESCRIPTION]: '',
};

const AddPlaylist: React.FC = () => {
  const dispatch = useDispatch();
  const create = useSelector(getCreate);
  const { open } = create;

  const formatValues = (formValues: FormValues) => {
    const { name, description } = formValues;
    return { name, description, public: false };
  };

  const handleOpen = () => dispatch(openCreatePlaylist());
  const handleClose = () => dispatch(closeCreatePlaylist());
  const handleSubmit = (formValues: FormValues) =>
    dispatch(createPlaylist.request(formatValues(formValues)));

  return (
    <>
      <Form
        defaultValues={defaultFormValues}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <IconButton sx={{ ml: 1 }} onClick={handleOpen}>
        <PlaylistAddIcon />
      </IconButton>
    </>
  );
};

export default AddPlaylist;
