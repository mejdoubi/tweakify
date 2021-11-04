import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { readTracks, clearTracks } from 'redux/actions/track';
import { addTrackToPlaylist } from 'redux/actions/playlist';
import { getIsFetching, getTracks } from 'redux/selectors/track';
import { getIsOwnerCurrentPlaylist } from 'redux/selectors/playlist';
import {
  FloatingRightIconButton,
  SmallCover,
  SmallTrackName,
} from 'components/Wrappers';

const SearchTracks: React.FC = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);
  const tracks = useSelector(getTracks);
  const isOwnerCurrentPlaylist = useSelector(getIsOwnerCurrentPlaylist);

  const handleInputChange = (event: any, value: string) => {
    if (!value) {
      dispatch(clearTracks());
      return;
    }
    if (value) {
      dispatch(
        readTracks.request({
          query: {
            q: value,
            type: 'track',
          },
        })
      );
    }
  };

  const handleAddTrack = (trackUri: string) =>
    dispatch(
      addTrackToPlaylist.request({
        query: {
          uris: trackUri,
        },
      })
    );

  return (
    <Autocomplete
      id="search-track"
      options={tracks}
      sx={{ width: 300 }}
      getOptionLabel={(option: any) => option.name}
      renderOption={(props, { id, album, name, uri }: any) => (
        <Paper key={id} variant="outlined" square>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={2}>
              <SmallCover
                alt={album.name}
                src={album.images.find((image: any) => image.height === 64).url}
              />
            </Grid>
            <Grid item xs={isOwnerCurrentPlaylist ? 8 : 10}>
              <SmallTrackName>{name}</SmallTrackName>
            </Grid>
            {isOwnerCurrentPlaylist && (
              <Grid item xs={2}>
                <FloatingRightIconButton onClick={() => handleAddTrack(uri)}>
                  <AddCircleOutlineOutlinedIcon />
                </FloatingRightIconButton>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a track"
          margin="dense"
          size="small"
          variant="outlined"
          color="secondary"
        />
      )}
      onInputChange={handleInputChange}
      loading={isFetching}
      disablePortal
      disableListWrap
      disableCloseOnSelect
      freeSolo
    />
  );
};

export default SearchTracks;
