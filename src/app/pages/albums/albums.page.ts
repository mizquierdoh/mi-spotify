import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumSpotify } from 'src/app/entities/album-spotify';
import { LibraryService } from 'src/app/services/library.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  cargando: boolean = false;
  artistId: string = "";
  name: string = "";

  get albums(): AlbumSpotify[] {
    return this.libraryService.albums.filter(album => {
      let filtro = true;
      if (this.artistId !== "") {
        filtro = album.artistId === this.artistId;
      }
      if (this.name !== "") {
        filtro = album.name.toLowerCase().includes(this.name.toLowerCase());
      }
      return filtro;
    })
  }


  constructor(private spotifyService: SpotifyService,
    public libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (!this.spotifyService.autorizado) {
      this.router.navigateByUrl("/login");
    }
    this.cargando = true;
    this.libraryService.loadLibrary().then(res => this.cargando = false);
    this.route.queryParams
      .subscribe(params => {
        if (!!params['artistId']) {
          this.artistId = params['artistId'];
        }
      });
  }

  getArtist(artistId: string): string {
    const artist = this.libraryService.getArtist(artistId);
    return !!artist ? artist.name : "";
  }

  play(uri: string) {
    console.log("Play album", uri);
    this.spotifyService.play(uri);
  }

}
