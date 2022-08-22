import { SpotifyPlayerTrack, SpotifyWebPlaybackTrack } from "spotify-web-playback";

export class TrackSpotify {

  id: string;
  name: string;
  trackNumber: number;
  discNumber: number;
  albumId: string;
  albumName: string;
  albumReleaseDate: Date;
  artistId: string;
  artistName: string;
  externalURL: string;
  href: string;
  uri: string;
  image: string;

  static parse(trackObject: any): TrackSpotify {
    if (!trackObject) {
      return null;
    }
    let track = new TrackSpotify();
    track.id = trackObject['id'];
    track.name = trackObject['name'];
    track.trackNumber = trackObject['trackNumber'];
    track.discNumber = trackObject['discNumber'];
    track.albumId = trackObject['albumId'];
    track.albumName = trackObject['albumName'];
    track.albumReleaseDate = new Date(trackObject['releaseDate']);
    track.artistId = trackObject['artistId'];
    track.artistName = trackObject['artistName'];

    track.externalURL = trackObject['externalURL'];
    track.href = trackObject['href'];
    track.uri = trackObject['uri'];
    return track;
  }

  static parsePlayerTrack(track: SpotifyPlayerTrack): TrackSpotify {
    let trackSpotify: TrackSpotify = new TrackSpotify();
    if (!!track) {
      trackSpotify.artistName = track.artists[0];
      trackSpotify.id = track.id;
      trackSpotify.image = track.image;
      trackSpotify.name = track.name;
      trackSpotify.uri = track.uri;
    }
    return trackSpotify;
  }

  static parseWebPlaybackTrack(track: SpotifyWebPlaybackTrack): TrackSpotify {
    let trackSpotify: TrackSpotify = new TrackSpotify();
    if (!!track) {
      trackSpotify.albumId = track.album.uri.replace("spotify:album:", "");
      trackSpotify.albumName = track.album.name;
      trackSpotify.artistId = track.artists[0].uri.replace("spotify:artist:", "");
      trackSpotify.artistName = track.artists[0].name;
      trackSpotify.externalURL = "https://open.spotify.com/track/"
      trackSpotify.id = track.id;
      trackSpotify.name = track.name;
      trackSpotify.uri = track.uri;
    }
    return trackSpotify
  }
}
