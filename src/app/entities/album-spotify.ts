import { ImageSpotify } from "./image-spotify";

export class AlbumSpotify {

  id: string;
  name: string;
  releaseDate: Date;
  artistId: string;
  artistName: string;
  externalUrl: string;
  href: string;
  uri: string;
  images: ImageSpotify[];
  excluded: boolean;

  static parse(albumObject: any): AlbumSpotify {
    if (!albumObject) {
      return null;
    }
    let album = new AlbumSpotify();
    album.id = albumObject['id'];
    album.name = albumObject['name'];
    album.releaseDate = new Date(albumObject['releaseDate']);
    album.artistId = albumObject['artistId'];
    album.artistName = albumObject['artistName'];
    album.externalUrl = albumObject['externalUrl'];
    album.href = albumObject['href'];
    album.uri = albumObject['uri'];
    album.excluded = albumObject['excluded'];
    album.images = albumObject['images'].map(i => ImageSpotify.parse(i)).sort((a, b) => b.width - a.width);
    return album;
  }

  static parseWebPlaybackAlbum(album: any): AlbumSpotify {
    let albumSpotify = new AlbumSpotify();
    if (!!album) {
      albumSpotify.externalUrl = album['external_urls']['spotify'];
      albumSpotify.href = album['href'];
      albumSpotify.id = album['id'];
      albumSpotify.images = album['images'].map(img => ImageSpotify.parse(img)).sort((a, b) => b['width'] - a['width']);
      albumSpotify.name = album['name'];
      albumSpotify.releaseDate = new Date(album['release_date']);
      albumSpotify.uri = album['uri'];
    }
    return albumSpotify;
  }
}
