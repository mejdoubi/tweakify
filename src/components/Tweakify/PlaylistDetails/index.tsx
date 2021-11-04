import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { FloatingRightIconButton } from 'components/Wrappers';
import { deleteTrackFromPlaylist } from 'redux/actions/playlist';
import {
  getCurrentPlaylist,
  getIsOwnerCurrentPlaylist,
} from 'redux/selectors/playlist';
import {
  Section,
  Track,
  Cover,
  TrackName,
  Artists,
  ReleaseDate,
} from 'components/Wrappers';

const PlaylistDetails: React.FC = () => {
  const dispatch = useDispatch();
  const current = useSelector(getCurrentPlaylist);
  const isOwnerCurrentPlaylist = useSelector(getIsOwnerCurrentPlaylist);

  const handleDeleteTrack = (trackUri: string) =>
    dispatch(
      deleteTrackFromPlaylist.request({
        tracks: [{ uri: trackUri }],
      })
    );

  return (
    <Section>
      {current.tracks &&
        current.tracks.map(
          ({ track: { id, album, name, artists, uri } }: any) => (
            <Track key={id} variant="outlined" square>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={2}>
                  <Cover
                    alt={album.name}
                    src={
                      album.images.find((image: any) => image.height === 64).url
                    }
                  />
                </Grid>
                <Grid item xs={isOwnerCurrentPlaylist ? 6 : 8}>
                  <TrackName>{name}</TrackName>
                  <Artists>
                    {artists.map((artist: any) => artist.name).join(', ')}
                  </Artists>
                </Grid>
                <Grid item xs={2}>
                  <ReleaseDate>{album.release_date}</ReleaseDate>
                </Grid>
                {isOwnerCurrentPlaylist && (
                  <Grid item xs={2}>
                    <FloatingRightIconButton
                      onClick={() => handleDeleteTrack(uri)}
                    >
                      <HighlightOffOutlinedIcon />
                    </FloatingRightIconButton>
                  </Grid>
                )}
              </Grid>
            </Track>
          )
        )}
    </Section>
  );
};

export default PlaylistDetails;
