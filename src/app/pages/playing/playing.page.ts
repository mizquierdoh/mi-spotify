import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router) { }

  randomAlbum: boolean = true;
  randomTrack: boolean = true;
  volume: number = 50;
  duration: number;
  lastUpdate: number;
  intervalId;
  time: Date;
  private _position: number


  get position(): number {
    if (this.spotifyService.player.playing) {
      return this.time.getTime() + this._position - this.lastUpdate;
    } else {
      return this.spotifyService.player.position;
    }
  }

  set position(pos: number) {
    //ssthis.spotifyService.player.seek(pos);
  }


  get track(): TrackSpotify {
    return this.spotifyService.player.song;
  }

  seek(event) {
    this.spotifyService.player.seek(event.target.value);
  }

  ngOnInit() {
    if (!this.spotifyService.autorizado || !this.spotifyService.player) {
      this.router.navigateByUrl("/login");
    }
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.spotifyService.player.addListener("state", state => {
      console.log("Cambio de estado:", state);
      console.log(this.spotifyService.player);
      this.spotifyService.player.setVolume(this.volume);
      this.duration = state.track_window.current_track.duration_ms
      this.lastUpdate = new Date().getTime();
      this._position = this.spotifyService.player.position;
      let track = this.libraryService.getTrack(state.track_window.current_track.id);
      if (!!track) {
        this.spotifyService.player.song = track;
        this.spotifyService.player.album = this.libraryService.getAlbum(track.albumId);
        this.spotifyService.player.artist = this.libraryService.getArtist(track.artistId);
        console.log("encontrada", this.spotifyService.player.song);
      } else {
        this.spotifyService.player.song = TrackSpotify.parseWebPlaybackTrack(state.track_window.current_track);
        console.log("sin encontrar");

      }
      this.spotifyService.player.device = state['playback_id'];
      console.log("device id: ", this.spotifyService.player.device);

      if (state.track_window.next_tracks.length == 0) {
        if (state.context.metadata['current_item']['current_type'] === 'TRACK') {
          if (this.spotifyService.player.suffleTrack) {
            this.spotifyService.addItemToPlaybackQueue(this.libraryService.tracks[Math.floor(Math.random() * this.libraryService.tracks.length)].uri, this.spotifyService.player.device);
          } else {
            this.spotifyService.addItemToPlaybackQueue(this.libraryService.tracks[this.libraryService.tracks.indexOf(this.spotifyService.player.song) + 1].uri, this.spotifyService.player.device);
          }
        }
      }
    });



  }

  pause() {
    this.spotifyService.player.playing ? this.spotifyService.player.pause() : this.spotifyService.player.play()
  }

  next() {
    this.spotifyService.player.next();
  }

  previous() {
    this.spotifyService.player.previous();
  }

  // nextAlbum() {
  //   let album: AlbumSpotify;
  //   if (this.randomAlbum) {
  //     album = this.libraryService.albums[Math.floor(Math.random() * this.libraryService.albums.length)];
  //   } else {
  //     let track = this.libraryService.getTrack(this.spotifyService.player.track.id);
  //     if (!!track) {
  //       this.libraryService(next) this.libraryService.albums.indexOf(this.libraryService.getAlbum(track.albumId)) + 1;
  //     }
  //     album = this.libraryService.getAlbum()
  //   }

  //   this.spotifyService.player.play(album.uri);

  // }

  playRandomAlbum() {
    const album = this.libraryService.albums[Math.floor(Math.random() * this.libraryService.albums.length)];
    this.spotifyService.player.play(album.uri);

  }

  playRandomTrack() {
    const track = this.libraryService.tracks[Math.floor(Math.random() * this.libraryService.tracks.length)];
    this.spotifyService.player.play(track.uri);
  }



  setVolume(event) {
    this.spotifyService.player.setVolume(event.target.value);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);

  }



}
