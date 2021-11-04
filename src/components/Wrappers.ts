import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FloatingRightIconButton = styled(IconButton)`
  float: right;
`;

export const Track = styled(Paper)`
  margin-bottom: 10px;
`;

export const Cover = styled.img`
  height: 100%;
  vertical-align: middle;
  margin: 10px;
`;

export const SmallCover = styled.img`
  height: 100%;
  vertical-align: middle;
  margin: 5px;
  max-width: 32px;
`;

export const TrackName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const SmallTrackName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const Artists = styled.div`
  font-style: italic;
`;

export const ReleaseDate = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const Section = styled.div`
  padding: 20px 40px;
`;

export const Description = styled.div`
  margin-top: 2px;
  font-weight: bold;
`;
