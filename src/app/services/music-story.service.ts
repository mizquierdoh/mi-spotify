import { APP_ID, Injectable } from '@angular/core';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import { HttpClient } from '@angular/common/http';
import MusicStoryApi from '../../lib/MusicStoryAPI/MusicStoryAPI.class';

const BASE_URL = 'http://api.music-story.com/';

const OAUTH_CONSUMER_KEY = '95393125dd0a690b2f3d768b276dece0e556c419';
const OAUTH_CONSUMER_SECRET = '45b956d08a34833bd75ec770dd3f2332f986ac98';
const TOKEN = '91b759e37d0d9626a3cbc9275f2fa708c889a17b';
const TOKEN_SECRET = 'b1f15cb104bd8e1c5178b9f39c2a30ffc0be63c5';
const VERSION = '1.0';

@Injectable({
  providedIn: 'root'
})
export class MusicStoryService {



  private token: string = '';
  private token_secret: string = '';

  api: MusicStoryApi;

  constructor(private http: HttpClient) {
    this.api = new MusicStoryApi(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, this.token, this.token_secret, "");
    console.log("Test api", this.api);

    this.api.getToken((response) => {
      this.api.search("artist", { name: "Bones of Minerva" }, (list) => {
        console.log("searchResult", list);


        let artist = list.data[0];
        artist.getConnector('albums', { link: 'Main', format: 'Album', type: 'Original' }, null, 100, function (albums, _this) {
          console.log("Albums story", albums);
          albums.data.forEach(album => {
            this.api.get('Album', album.id, null, (a) => {
              console.log(a.data);
              a.getConnector('spotify', {}, null, 100, (spotifyAlbums) => {
                console.log(album.title, spotifyAlbums);
              })
            })


          });
        });




      });
    });

  }

  getToken() {
    this.token = '';
    this.token_secret = '';
    let url, oauth_signature;
    if (!OAUTH_CONSUMER_KEY)
      return;
    url = BASE_URL + '/';
    if (VERSION)
      url += VERSION + '/';
    oauth_signature = this.sign(url, { oauth_consumer_key: OAUTH_CONSUMER_KEY });
    url += 'oauth/request_token.json?oauth_consumer_key=95393125dd0a690b2f3d768b276dece0e556c419&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1661768436&oauth_nonce=yRPX3viRkpl&oauth_version=1.0&oauth_signature='.concat(oauth_signature);

    // const data = { oauth_consumer_key: OAUTH_CONSUMER_KEY, oauth_signature: oauth_signature, _callback: 'var json=' };
    // let params;
    // for (const prop in data) {
    //   if (!!params)
    //     params += '&';
    //   else
    //     params = '?';
    //   params += prop + '=' + encodeURIComponent(data[prop]);
    // }
    // url = url + params;
    console.log("Music sotory token url:", url);
    this.http.get(url).subscribe(response => {
      console.log("Music story:", response);
    })

  }

  private sign(url, params): string {
    let normalized_params = '', base_signature = '', encrypt_key = '', signature = '', prop, props, i, val, hash;
    if (!url)
      return;
    if (!params)
      params = {};
    props = new Array();
    for (prop in params)
      props.push(prop);
    props.sort();
    for (i = 0; i < props.length; i++) {
      prop = this.rawurlencode_rfc3986(props[i]);
      val = this.rawurlencode_rfc3986(params[props[i]]);
      if (normalized_params)
        normalized_params += '&';
      normalized_params += prop + '=' + val;
    }
    base_signature = 'GET&' + this.rawurlencode_rfc3986(url.toLowerCase()) + '&' + this.rawurlencode_rfc3986(normalized_params);
    encrypt_key = this.rawurlencode_rfc3986(OAUTH_CONSUMER_SECRET) + '&' + this.rawurlencode_rfc3986(this.token_secret);
    hash = hmacSHA1(base_signature, encrypt_key);
    signature = Base64.stringify(hash);
    return signature;
  }

  private rawurlencode_rfc3986(input): string {
    return encodeURIComponent(input).replace('+', ' ').replace('%7E', '~');
  };

}
