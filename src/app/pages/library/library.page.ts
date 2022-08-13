import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistSpotify } from 'src/app/entities/artist-spotify';
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


  constructor(private spotifyService: SpotifyService,
    public libraryService: LibraryService,
    private router: Router) { }

  ngOnInit() {

    if (!this.spotifyService.autorizado) {
      this.router.navigateByUrl("/login");
    }
    this.cargando = true;
    this.libraryService.loadLibrary().then(res => this.cargando = false);



  }

  reloadLibrary() {
    this.cargando = true;
    this.libraryService.loadLibrary(true).then(res => this.cargando = false);
  }

  navigateToAlbums(artistId: string) {
    this.router.navigateByUrl(`albums?artistId=${artistId}`);
  }

}
