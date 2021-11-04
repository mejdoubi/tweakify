import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  setCurrentPlaylist,
  clearCurrentPlaylist,
  readPlaylistTracks,
} from 'redux/actions/playlist';
import {
  getPlaylists,
  getCurrentPlaylistDescription,
  getIsOwnerCurrentPlaylist,
} from 'redux/selectors/playlist';
import { Section, Description } from 'components/Wrappers';

import EditPlaylist from '../PlaylistForm/EditPlaylist';

const SelectPlaylist: React.FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(getPlaylists);
  const description = useSelector(getCurrentPlaylistDescription);
  const isOwnerCurrentPlaylist = useSelector(getIsOwnerCurrentPlaylist);

  const handleChange = (event: any, value: any) => {
    if (!value) {
      dispatch(clearCurrentPlaylist());
      return;
    }
    dispatch(setCurrentPlaylist(value));
    dispatch(readPlaylistTracks.request());
  };

  return (
    <Section>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <Autocomplete
            id="select-playlist"
            options={playlists}
            sx={{ width: 300 }}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a playlist"
                margin="dense"
                size="small"
                variant="outlined"
                color="secondary"
              />
            )}
            onChange={handleChange}
            disablePortal
            disableListWrap
          />
        </Grid>
        <Grid item xs={isOwnerCurrentPlaylist ? 6 : 8}>
          <Description>{description}</Description>
        </Grid>
        {isOwnerCurrentPlaylist && (
          <Grid item xs={2}>
            <EditPlaylist />
          </Grid>
        )}
      </Grid>
    </Section>
  );
};

export default SelectPlaylist;
