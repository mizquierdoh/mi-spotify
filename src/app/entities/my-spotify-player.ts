import SpotifyPlayer from "spotify-web-playback";
import { AlbumSpotify } from "./album-spotify";
import { ArtistSpotify } from "./artist-spotify";
import { TrackSpotify } from "./track-spotify";

export class MySpotifyPlayer extends SpotifyPlayer {
  private myVolume: number;

  get volume(): number {
    return this.myVolume;
  }

  set volume(vol: number) {
    this.volume = vol;
    super.setVolume(vol);
  }

  device: string;
  shuffleTrack: boolean = false;
  shuffleAlbum: boolean = true;
  //Ahora
  artist: ArtistSpotify;
  album: AlbumSpotify;
  song: TrackSpotify;


}
