import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FloatingRightIconButton } from 'components/Wrappers';
import {
  openUpdatePlaylist,
  closeUpdatePlaylist,
  updatePlaylist,
} from 'redux/actions/playlist';
import { getUpdate, getCurrentPlaylist } from 'redux/selectors/playlist';
import Form, { FormValues, NAME, DESCRIPTION } from './Form';

const EditPlaylist: React.FC = () => {
  const dispatch = useDispatch();
  const update = useSelector(getUpdate);
  const { open } = update;
  const { details } = useSelector(getCurrentPlaylist);

  const handleOpen = () => dispatch(openUpdatePlaylist());
  const handleClose = () => dispatch(closeUpdatePlaylist());
  const handleSubmit = (formValues: FormValues) =>
    dispatch(updatePlaylist.request(formValues));

  if (!details) return null;

  return (
    <>
      <Form
        defaultValues={{
          [NAME]: details[NAME],
          [DESCRIPTION]: details[DESCRIPTION],
        }}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <FloatingRightIconButton onClick={handleOpen}>
        <EditOutlinedIcon />
      </FloatingRightIconButton>
    </>
  );
};

export default EditPlaylist;
