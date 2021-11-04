export interface ReadPlaylistsSuccess {
  href: string;
  items: any;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface ReadCurrentPlaylistSuccess {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: any;
  name: string;
  owner: any;
  public: boolean;
  snapshot_id: string;
  tracks: any;
  type: string;
  uri: string;
}

export interface ReadPlaylistTracksSuccess extends ReadPlaylistsSuccess {}

export interface ChangePlaylistRequest {
  name: string;
  description?: string | null;
}

export interface ChangePlaylistSuccess extends ChangePlaylistRequest {
  id: string;
}

export interface AddTrackToPlaylistRequest {
  query?: {
    uris: string;
  };
}

export interface AddTrackToPlaylistSuccess {
  uris: string;
  position: number;
}

export interface DeleteTrackFromPlaylistRequest {
  tracks: any;
  snapshot_id?: string;
}

export interface DeleteTrackFromPlaylistSuccess {
  snapshot_id: string;
}
