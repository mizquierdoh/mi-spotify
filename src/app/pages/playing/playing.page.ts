import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlbumSpotify } from 'src/app/entities/album-spotify';
import { ArtistSpotify } from 'src/app/entities/artist-spotify';
import { TrackSpotify } from 'src/app/entities/track-spotify';
import { LibraryService } from 'src/app/services/library.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.page.html',
  styleUrls: ['./playing.page.scss'],
})
export class PlayingPage implements OnInit {

  constructor(private spotifyService: SpotifyService, private libraryService: LibraryService,
    private router: Router, private titleService: Title) { }

  randomAlbum: boolean = true;
  randomTrack: boolean = true;
  volume: number = 50;
  duration: number = -1;
  lastUpdate: number;
  intervalId;
  intervalUpdate;
  time: Date;
  private _position: number
  selectedDevice: string;
  updating: boolean = false;


  get position(): number {
    let position: number;
    if (this.spotifyService.playing) {
      position = Math.max(this.time.getTime() + this._position - this.lastUpdate, 0);
      if (!this.updating && !!this.duration && this.duration != -1 && position >= this.duration) {
        console.log("fin de la canción");
        this.lastUpdate = new Date().getTime();
        this._position = 0;
        this.updateState().then((state) => {
          if (!!state && !this.spotifyService.playing) {
            this.nextSong(state);
          }
        });
      }
    } else {
      position = this._position;
    }

    return position;
  }

  set position(pos: number) {
    //this.spotifyService.player.seek(pos);
  }


  get track(): TrackSpotify {
    return this.spotifyService.player.song;
  }

  private nextSong(state: any) {
    if (!!state['context'] && !!state['context']['type']) {
      let type = state['context']['type'].toLowerCase();
      if (type === 'album') {
        const indexAlbum = this.libraryService.albums.indexOf(this.spotifyService.player.album);
        console.log(indexAlbum);
        if (this.spotifyService.player.shuffleAlbum || !this.spotifyService.player.album || indexAlbum == -1) {
          this.playRandomAlbum();
        } else {
          this.spotifyService.play(this.libraryService.nextAlbum(indexAlbum).uri);
        }
      }
    } else {
      const indexSong = this.libraryService.tracks.indexOf(this.spotifyService.player.song);
      console.log(indexSong);
      if (this.spotifyService.player.shuffleTrack || !this.spotifyService.player.track || indexSong == -1) {
        this.playRandomTrack();
      } else {
        this.spotifyService.playTrack(this.libraryService.nextTrack(indexSong).uri);
      }
    }

  }

  seek(event) {
    this.lastUpdate = new Date().getTime();
    this._position = event.target.value;
    this.spotifyService.seekToPosition(event.target.value).then(() => {
      this.updateState();
    });
  }

  async ngOnInit() {
    if (!this.spotifyService.autorizado || !this.spotifyService.player) {
      this.router.navigateByUrl("/login");
    }
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.intervalUpdate = setInterval(() => {
      this.updateState();
    }, 5000);


    if (!this.spotifyService.player) {
      await this.spotifyService.initPlayer();
    }
    this.spotifyService.getAvaiableDevices().then(() => {
      const device = this.spotifyService.devices.find(d => d.isActive);
      console.log("Device:", device);
      if (!!device) {
        this.selectedDevice = device.id;
      } else if (this.spotifyService.devices.length > 0) {
        this.selectedDevice = this.spotifyService.devices[0].id;
      }
      this.updateState();
    });
    this.spotifyService.player.addListener("error", error => {
      console.error("Player error:", error);
      this.updateState();
    });

    this.spotifyService.player.addListener("ready", ready => {
      console.log("Player ready:", ready);
      this.updateState();

    });


    this.spotifyService.player.addListener("state", state => {
      console.log("player state:", state);
      this.updateState();

      if (state.track_window.next_tracks.length == 0) {
        if (state.context.metadata['current_item']['current_type'] === 'TRACK') {
          if (this.spotifyService.player.shuffleTrack) {
            this.spotifyService.addItemToPlaybackQueue(this.libraryService.tracks[Math.floor(Math.random() * this.libraryService.tracks.length)].uri);
          } else {
            this.spotifyService.addItemToPlaybackQueue(this.libraryService.tracks[this.libraryService.tracks.indexOf(this.spotifyService.player.song) + 1].uri);
          }
        }
      }
    });

  }

  getBackground() {
    if (!!this.spotifyService.player && !!this.spotifyService.player.artist && !!this.spotifyService.player.artist.images && this.spotifyService.player.artist.images.length > 0) {
      let background = {
        'background-image': `url("${this.spotifyService.player.artist.images[0].url}")`,
        'background-blend-mode': 'multiply',
        'background-size': 'cover',
        'background-color': '#00000088'
      };

      return background;
    }
    return null;
  }

  async transferPlayback(device) {
    await this.spotifyService.transferPlayback(device);
    this.updateState();
  }

  toggleShuffleAlbum() {

    this.updateState().then((state) => {
      this.spotifyService.player.shuffleAlbum = !this.spotifyService.player.shuffleAlbum;
    });
  }

  toggleShuffleTrack(state?: boolean) {
    this.spotifyService.player.shuffleTrack = !this.spotifyService.player.shuffleTrack;
    let _state = (state != undefined && state != null) ? state : this.spotifyService.player.shuffleTrack;
    this.spotifyService.togglePlaybackShuffle(_state).then(() => {
      this.updateState();
    });
  }

  private updateState(): Promise<any> {
    return new Promise<any>(resolve => {
      if (this.updating) {
        resolve(null);
      }
      this.spotifyService.getPlaybackState().then(observable => {
        observable.subscribe(state => {
          if (!state) {
            resolve(null);
          }

          this.updating = true;
          console.log("Playback State:", state);


          this.spotifyService.player.shuffleTrack = state['shuffle_state'];
          this.lastUpdate = new Date().getTime();
          this._position = state['progress_ms'];
          this.spotifyService.playing = state['is_playing'];
          if (!!state['device']) {
            this.selectedDevice = state['device']['id'];
            this.volume = state['device']['volume_percent'];
          }

          if (!!state['item']) {
            this.duration = state['item']['duration_ms'];
            const track = this.libraryService.getTrack(state['item']['id']);
            if (!!track) {
              this.spotifyService.player.song = track;
              this.spotifyService.player.album = this.libraryService.getAlbum(track.albumId);
              this.spotifyService.player.artist = this.libraryService.getArtist(track.artistId);
              console.log("encontrada", this.spotifyService.player.song);
            } else {
              if (!!state['item']) {
                this.spotifyService.player.song = TrackSpotify.parseWebPlaybackTrack(state['item']);

                if (!!state['item']['album']) {
                  this.spotifyService.player.album = AlbumSpotify.parseWebPlaybackAlbum(state['item']['album']);
                }
                if (!!state['item']['artists'] && state['item']['artists'].length > 0) {
                  this.spotifyService.player.artist = ArtistSpotify.parseWebPlaybackArtist(state['item']['artists'][0]);
                }
              }
              console.log("sin encontrar");

            }
            this.titleService.setTitle(this.spotifyService.player.song.name);
          }

          this.updating = false;
          resolve(state);
        });

      });
    });

  }

  async getAvaiableDevices() {
    if (!this.spotifyService.player || !this.spotifyService.player.ready) {
      await this.spotifyService.initPlayer();
    }
    this.spotifyService.getAvaiableDevices();
  }

  play() {
    this.spotifyService.play().then(() => {
      this.updateState().then((state) => {
        this.spotifyService.playing = true;
      });

    });
  }

  pause() {
    this.spotifyService.pause().then(() => {
      this.updateState().then((state) => {
        this.spotifyService.playing = false;
      });
    });
  }

  next() {
    this.spotifyService.player.next().then(() => {
      this.updateState().then(state => {
        this.spotifyService.playing = true;
      });
    });
  }

  previous() {
    this.spotifyService.player.previous().then(() => {
      this.updateState().then(state => {
        this.spotifyService.playing = true;
      });
    });
  }



  playRandomAlbum() {
    const albumsNotExcluded = this.libraryService.albums.filter(a => !a.excluded);
    const album = albumsNotExcluded[Math.floor(Math.random() * albumsNotExcluded.length)];
    console.log("album_uri:", album.uri);
    this.spotifyService.togglePlaybackShuffle(false).then(() => {
      this.spotifyService.play(album.uri).then(() => {
        this.updateState().then((state) => {
          this.spotifyService.player.shuffleAlbum = true;
        });
      });
    });
    ;


  }

  playRandomTrack() {
    const albumsNotExcluded = this.libraryService.albums.filter(a => !a.excluded);
    const tracksNotExcluded = this.libraryService.tracks.filter(t => !!albumsNotExcluded.find(a => a.id === t.albumId));
    const track = tracksNotExcluded[Math.floor(Math.random() * tracksNotExcluded.length)];

    this.spotifyService.togglePlaybackShuffle(true).then(() => {
      this.spotifyService.play(track.uri).then(() => {
        this.updateState().then((state) => {
          this.spotifyService.playing = true;
        });
      });
    });
  }



  setVolume(event) {
    this.spotifyService.player.setVolume(event.target.value);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);

  }



}
