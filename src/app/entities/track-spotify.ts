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
    track.albumReleaseDate = trackObject['albumReleaseDate'];
    track.artistId = trackObject['artistId'];
    track.artistName = trackObject['artistName'];
    track.image = trackObject['image'];
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

  static parseWebPlaybackTrack(track: any): TrackSpotify {
    let trackSpotify: TrackSpotify = new TrackSpotify();
    if (!!track) {
      trackSpotify.albumId = track['album']['id'];
      trackSpotify.albumName = track['album']['name'];
      trackSpotify.albumReleaseDate = new Date(track['album']['release_date']);
      trackSpotify.artistId = track['artists'][0]['id'];
      trackSpotify.artistName = track['artists'][0]['name'];
      trackSpotify.discNumber = track['disc_number'];
      trackSpotify.externalURL = track['external_urls']['spotify'];
      trackSpotify.href = track['href'];
      trackSpotify.id = track['id'];
      trackSpotify.image = track['album']['images'].sort((a, b) => b['width'] - a['width'])[0].url;
      trackSpotify.name = track['name'];
      trackSpotify.uri = track['uri'];
      trackSpotify.trackNumber = track['track_number'];
    }
    return trackSpotify;
  }
}
