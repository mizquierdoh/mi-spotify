import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumSpotify } from 'src/app/entities/album-spotify';
import { ArtistSpotify } from 'src/app/entities/artist-spotify';
import { TrackSpotify } from 'src/app/entities/track-spotify';
import { LibraryService } from 'src/app/services/library.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  cargando: boolean = false;
  name: string = "";

  get artists(): ArtistSpotify[] {
    return this.libraryService.artists.filter(artist => {
      let filtro = true;

      if (this.name !== "") {
      }
      return filtro;
    })
  }

  get albums(): AlbumSpotify[] {
    return this.libraryService.albums;
  }

  get tracks(): TrackSpotify[] {
    return this.libraryService.tracks;
  }

  get elementoCargando() {
    return this.libraryService.cargando;
  }

  constructor(private spotifyService: SpotifyService,
    public libraryService: LibraryService,
    private router: Router) { }

  ngOnInit() {

    if (!this.spotifyService.autorizado) {
      this.router.navigateByUrl("/login");
    }
    this.libraryService.loadLibrary().then(res => this.cargando = false, err => {
      this.cargando = false;
      this.libraryService.building = false;
      alert("Error cargando la librería\n" + err);
    });



  }

  reloadLibrary() {
    this.cargando = true;
    this.libraryService.loadLibrary(true).then(res => this.cargando = false);
  }

  clearLibrary() {
    this.cargando = true;
    this.libraryService.clearLibrary().then(() => this.cargando = false);
  }

  navigateToAlbums(artistId: string) {
    this.router.navigateByUrl(`albums?artistId=${artistId}`);
  }

}
