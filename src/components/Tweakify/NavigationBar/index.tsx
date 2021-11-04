import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeMode } from 'theme';
import AddPlaylist from '../PlaylistForm/AddPlaylist';
import SearchTracks from './SearchTracks';

interface NavigationBarProps {
  displayName: string | undefined;
  themeMode: ThemeMode;
  onChangeTheme: () => void;
}

const Title = styled(Typography)`
  margin-right: 20px;
`;

const Right = styled.div`
  margin-left: auto;
`;

const NavigationBar: React.FC<NavigationBarProps> = ({
  displayName,
  themeMode,
  onChangeTheme,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Title
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {!!displayName ? `TWEAKIFY | ${displayName}` : 'TWEAKIFY'}
          </Title>
          <SearchTracks />
          <Right>
            <AddPlaylist />
            <IconButton onClick={onChangeTheme}>
              {themeMode === ThemeMode.DARK ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Right>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
