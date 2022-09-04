import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooleanValueAccessorDirective } from '@ionic/angular/directives/control-value-accessors/boolean-value-accessor';
import { Observable } from 'rxjs';
import { DeviceSpotify } from '../entities/device-spotify';
import { MySpotifyPlayer } from '../entities/my-spotify-player';
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
  public player: MySpotifyPlayer;
  devices: DeviceSpotify[];
  playing: boolean;

  constructor(private http: HttpClient, private storageService: StorageService) {


  }

  async initPlayer() {
    if (!this.player) {
      this.player = new MySpotifyPlayer('Leftidos');
      this.getToken().then(data => {
        this.player.connect(data['access_token']);

      });

    }
    console.log(this.player);


  }

  get autorizado(): boolean {
    if (!this.token) {
      return false;
    }

    if (this.token.expires.getTime() < new Date().getTime()) {
      return false;
    }

    return true;
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



  getPlaybackState(): Promise<Observable<any>> {
    return new Promise<any>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = "https://api.spotify.com/v1/me/player"
        resolve(this.http.get(url, { headers }));
      });
    });
  }

  getRecentlyPlayed(): Promise<Observable<any>> {
    return new Promise<any>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = "https://api.spotify.com/v1/me/player/recently-played"
        resolve(this.http.get(url, { headers }));
      });
    });
  }

  getAvaiableDevices(): Promise<void> {
    return new Promise<void>(resolve => {

      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = "https://api.spotify.com/v1/me/player/devices"
        this.http.get(url, { headers }).subscribe(data => {
          console.log("Devices: ", data);
          this.devices = data['devices'].map(d => {
            return DeviceSpotify.parse(d);
          });
          resolve();
        });
      });
    });
  }

  async getToken(): Promise<SpotifyToken> {
    if (!this.token) {
      let storageListo: boolean = false;
      while (!storageListo) {
        try {
          this.token = SpotifyToken.parse(await this.storageService.get("spotify_token"));
          storageListo = true;
        } catch (err) {
          storageListo = false;
        }
      }
    }
    if (!!this.token) {
      if (new Date().getTime() < this.token.expires.getTime()) {
        return new Promise<SpotifyToken>(resolve => {
          resolve(this.token);
        });
      } else {
        try {
          return this.setToken(this.token.refresh_token);
        } catch (err) {
          Promise.reject(err)
        }
      }
    } else {
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
        this.storageService.set("spotify_token", this.token);
        this.initPlayer();
        resolve(this.token);
      }, (err) => {
        reject(err);
      }
      );
    });
  }

  playTrack(uri?: string, device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        let body = {};
        if (!!uri) {
          body["uris"] = [uri];
        }
        const url = 'https://api.spotify.com/v1/me/player/play'.concat(!!device ? `?device_id=${device}` : "");
        return this.http.put(url, body, { headers }).subscribe(response => {

          resolve();


        }, err => console.error(err));
      });
    });
  }

  play(uri?: string, device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        let body = {};
        if (!!uri) {
          body["context_uri"] = uri;
        }
        const url = 'https://api.spotify.com/v1/me/player/play'.concat(!!device ? `?device_id=${device}` : "");
        return this.http.put(url, body, { headers }).subscribe(response => {

          resolve();


        }, err => console.error(err));
      });
    });
  }

  setRepeatMode(state: "track" | "context" | "off", device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        const url = `https://api.spotify.com/v1/me/player/repeat?state=${state}` + !!device ? `&device_id=${device}` : "";
        return this.http.put(url, { headers }).subscribe(response => {
          resolve()

        }, err => console.error(err));
      });
    });
  }

  seekToPosition(position: number, device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        const url = `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`.concat(!!device ? `&device_id=${device}` : "");
        return this.http.put(url, null, { headers }).subscribe(response => {
          resolve()

        }, err => console.error(err));
      });
    });
  }


  transferPlayback(device: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const body = {
          "device_ids": [device]
        };

        const url = `https://api.spotify.com/v1/me/player?device_id=${device}`;
        return this.http.put(url, JSON.stringify(body), { headers }).subscribe(response => {
          resolve()

        }, err => console.error(err));
      });
    });
  }

  pause(device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        let url = 'https://api.spotify.com/v1/me/player/pause'.concat(!!device ? `?device_id=${device}` : "");
        return this.http.put(url, null, { headers }).subscribe(response => {
          resolve();

        }, err => console.error(err));
      });
    });
  }

  togglePlaybackShuffle(state: boolean, device?: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        let url = `https://api.spotify.com/v1/me/player/shuffle?state=${state}`.concat(!!device ? `&device_id=${device}` : "");
        return this.http.put(url, null, { headers }).subscribe(response => {
          resolve();

        }, err => console.error(err));
      });
    });
  }

  next(device: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = `https://api.spotify.com/v1/me/player/next?device_id=${device}`;
        return this.http.post(url, { headers }).subscribe(response => {
          resolve()

        }, err => console.error(err));
      });
    });
  }

  previous(device: string) {
    return new Promise<void>(resolve => {
      this.getToken().then(data => {
        const token = data['access_token'];
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = `https://api.spotify.com/v1/me/player/previous?device_id=${device}`;
        return this.http.post(url, { headers }).subscribe(response => {
          resolve()

        }, err => console.error(err));
      });
    });
  }




  addItemToPlaybackQueue(uri: string, device?: string): Promise<void> {
    return new Promise<void>((resolve) => {
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

        let url = `https://api.spotify.com/v1/me/player/queue?uri=${uri}` + !!device ? `&device_id=${device}` : "";
        return this.http.post(url, JSON.stringify(body), { headers }).subscribe(response => {
          resolve();

        }, err => console.error(err));
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
