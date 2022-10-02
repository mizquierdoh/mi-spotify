"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3191],{3191:(B,C,m)=>{m.d(C,{s:()=>x});var h=m(5861),l=m(529);class T{static parse(n){let e=new T;return e.id=n.id,e.name=n.name,e.type=n.type,e.volume=n.volume,e.isActive=n.is_active,e}}function d(p,n,e){return n in p?Object.defineProperty(p,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):p[n]=e,p}let _;var p;(p=_||(_={})).Computer="Computer",p.Tablet="Tablet",p.Smartphone="Smartphone",p.Speaker="Speaker",p.TV="TV",p.AVR="AVR",p.STB="STB",p.AudioDongle="AudioDongle",p.GameConsole="GameConsole",p.CastVideo="CastVideo",p.CastAudio="CastAudio",p.Automobile="Automobile",p.Unknown="Unknown";const P={artists:[],duration:0,id:"",name:"",image:"",uri:""};class y{get token(){return this._token}get playing(){return this._playing}get ready(){return this._ready}get position(){return this._position}get track(){return this._track}get playlists(){return this._playlists}constructor(n,e=1){d(this,"_baseUrl","https://api.spotify.com/v1/me"),d(this,"_deviceId",""),d(this,"_token",""),d(this,"_playing",!1),d(this,"_ready",!1),d(this,"_position",0),d(this,"_track",P),d(this,"_playlists",[]),d(this,"_errorListeners",[]),d(this,"_stateListeners",[]),d(this,"_statusListeners",[]),d(this,"scopes",["playlist-read-collaborative","playlist-read-private","streaming","user-read-email","user-read-private","user-library-read","user-library-modify","user-read-playback-state","user-modify-playback-state"]),this._name=n,this._volume=e,this.handlePlayerStateChanges=this.handlePlayerStateChanges.bind(this),this.handlePlayerErrors=this.handlePlayerErrors.bind(this)}connect(n){var e=this;return(0,h.Z)(function*(){return e._token=n,yield Promise.all([e.waitForReady(),y.loadSpotifyPlayer()]),e._player=new window.Spotify.Player({name:e._name,volume:e._volume,getOAuthToken:s=>{s(n)}}),e.waitForConnection()})()}waitForConnection(){var n=this;if(!this._player)return Promise.resolve(!1);const e=this._player;this._player.addListener("player_state_changed",this.handlePlayerStateChanges),this._player.addListener("initialization_error",s=>{this.handlePlayerErrors("initialization_error",s)}),this._player.addListener("authentication_error",s=>{this.handlePlayerErrors("authentication_error",s)}),this._player.addListener("account_error",s=>{this.handlePlayerErrors("account_error",s)}),this._player.addListener("playback_error",s=>{this.handlePlayerErrors("playback_error",s)});const t=s=>{this._deviceId=s,this._ready=!0},r=()=>{this._ready=!1};return new Promise(s=>{e.addListener("ready",function(){var o=(0,h.Z)(function*({device_id:i}){t(i);for(const a of n._statusListeners)a("ready");s(!0)});return function(i){return o.apply(this,arguments)}}()),e.addListener("not_ready",()=>{r();for(const o of this._statusListeners)o("not_ready");s(!1)}),e.connect()})}static loadSpotifyPlayer(){return new Promise((n,e)=>{if(document.getElementById("spotify-player"))n();else{const r=document.createElement("script");r.id="spotify-player",r.type="text/javascript",r.async=!1,r.defer=!0,r.src="https://sdk.scdn.co/spotify-player.js",r.onload=()=>n(),r.onerror=()=>e(new Error("Error loading spotify-player.js")),document.head.appendChild(r)}})}waitForReady(){return new Promise(n=>{const e=()=>{n()};window.onSpotifyWebPlaybackSDKReady?e():window.onSpotifyWebPlaybackSDKReady=e})}play(n,e=0){var t=this;return(0,h.Z)(function*(){let r;if(Array.isArray(n)&&n.length)r=JSON.stringify({uris:n,offset:{position:e}});else if(n){const s=n.indexOf("artist")>=0,o=n.indexOf("track")>=0;let i;s||(i={position:e}),r=o?JSON.stringify({uris:[n],offset:i}):JSON.stringify({context_uri:n,offset:i})}yield fetch(`${t._baseUrl}/player/play?device_id=${t._deviceId}`,{method:"PUT",body:r,headers:{Authorization:`Bearer ${t._token}`,"Content-Type":"application/json"}})})()}pause(){var n=this;return(0,h.Z)(function*(){yield fetch(`${n._baseUrl}/player/pause`,{method:"PUT",headers:{Authorization:`Bearer ${n._token}`,"Content-Type":"application/json"}})})()}previous(){var n=this;return(0,h.Z)(function*(){yield fetch(`${n._baseUrl}/player/previous`,{method:"POST",headers:{Authorization:`Bearer ${n._token}`,"Content-Type":"application/json"}})})()}next(){var n=this;return(0,h.Z)(function*(){yield fetch(`${n._baseUrl}/player/next`,{method:"POST",headers:{Authorization:`Bearer ${n._token}`,"Content-Type":"application/json"}})})()}seek(n){var e=this;return(0,h.Z)(function*(){yield fetch(`${e._baseUrl}/player/seek?position_ms=${n}`,{method:"PUT",headers:{Authorization:`Bearer ${e._token}`,"Content-Type":"application/json"}})})()}getPlaybackState(){var n=this;return(0,h.Z)(function*(){const e=yield fetch(`${n._baseUrl}/player`,{method:"GET",headers:{Authorization:`Bearer ${n._token}`,"Content-Type":"application/json"}});return 204===e.status?null:e.json()})()}getPlaylists(){var n=this;return(0,h.Z)(function*(){let e=`${n._baseUrl}/playlists?limit=50`,t=[];for(;;){const s=yield(yield fetch(e,{headers:{Authorization:`Bearer ${n._token}`}})).json();if(t=t.concat(s.items),null===s.next)break;e=s.next}return Promise.all(t.map(function(){var r=(0,h.Z)(function*(s){let o=`${s.tracks.href}?limit=100`,i=[];for(;;){const u=yield(yield fetch(o,{headers:{Authorization:`Bearer ${n._token}`}})).json();if(i=i.concat(u.items),null===u.next)break;o=u.next}return{id:s.id,images:s.images,name:s.name,tracks:i}});return function(s){return r.apply(this,arguments)}}()))})()}getFavorites(){var n=this;return(0,h.Z)(function*(){return{name:"Your Music",tracks:(yield(yield fetch(`${n._baseUrl}/tracks?limit=50`,{headers:{Authorization:`Bearer ${n._token}`}})).json()).items}})()}getUsersPlaylists(){var n=this;return(0,h.Z)(function*(){let[e,t]=yield Promise.all([n.getPlaylists(),n.getFavorites()]);return e=[t,...e],e=e.map(r=>({name:r.name,tracks:r.tracks.map(({track:s})=>({artists:s.artists.map(({id:o,name:i})=>({id:o,name:i})),duration:s.duration_ms,id:s.id,image:s.album.images.find(()=>!0),name:s.name,uri:s.uri}))})),e})()}setToken(n){this._token=n}setVolume(n){var e=this;return(0,h.Z)(function*(){const t=`${e._baseUrl}/player/volume?volume_percent=${n}`;yield fetch(t,{method:"PUT",headers:{Authorization:`Bearer ${e._token}`,"Content-Type":"application/json"}})})()}addListener(n,e){switch(n){case"error":this._errorListeners.push(e);break;case"state":this._stateListeners.push(e);break;case"ready":this._statusListeners.push(e)}}removeListener(n,e){const t=r=>!!e&&r!==e;switch(n){case"error":this._errorListeners=this._errorListeners.filter(t);break;case"state":this._stateListeners=this._stateListeners.filter(t);break;case"ready":this._statusListeners=this._statusListeners.filter(t)}}getAlbumImage(n){const e=Math.min(...n.images.map(r=>r.width));return(n.images.find(r=>r.width===e)||{}).url}handlePlayerStateChanges(n){var e=this;return(0,h.Z)(function*(){if(!n){e._track=P,e._position=0,e._playing=!1;for(const f of e._stateListeners)f(n);return}const{paused:t,position:r,track_window:{current_track:{album:s,artists:o,duration_ms:i,id:a,name:c,uri:u}}}=n;e._playing=!t,e._position=r,e._track={artists:o.map(({name:f})=>f),duration:i,image:e.getAlbumImage(s),id:a,name:c,uri:u};for(const f of e._stateListeners)f(n)})()}handlePlayerErrors(n,e){this._ready=!1,this._player&&"playback_error"!==n&&(this._player.removeListener("player_state_changed"),this._player.removeListener("initialization_error"),this._player.removeListener("authentication_error"),this._player.removeListener("account_error"),this._player.disconnect());for(const t of this._errorListeners)t(n)}}class k extends y{constructor(){super(...arguments),this.shuffleTrack=!1,this.shuffleAlbum=!0}get volume(){return this.myVolume}set volume(n){this.volume=n,super.setVolume(n)}}class S{static parse(n){if(!n)return null;let e=new S;return e.access_token=n.access_token,e.expires=new Date(n.expires),e.refresh_token=n.refresh_token,e}}var $=m(6738),L=m(1188),M=m(1543);const j="0ef858dc874e495a891f9ae9a1f01bf5",z="547a96667ac94ba3992d07f7df66686e";let x=(()=>{class p{constructor(e,t,r){this.http=e,this.storageService=t,this.router=r,console.log("location.origin",location.origin),console.log("location.href",location.href),console.log("location.pathname",location.pathname)}initPlayer(){var e=this;return(0,h.Z)(function*(){(!e.player||!e.player.ready)&&(e.player=new k("Leftidos"),e.getToken().then(t=>{e.player.connect(t.access_token)})),console.log(e.player)})()}get autorizado(){return!(!this.token||this.token.expires.getTime()<(new Date).getTime())}generateRandomString(e){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=0;s<e;s++)t+=r.charAt(Math.floor(Math.random()*r.length));return t}loginUrl(){var t=this.generateRandomString(16);return`https://accounts.spotify.com/authorize?client_id=${j}&redirect_uri=${this.redirectUri}&response_type=code&scope=user-follow-read user-read-currently-playing playlist-read-collaborative playlist-read-private streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state&state=${t}`}getCurrentlyPlaying(){return new Promise(e=>{this.getToken().then(t=>{const s=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${t.access_token}`});e(this.http.get("https://api.spotify.com/v1/me/player/currently-playing",{headers:s}))})})}getPlaybackState(){return new Promise(e=>{this.getToken().then(t=>{const s=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${t.access_token}`});e(this.http.get("https://api.spotify.com/v1/me/player",{headers:s}))})})}getRecentlyPlayed(){return new Promise(e=>{this.getToken().then(t=>{const s=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${t.access_token}`});e(this.http.get("https://api.spotify.com/v1/me/player/recently-played",{headers:s}))})})}getAvaiableDevices(){return new Promise(e=>{this.getToken().then(t=>{const s=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${t.access_token}`});this.http.get("https://api.spotify.com/v1/me/player/devices",{headers:s}).subscribe(i=>{this.devices=i.devices.map(a=>T.parse(a)),e()})})})}getToken(){var e=this;return(0,h.Z)(function*(){if(console.log("01-Inicio",e.token),!e.token){let t=!1;for(;!t;)try{e.token=S.parse(yield e.storageService.get("spotify_token")),t=!0}catch{t=!1}}if(e.token){if((new Date).getTime()<e.token.expires.getTime())return new Promise(t=>{t(e.token)});try{return e.refreshToken()}catch(t){e.router.navigateByUrl("/login"),Promise.reject(t)}}else Promise.reject()})()}refreshToken(){let t=`grant_type=refresh_token&refresh_token=${this.token.refresh_token}`;return new Promise((r,s)=>{this.http.post("https://accounts.spotify.com/api/token",t,{headers:new l.WM({Authorization:"Basic  "+btoa(j+":"+z),"Content-Type":"application/x-www-form-urlencoded;"})}).subscribe(o=>{let i=new Date;i.setTime(i.getTime()+1e3*o.expires_in),this.token={access_token:o.access_token,expires:i,refresh_token:o.refresh_token},this.storageService.set("spotify_token",this.token),this.initPlayer(),r(this.token)},o=>{s(o)})})}setToken(e){const r=`code=${e}&redirect_uri=${this.redirectUri}&grant_type=authorization_code`;return new Promise((s,o)=>{this.http.post("https://accounts.spotify.com/api/token",r,{headers:new l.WM({Authorization:"Basic  "+btoa(j+":"+z),"Content-Type":"application/x-www-form-urlencoded;"})}).subscribe(i=>{let a=new Date;a.setTime(a.getTime()+1e3*i.expires_in),this.token={access_token:i.access_token,expires:a,refresh_token:i.refresh_token},this.storageService.set("spotify_token",this.token),this.initPlayer(),s(this.token)},i=>{})})}playTrack(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});let a={};e&&(a.uris=[e]);const c="https://api.spotify.com/v1/me/player/play".concat(t?`?device_id=${t}`:"");return this.http.put(c,a,{headers:i}).subscribe(u=>{r()},u=>console.error(u))})})}play(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});let a={};e&&(a.context_uri=e);const c="https://api.spotify.com/v1/me/player/play".concat(t?`?device_id=${t}`:"");return this.http.put(c,a,{headers:i}).subscribe(u=>{r()},u=>console.error("Error al reproducir",u))})})}setRepeatMode(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});return this.http.put(`https://api.spotify.com/v1/me/player/repeat?state=${e}`+!!t?`&device_id=${t}`:"",{headers:i}).subscribe(c=>{r()},c=>console.error(c))})})}seekToPosition(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`}),a=`https://api.spotify.com/v1/me/player/seek?position_ms=${e}`.concat(t?`&device_id=${t}`:"");return this.http.put(a,null,{headers:i}).subscribe(c=>{r()},c=>console.error(c))})})}transferPlayback(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});return this.http.put(`https://api.spotify.com/v1/me/player?device_id=${e}`,JSON.stringify({device_ids:[e]}),{headers:o}).subscribe(c=>{t()},c=>console.error(c))})})}pause(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});let i="https://api.spotify.com/v1/me/player/pause".concat(e?`?device_id=${e}`:"");return this.http.put(i,null,{headers:o}).subscribe(a=>{t()},a=>console.error(a))})})}togglePlaybackShuffle(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});let a=`https://api.spotify.com/v1/me/player/shuffle?state=${e}`.concat(t?`&device_id=${t}`:"");return this.http.put(a,null,{headers:i}).subscribe(c=>{r()},c=>console.error(c))})})}next(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});return this.http.post(`https://api.spotify.com/v1/me/player/next?device_id=${e}`,{headers:o}).subscribe(a=>{t()},a=>console.error(a))})})}previous(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});return this.http.post(`https://api.spotify.com/v1/me/player/previous?device_id=${e}`,{headers:o}).subscribe(a=>{t()},a=>console.error(a))})})}addItemToPlaybackQueue(e,t){return new Promise(r=>{this.getToken().then(s=>{const i=new l.WM({Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});return this.http.post(`https://api.spotify.com/v1/me/player/queue?uri=${e}`+!!t?`&device_id=${t}`:"",JSON.stringify({context_uri:e}),{headers:i}).subscribe(u=>{r()},u=>console.error(u))})})}searchGrupo(e,t){return new Promise(r=>{this.getToken().then(s=>{const o=s.access_token,i=window.encodeURIComponent(e),a=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${o}`});return this.http.get(`https://api.spotify.com/v1/search?q=${i}&type=artist&offset=${t}&market=ES`,{headers:a}).subscribe(u=>{const f=u.artists,b=f.items.sort((g,v)=>Number.parseInt(g.popularity)-Number.parseInt(v.popularity));for(const g of b){let A,v=0;for(const w of g.images)Number.parseInt(w.height)>v&&(v=Number.parseInt(w.height),A=w.url)}r({total:f.total})})})})}getGrupos(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});let i="";for(let c=0;c<e.length;c++)!e[c].infoSpotify.idSpotify||(i+=e[c].infoSpotify.idSpotify,e.length-1!=c&&(i+=","));return this.http.get("https://api.spotify.com/v1/artists?ids="+i,{headers:o}).subscribe(c=>{let u=[];const f=c.artists;for(const b of f){let g;if(g.nombre=b.name,g.idSpotify=b.id,g.generos=b.genres,b.images){let A,v=0;for(const w of b.images)Number.parseInt(w.height)>v&&(v=Number.parseInt(w.height),A=w.url);g.image=A}u.push(g)}t(u)})})})}getTopTracks(e){return new Promise(t=>{this.getToken().then(r=>{const o=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});this.http.get(`https://api.spotify.com/v1/artists/${e}/top-tracks?market=ES`,{headers:o}).subscribe(a=>{t(a.tracks.map(c=>c.preview_url))})})})}getUserProfile(){return new Promise((e,t)=>{this.getToken().then(r=>{const s=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${r.access_token}`});this.http.get("https://api.spotify.com/v1/me",{headers:s}).subscribe(o=>{e(o)},o=>t(o))})})}getFollowedArtists(e){return new Promise((t,r)=>{this.getToken().then(s=>{const o=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.access_token}`});let i="https://api.spotify.com/v1/me/following?type=artist&limit=50";e&&(i=i.concat("&after="+e)),this.http.get(i,{headers:o}).subscribe(a=>{t(a)},a=>r(a))})})}getArtistsAlbums(e,t){return new Promise((r,s)=>{this.getToken().then(o=>{const i=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.access_token}`});this.http.get(`https://api.spotify.com/v1/artists/${e}/albums?include_groups=album&market=ES&limit=50&offset=${t}`,{headers:i}).subscribe(c=>{r(c)},c=>s(c))})})}getAlbumsTracks(e,t){return new Promise((r,s)=>{this.getToken().then(o=>{const i=new l.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.access_token}`});this.http.get(`https://api.spotify.com/v1/albums/${e}/tracks?market=ES&limit=50&&offset=${t}`,{headers:i}).subscribe(c=>{r(c)},c=>s(c))})})}}return p.\u0275fac=function(e){return new(e||p)($.LFG(l.eN),$.LFG(L.V),$.LFG(M.F0))},p.\u0275prov=$.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},1188:(B,C,m)=>{m.d(C,{V:()=>d});var h=m(5861),l=m(6738),T=m(849);let d=(()=>{class _{constructor(y){this.storage=y,this._storage=null,this.init()}init(){var y=this;return(0,h.Z)(function*(){const k=yield y.storage.create();y._storage=k})()}set(y,k){this._storage?.set(y,k)}get(y){var k=this;return(0,h.Z)(function*(){if(!k._storage)throw"Storage not ready";return yield k._storage?.get(y)})()}}return _.\u0275fac=function(y){return new(y||_)(l.LFG(T.K))},_.\u0275prov=l.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()}}]);