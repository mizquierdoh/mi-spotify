import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { AlbumSpotify } from '../entities/album-spotify';
import { ArtistSpotify } from '../entities/artist-spotify';
import { Cargando } from '../entities/cargando';
import { ImageSpotify } from '../entities/image-spotify';
import { TrackSpotify } from '../entities/track-spotify';
import { GptService } from './gpt.service';
import { MusicStoryService } from './music-story.service';
import { SpotifyService } from './spotify.service';
import { StorageService } from './storage.service';

const ALBUMS_DIRECTO: string[] = [
  // AC/DC
  '1dmBXO2zmCbsf8qAicqbs0', // Live - 1992
  // Baby Metal
  '75XBzgU4127dLsTz7r7Cn2', // Live at Wembley - 2016
  // Celtas Cortos
  '6jZEjwGAaF0MJHQ73nymWY', // Vivos & Directos - 2012
  //DIO
  '62q6pepbuikdmXC0GgrgmD', // Sacred Heart - 1985
  // King Crimson 
  '0VMADiePYCgnZR5eH8iWHl', // USA(Live) - 2021
  '3geEhXhmMtb7iidsENVBKf', // Heavy ConstruKction (Live in Europe, 2000) - 2018
];

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
  building: boolean = false;
  cargando: Cargando;

  constructor(private spotifyService: SpotifyService,
    private storageService: StorageService,
    private gptService: GptService) { }

  async clearLibrary() {
    const profileResponse = await this.spotifyService.getUserProfile();
    const user: string = profileResponse['id'];

    this.storageService.set(user + "_artists", null);
    this.storageService.set(user + "_albums", null);
    this.storageService.set(user + "_tracks", null);
  }
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
    this.building = true;
    this.artists = [];
    this.albums = [];
    this.cargando = new Cargando();
    let mensaje = "Todo ok";

    try {
      let next: boolean = true;
      let after: string = null;
      while (next) {
        const artistResponse = await this.spotifyService.getFollowedArtists(after);
        next = !!artistResponse['artists']['cursors']['after'] && artistResponse['artists']['cursors']['after'].length > 0;
        if (next) {
          after = artistResponse['artists']['cursors']['after'];
        }
        artistResponse['artists']['items'].forEach((element, index, array) => {
          let artist = new ArtistSpotify();
          artist.externalUrl = element['external_urls']['spotify'];
          artist.genres = element['genres'];
          artist.href = element['href'];
          artist.id = element['id'];
          artist.uri = element['uri'];
          artist.images = element['images'].map(image => {
            let img: ImageSpotify = new ImageSpotify();
            img.height = image['height'];
            img.width = image['width'];
            img.url = image['url'];
            return img;
          }).sort((a, b) => b.width - a.width);
          artist.name = element['name'];
          this.artists.push(artist);

        });
      }
      this.artists = this.artists.sort((a, b) => a.name > b.name ? 1 : -1);
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
          let albumsArtist: AlbumSpotify[] = albumsResponse['items'].map((element, index, array) => {
            let album: AlbumSpotify = new AlbumSpotify();
            album.id = element['id'];
            album.name = element['name'];
            album.releaseDate = new Date(element['release_date']);
            album.artistId = artist.id;
            album.artistName = artist.name;
            album.externalUrl = element['external_urls']['spotify'];
            album.href = element['href'];
            album.uri = element['uri'];
            album.images = element['images'].map(image => {
              let img: ImageSpotify = new ImageSpotify();
              img.height = image['height'];
              img.width = image['width'];
              img.url = image['url'];
              return img;
            }).sort((a, b) => b.width - a.width);
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

      const savedAlbums: string[] = (await this.storageService.get(user + "_albums")).map(a => a['id']);
      const notSavedAlbums: AlbumSpotify[] = this.albums.filter(a => !savedAlbums.includes(a.id));
      for (const album of notSavedAlbums) {
        console.log(album);
        this.cargando.album = album.name;
        this.cargando.artist = album.artistName;
        next = true;
        let offset = 0;
        if (this.tracks.find(t => t.albumId === album.id)) {
          continue;
        }
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
            if (!!album.images && album.images.length > 0 && !!album.images[0].url) {
              track.image = album.images[0].url;
            }
            track.externalURL = element['external_urls']['spotify'];
            track.href = element['href'];
            track.uri = element['uri'];
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

    } catch (err) {
      console.error(err);
      mensaje = "Error: " + err;
    } finally {
      this.building = false;
      this.storageService.set(user + "_artists", this.artists);
      this.storageService.set(user + "_albums", this.albums);
      this.storageService.set(user + "_tracks", this.tracks);
      alert(mensaje);
    }
  }

  getAlbum(albumId: string) {
    return this.albums.find(a => a.id === albumId);
  }

  getArtist(artistId: string) {
    return this.artists.find(a => a.id === artistId);
  }

  getAlbumsByArtist(artistId: string): AlbumSpotify[] {
    return this.albums.filter(album => album.artistId === artistId)
      .sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
  }

  getTracksByAlbum(albumId: string): TrackSpotify[] {
    return this.tracks.filter(track => track.albumId === albumId)
      .sort((a, b) => {
        if (a.discNumber != b.discNumber) {
          return a.discNumber - b.discNumber;
        } else {
          return a.trackNumber - b.trackNumber;
        }
      });
  }

  nextTrack(indexTotal: number): TrackSpotify {
    const trackNow = this.tracks[indexTotal];
    const tracksAlbum = this.getTracksByAlbum(trackNow.albumId);
    const indexTrackNow = tracksAlbum.indexOf(trackNow);
    if (indexTrackNow != tracksAlbum.length - 1) {
      return tracksAlbum[indexTrackNow + 1];
    }
    const album = this.getAlbum(trackNow.albumId);
    const indexAlbum = this.albums.indexOf(album);
    return this.getTracksByAlbum(this.nextAlbum(indexAlbum).id)[0];
  }

  nextAlbum(indexTotal: number): AlbumSpotify {
    const albumNow = this.albums[indexTotal];
    const albumsArtist = this.getAlbumsByArtist(albumNow.artistId);
    const indexAlbumNow = albumsArtist.indexOf(albumNow);
    if (indexAlbumNow != albumsArtist.length - 1) {
      return albumsArtist[indexAlbumNow + 1];
    }
    const artist = this.getArtist(albumNow.artistId);
    const indexArtist = this.artists.indexOf(artist);
    return this.getAlbumsByArtist(this.nextArtist(indexArtist).id)[0];


  }

  nextArtist(indexTotal): ArtistSpotify {
    let index = indexTotal == this.artists.length - 1 ? 0 : indexTotal + 1;
    return this.artists[index];

  }

  updateExcluded(album: AlbumSpotify) {
    let index = this.albums.indexOf(album);
    this.albums[index].excluded = album.excluded;
    console.log("Update Excluded:", this.albums[index]);
    this.spotifyService.getUserProfile().then(profileResponse => {
      const user: string = profileResponse['id'];
      this.storageService.set(user + "_albums", this.albums);
    });
  }

  isAlbumDirecto(track: TrackSpotify) {
    let prompt = `Responde "true" si es verdad y "false" si es falso. El album "${track.albumName}" de "${track.artistName}" es un album en directo?`
    this.gptService.generarRespuesta(prompt);
  }

  getQueueRandomTracks(): Observable<string> {
    return new Observable<string>((observer) => {
      let shuffleTracks: string[] = [];//this.tracks.map(t => t.uri).sort((a, b) => 0.5 - Math.random()).slice(0, 500);
      let artistasRepetidos: string[] = [];
      for (let i = 0; i < 500; i++) {
        let tiempoEjecucion = Date.now();
        let tracksNoRepetidas = this.tracks.filter(t => !artistasRepetidos.find(a => a === t.artistId) && !shuffleTracks.find(st => st === t.uri));
        let track = tracksNoRepetidas[Math.floor(Math.random() * tracksNoRepetidas.length)];
        shuffleTracks.push(track.uri);
        observer.next(track.uri);
        //this.isAlbumDirecto(track);
        artistasRepetidos.unshift(track.artistId);
        if (artistasRepetidos.length > 10) {
          artistasRepetidos.pop();

        }
        console.log(`Pista ${i} - ${Date.now() - tiempoEjecucion} ms`)

      }
      observer.complete();
    })


  }

  async createRandomTracksPlaylist() {
    let playlistResponse;
    let offset = 0;
    let profileResponse = await this.spotifyService.getUserProfile()
    const user: string = profileResponse['id'];
    let playlist = null;
    do {
      playlistResponse = await this.spotifyService.getCurrentUsersPlayilst(offset);
      playlist = playlistResponse['items'].find(item => !!item && !!item['owner'] && item['owner']['id'] === user && item['name'] === 'Random');
    } while (!playlist && !!playlistResponse['next'])

    if (!playlist) {
      //Crear playlist
      playlist = await this.spotifyService.createPlaylist(user);
    } else {
      //Buscar y eliminar todos los elementos de la playlist
      let playlistItemsResponse;
      let snapshotId = playlist['snapshot_id'];
      do {
        playlistResponse = await this.spotifyService.getPlaylistItems(playlist['id']);
        let tracks = [];
        for (let item of playlistResponse.items) {
          tracks.push({
            uri: item.track.uri
          })
        }
        //let tracks = playlistResponse.items.map(item => { return { uri: item.track.uri }; });
        if (tracks.length > 0) {
          snapshotId = await this.spotifyService.removePlaylistItems(playlist['id'], tracks, snapshotId);
        }
      } while (!!playlistResponse && !!playlistResponse["next"])
    }

    let obs = this.getQueueRandomTracks();
    let tracks = [];

    obs.subscribe({
      next: next => tracks.push(next),
      complete: async () => {
        let position = 0;
        for (let i: number = 0; i < tracks.length; i += 100) {
          let addPlaylistItemsResponse = await this.spotifyService.addPlaylistItems(playlist['id'], tracks.slice(i, i + 99), i);
          position = addPlaylistItemsResponse["position"];
        }
      }

    });


  }

  getQueueRandomAlbums(): string[] {
    let shuffleAlbums = this.albums
      .filter(a => !ALBUMS_DIRECTO.includes(a.id))
      .sort((a, b) => 0.5 - Math.random()).slice(0, 10);


    let shuffleAlbumsTracks = [];
    for (const album of shuffleAlbums) {
      shuffleAlbumsTracks = shuffleAlbumsTracks.concat(this.tracks.filter(t => t.albumId === album.id).sort((a, b) => {
        if (a.discNumber == b.discNumber) {
          return a.trackNumber - b.trackNumber;
        }
        return a.discNumber - b.discNumber;
      }).map(t => t.uri));
    }


    return shuffleAlbumsTracks;
  }
}
