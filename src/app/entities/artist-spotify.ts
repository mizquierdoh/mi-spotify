import { ImageSpotify } from "./image-spotify";

export class ArtistSpotify {

  externalUrl: string;
  genres: string[];
  href: string;
  id: string;
  images: ImageSpotify[];
  name: string;
  uri: string;

  static parse(artistObject: any): ArtistSpotify {
    if (!artistObject) {
      return null;
    }
    let artist = new ArtistSpotify();
    artist.externalUrl = artistObject['externalUrl'];
    artist.genres = artistObject['genres'];
    artist.href = artistObject['href'];
    artist.id = artistObject['id'];
    artist.images = artistObject['images'].map(i => ImageSpotify.parse(i)).sort((a, b) => b.width - a.width);
    artist.name = artistObject['name'];
    artist.uri = artistObject['uri']
    return artist;
  }

  static parseWebPlaybackArtist(artist: any): ArtistSpotify {
    if (!artist) {
      return null;
    }
    let artistSpotify = new ArtistSpotify();
    artistSpotify.externalUrl = artist['external_urls']['spotify'];
    artistSpotify.genres = artist['genres'];
    artistSpotify.href = artist['href'];
    artistSpotify.id = artist['id'];
    if (!!artist['images']) {
      artistSpotify.images = artist['images'].map(i => ImageSpotify.parse(i)).sort((a, b) => b.width - a.width);
    }
    artistSpotify.name = artist['name'];
    artistSpotify.uri = artist['uri'];
    return artistSpotify;


  }

}
