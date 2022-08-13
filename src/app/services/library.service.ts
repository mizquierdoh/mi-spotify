import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumSpotify } from '../entities/album-spotify';
import { ArtistSpotify } from '../entities/artist-spotify';
import { ImageSpotify } from '../entities/image-spotify';
import { TrackSpotify } from '../entities/track-spotify';
import { SpotifyService } from './spotify.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  getTrack(id: string): TrackSpotify {
    return this.tracks.find(t => t.id === id);
  }

  artists: ArtistSpotify[] = [];
  albums: AlbumSpotify[] = [];
  tracks: TrackSpotify[] = [];
  currentObservable: Observable<any>;
  loaded: boolean = false;

  constructor(private spotifyService: SpotifyService, private storageService: StorageService) { }

  async loadLibrary(r?: boolean) {
    if (!r && this.loaded) {
      return;
    }
    let reload: boolean = !!r;
    const profileResponse = await this.spotifyService.getUserProfile();
    const user: string = profileResponse['id'];
    console.log(profileResponse);
    const artistsStorage = await this.storageService.get(user + "_artists");
    const albumsStorage = await this.storageService.get(user + "_albums");
    const tracksStorage = await this.storageService.get(user + "_tracks");
    if (!reload && !!artistsStorage && artistsStorage.length > 0) {
      this.artists = artistsStorage.map(a => ArtistSpotify.parse(a));
      console.log(this.artists);
    } else {
      reload = true;
    }
    if (!reload && !!albumsStorage && albumsStorage.length > 0) {
      this.albums = albumsStorage.map(a => AlbumSpotify.parse(a));
      console.log(this.albums);
    } else {
      reload = true;
    }
    if (!reload && !!tracksStorage && tracksStorage.length > 0) {
      this.tracks = tracksStorage.map(a => TrackSpotify.parse(a));
      console.log(this.tracks);
    } else {
      reload = true;
    }

    if (reload) {
      await this.buildLibrary(user);
    }
    this.loaded = true;
  }

  async buildLibrary(user: string) {
    this.artists = [];
    this.albums = [];
    this.tracks = [];

    let next: boolean = true;
    let after: string = null;
    while (next) {
      const artistResponse = await this.spotifyService.getFollowedArtists(after);
      next = !!artistResponse['artists']['cursors']['after'] && artistResponse['artists']['cursors']['after'].length > 0;
      if (next) {
        after = artistResponse['artists']['cursors']['after'];
      }
      artistResponse['artists']['items'].forEach(element => {
        let artist = new ArtistSpotify();
        artist.externalUrl = element['external_urls']['spotify'];
        artist.genres = element['genres'];
        artist.href = element['href'];
        artist.id = element['id'];
        artist.images = element['images'].map(image => {
          let img: ImageSpotify = new ImageSpotify();
          img.height = image['height'];
          img.width = image['width'];
          img.url = image['url'];
          return img;
        }).sort((a, b) => a.width - b.width);
        artist.name = element['name'];
        this.artists.push(artist);

      });
    }
    this.artists = this.artists.sort((a, b) => a.name > b.name ? 1 : -1);
    this.storageService.set(user + "_artists", this.artists);
    console.log(this.artists);

    for (const artist of this.artists) {
      next = true;
      let offset = 0;
      while (next) {
        const albumsResponse = await this.spotifyService.getArtistsAlbums(artist.id, offset);
        next = !!albumsResponse['next'];
        if (next) {
          offset += 5;
        }
        let albumsArtist: AlbumSpotify[] = albumsResponse['items'].map(element => {
          let album: AlbumSpotify = new AlbumSpotify();
          album.id = element['id'];
          album.name = element['name'];
          album.releaseDate = new Date(element['release_date']);
          album.artistId = artist.id;
          album.artistName = artist.name;
          album.externalUrl = element['external_urls']['spotify'];
          album.href = element['href'];
          album.images = element['images'].map(image => {
            let img: ImageSpotify = new ImageSpotify();
            img.height = image['height'];
            img.width = image['width'];
            img.url = image['url'];
            return img;
          }).sort((a, b) => a.width - b.width);
          return album;
        }).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
        this.albums = this.albums.concat(albumsArtist);
      }
    }
    console.log(this.albums);
    this.albums = this.albums.sort((a, b) => {
      if (a.artistName !== b.artistName) {
        return a.artistName < b.artistName ? -1 : 1;;
      }
      return a.releaseDate.getTime() - b.releaseDate.getTime();
    });

    this.storageService.set(user + "_albums", this.albums);


    for (const album of this.albums) {
      console.log(album);
      next = true;
      let offset = 0;
      while (next) {
        const tracksResponse = await this.spotifyService.getAlbumsTracks(album.id, offset);
        next = !!tracksResponse['next'];
        if (next) {
          offset += 50;
        }
        let tracksAlbum: TrackSpotify[] = tracksResponse['items'].map(element => {
          let track: TrackSpotify = new TrackSpotify();
          track.id = element['id'];
          track.name = element['name'];
          track.trackNumber = element['track_number'];
          track.discNumber = element['disc_number'];
          track.albumId = album.id;
          track.albumName = album.name;
          track.artistId = album.artistId;
          track.artistName = album.artistName;
          track.albumReleaseDate = album.releaseDate;
          track.externalURL = element['external_urls']['spotify'];
          track.href = element['href'];
          return track;
        }).sort((a, b) => {
          let diff = a.discNumber - b.discNumber;
          if (diff != 0) {
            return diff;
          }
          return a.trackNumber - b.trackNumber;
        });
        this.tracks = this.tracks.concat(tracksAlbum);
      }
    }
    this.tracks = this.tracks.sort((a, b) => {
      if (a.artistName !== b.artistName) {
        return a.artistName < b.artistName ? -1 : 1;;
      }
      if (a.albumReleaseDate.getTime() !== b.albumReleaseDate.getTime()) {
        return a.albumReleaseDate.getTime() - b.albumReleaseDate.getTime();
      }
      return b.trackNumber - a.trackNumber;

    });

    this.storageService.set(user + "_tracks", this.tracks);
  }

  getAlbum(albumId: string) {
    return this.albums.find(a => a.id === albumId);
  }

  getArtist(artistId: string) {
    return this.artists.find(a => a.id === artistId);
  }
}
