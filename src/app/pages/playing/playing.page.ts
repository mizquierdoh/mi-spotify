import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.page.html',
  styleUrls: ['./playing.page.scss'],
})
export class PlayingPage implements OnInit {

  constructor(private spotifyService: SpotifyService, private libraryService: LibraryService) { }

  get track() {
    return this.spotifyService.player.track;
  }

  async ngOnInit() {
    await this.spotifyService.initPlayer();
  }

  play() {
    const album = this.libraryService.albums[Math.floor(Math.random() * this.libraryService.albums.length)];
    this.spotifyService.play("spotify:album:" + album.id);
  }



}
