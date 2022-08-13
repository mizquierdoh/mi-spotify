import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SpotifyPlayer from 'spotify-web-playback';
import { SpotifyToken } from '../entities/spotify-token';
import { StorageService } from './storage.service';



const client_id = '0ef858dc874e495a891f9ae9a1f01bf5'; // Your client id
const client_secret = '547a96667ac94ba3992d07f7df66686e'; // Your secret
const redirect_uri = 'http://localhost:8100/login';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: SpotifyToken;
  autorizado: boolean = false;
  public player: SpotifyPlayer;

  constructor(private http: HttpClient, private storageService: StorageService) {


  }

  async initPlayer() {
    if (!this.player) {
      this.player = new SpotifyPlayer('Leftidos');
      this.getToken().then(data => {
        this.player.connect(data['access_token']).then(() => console.log(this.player.getPlaybackState()));

      });

    }
    console.log(this.player);


  }



  private generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  loginUrl(): string {
    var scope = 'user-follow-read user-read-currently-playing playlist-read-collaborative playlist-read-private streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
    var state = this.generateRandomString(16);

    return `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;

  }

  getCurrentlyPlaying(): Promise<Observable<any>> {
    return new Promise<any>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = "https://api.spotify.com/v1/me/player/currently-playing"
        resolve(this.http.get(url, { headers }));
      });
    });
  }

  async getToken(): Promise<SpotifyToken> {
    this.token = SpotifyToken.parse(await this.storageService.get("token"));
    if (!!this.token) {
      if (new Date().getTime() < this.token.expires.getTime()) {
        this.autorizado = true;
        return new Promise<SpotifyToken>(resolve => {
          resolve(this.token);
        });
      } else {
        this.autorizado = false;
        return this.setToken(this.token.refresh_token);
      }
    } else {
      this.autorizado = false;
      Promise.reject();
    }

  }

  setToken(code?: String): Promise<SpotifyToken> {

    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
    return new Promise<SpotifyToken>((resolve, reject) => {
      this.http.post(authorizationTokenUrl, body, {
        headers: new HttpHeaders({
          Authorization:
            'Basic  ' + btoa(client_id + ':' + client_secret),
          'Content-Type': 'application/x-www-form-urlencoded;',
        }),
      }).subscribe(res => {
        let expires = new Date();
        expires.setTime(expires.getTime() + res['expires_in'] * 1000);

        this.token = {
          access_token: res['access_token'],
          expires: expires,
          refresh_token: res['refresh_token']
        }
        this.autorizado = true;
        this.storageService.set("token", this.token);
        resolve(this.token);
      }, (err) => {
        reject(err);
      }
      );
    });
  }

  play(uri: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const body = {
          'context_uri': uri
        };

        const url = `https://api.spotify.com/v1/me/player/play?device_id=a942202e4f69534c82139360d7a9c8ae7fc7af20`;
        return this.http.put(url, JSON.stringify(body), { headers }).subscribe(response => {
          resolve()

        }, err => console.log(err));
      });
    });
  }

  searchGrupo(nombre: string, offset: number): Promise<any> {
    return new Promise<any>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const nombreEncoded = window.encodeURIComponent(nombre);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = `https://api.spotify.com/v1/search?q=${nombreEncoded}&type=artist&offset=${offset}&market=ES`;
        return this.http.get(url, { headers }).subscribe(busqueda => {
          const artists = busqueda['artists'];
          const items = artists['items'].sort((a, b) => Number.parseInt(a['popularity']) - Number.parseInt(b['popularity']));
          for (const item of items) {

            let height = 0;
            let imagen: string;
            for (const image of item['images']) {
              if (Number.parseInt(image['height']) > height) {
                height = Number.parseInt(image['height']);
                imagen = image['url'];
              }
            }

          }
          resolve({ total: artists['total'] });

        });
      });
    });

  }

  getGrupos(tanda): Promise<any[]> {
    return new Promise<any[]>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        let ids = "";
        for (let i = 0; i < tanda.length; i++) {
          if (!tanda[i].infoSpotify.idSpotify) {
            continue;
          }
          ids = ids + tanda[i].infoSpotify.idSpotify;
          if (tanda.length - 1 != i) {
            ids = ids + ",";
          }
        }

        const url = "https://api.spotify.com/v1/artists?ids=" + ids;
        return this.http.get(url, { headers }).subscribe(busqueda => {
          let resultados: any[] = [];
          const artists = busqueda['artists'];
          for (const resultado of artists) {
            let artist;
            artist.nombre = resultado['name'];
            artist.idSpotify = resultado['id'];
            artist.generos = resultado['genres'];
            if (!!resultado['images']) {
              let height = 0;
              let imagen: string;
              for (const image of resultado['images']) {
                if (Number.parseInt(image['height']) > height) {
                  height = Number.parseInt(image['height']);
                  imagen = image['url'];
                }
              }
              artist.image = imagen;
            }
            resultados.push(artist);
          }

          resolve(resultados);

        });
      });
    });
  }

  getTopTracks(id: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`;
        this.http.get(url, { headers }).subscribe(response => {
          resolve(response['tracks'].map(t => t['preview_url']));
        });

      });
    });
  }

  getUserProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      this.getToken().then(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access_token}`
        });

        this.http.get(`https://api.spotify.com/v1/me`, { headers }).subscribe(res => {
          resolve(res);
        }, (err) => reject(err));
      });
    });
  }

  getFollowedArtists(after: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      this.getToken().then(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access_token}`
        });
        let url = `https://api.spotify.com/v1/me/following?type=artist&limit=50`;
        if (!!after) {
          url = url.concat("&after=" + after)
        }

        this.http.get(url, { headers }).subscribe(res => {
          resolve(res);
        }, (err) => reject(err));
      });
    });
  }

  getArtistsAlbums(arstistId: string, offset: number) {
    return new Promise<any>((resolve, reject) => {

      this.getToken().then(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access_token}`
        });
        let url = `https://api.spotify.com/v1/artists/${arstistId}/albums?include_groups=album&market=ES&limit=50&offset=${offset}`;


        this.http.get(url, { headers }).subscribe(res => {
          resolve(res);
        }, (err) => reject(err));
      });
    });
  }

  getAlbumsTracks(albumId: string, offset: number) {
    return new Promise<any>((resolve, reject) => {

      this.getToken().then(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access_token}`
        });
        let url = `https://api.spotify.com/v1/albums/${albumId}/tracks?market=ES&limit=50&&offset=${offset}`;


        this.http.get(url, { headers }).subscribe(res => {
          resolve(res);
        }, (err) => reject(err));
      });
    });
  }




}
