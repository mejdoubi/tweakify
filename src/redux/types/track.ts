export interface ReadTracksRequest {
  query?: {
    q: string;
    type: string;
    include_external?: string;
    limit?: number;
    market?: string;
    offset?: number;
  };
}

export interface ReadTracksSuccess {
  tracks: any;
  artists: any;
  albums: any;
  playlists: any;
  shows: any;
  episodes: any;
}
