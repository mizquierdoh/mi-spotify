"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7350],{7350:(q,_,s)=>{s.r(_),s.d(_,{PlayingPageModule:()=>R});var p=s(6895),g=s(4719),r=s(7181),y=s(1543),c=s(5861),d=s(6553),h=s(7986),m=s(4733),e=s(6738),v=s(3191),S=s(624),P=s(1481);let b=(()=>{class n{transform(i,...o){const t=Math.floor(i/1e3),l=Math.floor(t/3600);return(l>0?l+":":"")+Math.floor(t%3600/60)+":"+(t%60).toLocaleString("es-ES",{minimumIntegerDigits:2,useGrouping:!1})}}return n.\u0275fac=function(i){return new(i||n)},n.\u0275pipe=e.Yjl({name:"songTime",type:n,pure:!0}),n})();function k(n,a){if(1&n&&(e.TgZ(0,"ion-title"),e._uU(1),e.qZA()),2&n){const i=e.oxw();e.xp6(1),e.hij(" ",null==i.player||null==i.player.song?null:i.player.song.name," ")}}function T(n,a){1&n&&e._UZ(0,"ion-icon",16)}function x(n,a){1&n&&e._UZ(0,"ion-icon",17)}function Z(n,a){1&n&&e._UZ(0,"ion-icon",18)}function A(n,a){1&n&&e._UZ(0,"ion-icon",19)}function M(n,a){if(1&n&&(e.TgZ(0,"ion-select-option",11),e.YNc(1,T,1,0,"ion-icon",12),e.YNc(2,x,1,0,"ion-icon",13),e.YNc(3,Z,1,0,"ion-icon",14),e.YNc(4,A,1,0,"ion-icon",15),e._uU(5),e.qZA()),2&n){const i=a.$implicit;e.Q6J("value",i.id),e.xp6(1),e.Q6J("ngIf","computer"===i.type),e.xp6(1),e.Q6J("ngIf","smartphone"===i.type),e.xp6(1),e.Q6J("ngIf","speaker"===i.type),e.xp6(1),e.Q6J("ngIf","TV"===i.type),e.xp6(1),e.hij(" ",i.name," ")}}function I(n,a){1&n&&e._UZ(0,"ion-icon",39)}function J(n,a){1&n&&e._UZ(0,"ion-icon",40)}function C(n,a){1&n&&e._UZ(0,"ion-icon",41)}function N(n,a){1&n&&e._UZ(0,"ion-icon",42)}function U(n,a){1&n&&e._UZ(0,"ion-icon",43)}function w(n,a){1&n&&e._UZ(0,"ion-icon",44)}function Q(n,a){if(1&n){const i=e.EpF();e.TgZ(0,"ion-grid",20)(1,"ion-row")(2,"ion-col")(3,"ion-img",21),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.playing?t.pause():t.play())}),e.qZA()(),e.TgZ(4,"ion-col")(5,"ion-list")(6,"ion-item")(7,"h2"),e._uU(8),e.qZA()(),e.TgZ(9,"ion-item"),e._uU(10),e.qZA(),e.TgZ(11,"ion-item")(12,"h2"),e._uU(13),e.qZA(),e.TgZ(14,"ion-label",22),e._uU(15),e.ALo(16,"date"),e.qZA()()()()(),e.TgZ(17,"ion-row")(18,"ion-col")(19,"ion-range",23),e.NdJ("ngModelChange",function(t){e.CHM(i);const l=e.oxw();return e.KtG(l.position=t)})("click",function(t){e.CHM(i);const l=e.oxw();return e.KtG(l.seek(t))}),e.qZA(),e._uU(20),e.ALo(21,"songTime"),e.ALo(22,"songTime"),e.qZA()(),e.TgZ(23,"ion-row")(24,"ion-col",24)(25,"ion-button",25),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.previous())}),e._UZ(26,"ion-icon",26),e.qZA(),e.TgZ(27,"ion-button",25),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.playing?t.pause():t.play())}),e.YNc(28,I,1,0,"ion-icon",27),e.YNc(29,J,1,0,"ion-icon",28),e.qZA(),e.TgZ(30,"ion-button",25),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.next())}),e._UZ(31,"ion-icon",29),e.qZA()()(),e.TgZ(32,"ion-row")(33,"ion-col")(34,"ion-range",30),e.NdJ("ngModelChange",function(t){e.CHM(i);const l=e.oxw();return e.KtG(l.volume=t)})("ionChange",function(t){e.CHM(i);const l=e.oxw();return e.KtG(l.setVolume(t))}),e.YNc(35,C,1,0,"ion-icon",31),e.YNc(36,N,1,0,"ion-icon",32),e.YNc(37,U,1,0,"ion-icon",33),e.YNc(38,w,1,0,"ion-icon",34),e.qZA()(),e.TgZ(39,"ion-col")(40,"ion-button",35),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.toggleShuffleAlbum())}),e._UZ(41,"ion-icon",36)(42,"ion-icon",37),e.qZA(),e.TgZ(43,"ion-button",35),e.NdJ("click",function(){e.CHM(i);const t=e.oxw();return e.KtG(t.toggleShuffleTrack())}),e._UZ(44,"ion-icon",36)(45,"ion-icon",38),e.qZA()()()()}if(2&n){const i=e.oxw();e.Q6J("ngStyle",i.getBackground()),e.xp6(3),e.Q6J("src",null==i.player.song?null:i.player.song.image),e.xp6(5),e.AsE("",null==i.player||null==i.player.song?null:i.player.song.trackNumber," - ",null==i.player||null==i.player.song?null:i.player.song.name,""),e.xp6(2),e.hij(" ",null==i.player||null==i.player.song?null:i.player.song.artistName," "),e.xp6(3),e.Oqu(null==i.player||null==i.player.song?null:i.player.song.albumName),e.xp6(2),e.hij("(",e.xi3(16,20,null==i.player||null==i.player.song?null:i.player.song.albumReleaseDate,"yyyy"),")"),e.xp6(4),e.Q6J("max",i.duration)("ngModel",i.position),e.xp6(1),e.AsE(" ",e.lcZ(21,23,i.position)," / ",e.lcZ(22,25,i.duration)," "),e.xp6(8),e.Q6J("ngIf",!i.playing),e.xp6(1),e.Q6J("ngIf",i.playing),e.xp6(5),e.Q6J("ngModel",i.volume),e.xp6(1),e.Q6J("ngIf",0==i.volume),e.xp6(1),e.Q6J("ngIf",i.volume>0&&i.volume<=33),e.xp6(1),e.Q6J("ngIf",i.volume>33&&i.volume<=66),e.xp6(1),e.Q6J("ngIf",i.volume>66),e.xp6(2),e.Q6J("color",i.player.shuffleAlbum?"success":"light"),e.xp6(3),e.Q6J("color",i.player.shuffleTrack?"success":"light")}}const D=[{path:"",component:(()=>{class n{constructor(i,o,t,l){this.spotifyService=i,this.libraryService=o,this.router=t,this.titleService=l,this.randomAlbum=!0,this.randomTrack=!0,this.volume=50,this.duration=-1,this.updating=!1}get player(){return this.spotifyService.player}get devices(){return this.spotifyService.devices}get playing(){return this.spotifyService.playing}get position(){let i;return this.spotifyService.playing?(i=Math.max(this.time.getTime()+this._position-this.lastUpdate,0),!this.updating&&!!this.duration&&-1!=this.duration&&i>=this.duration&&(console.log("fin de la canci\xf3n"),this.lastUpdate=(new Date).getTime(),this._position=0,this.updateState().then(o=>{o&&!this.spotifyService.playing&&this.nextSong(o)}))):i=this._position,i}set position(i){}get track(){return this.spotifyService.player.song}nextSong(i){if(i.context&&i.context.type){if("album"===i.context.type.toLowerCase()){const t=this.libraryService.albums.indexOf(this.spotifyService.player.album);console.log(t),this.spotifyService.player.shuffleAlbum||!this.spotifyService.player.album||-1==t?this.playRandomAlbum():this.spotifyService.play(this.libraryService.nextAlbum(t).uri)}}else{const o=this.libraryService.tracks.indexOf(this.spotifyService.player.song);console.log(o),this.spotifyService.player.shuffleTrack||!this.spotifyService.player.track||-1==o?this.playRandomTrack():this.spotifyService.playTrack(this.libraryService.nextTrack(o).uri)}}seek(i){this.lastUpdate=(new Date).getTime(),this._position=i.target.value,this.spotifyService.seekToPosition(i.target.value).then(()=>{this.updateState()})}ngOnInit(){var i=this;return(0,c.Z)(function*(){(!i.spotifyService.autorizado||!i.spotifyService.player)&&i.router.navigateByUrl("/login"),i.intervalId=setInterval(()=>{i.time=new Date},1e3),i.intervalUpdate=setInterval(()=>{i.updateState()},5e3),i.spotifyService.player||(yield i.spotifyService.initPlayer()),i.spotifyService.getAvaiableDevices().then(()=>{const o=i.spotifyService.devices.find(t=>t.isActive);console.log("Device:",o),o?i.selectedDevice=o.id:i.spotifyService.devices.length>0&&(i.selectedDevice=i.spotifyService.devices[0].id),i.updateState()}),i.spotifyService.player.addListener("error",o=>{console.error("Player error:",o),i.updateState()}),i.spotifyService.player.addListener("ready",o=>{console.log("Player ready:",o),i.updateState()}),i.spotifyService.player.addListener("state",o=>{console.log("player state:",o),i.updateState(),0==o.track_window.next_tracks.length&&"TRACK"===o.context.metadata.current_item.current_type&&i.spotifyService.addItemToPlaybackQueue(i.spotifyService.player.shuffleTrack?i.libraryService.tracks[Math.floor(Math.random()*i.libraryService.tracks.length)].uri:i.libraryService.tracks[i.libraryService.tracks.indexOf(i.spotifyService.player.song)+1].uri)})})()}getBackground(){return this.spotifyService.player&&this.spotifyService.player.artist&&this.spotifyService.player.artist.images&&this.spotifyService.player.artist.images.length>0?{"background-image":`url("${this.spotifyService.player.artist.images[0].url}")`,"background-blend-mode":"multiply","background-size":"cover","background-color":"#00000088"}:null}transferPlaybackEvent(i){this.transferPlayback(i.target.value)}transferPlayback(i){var o=this;return(0,c.Z)(function*(){yield o.spotifyService.transferPlayback(i),o.updateState()})()}toggleShuffleAlbum(){this.updateState().then(i=>{this.spotifyService.player.shuffleAlbum=!this.spotifyService.player.shuffleAlbum})}toggleShuffleTrack(i){this.spotifyService.player.shuffleTrack=!this.spotifyService.player.shuffleTrack,this.spotifyService.togglePlaybackShuffle(null!=i&&null!=i?i:this.spotifyService.player.shuffleTrack).then(()=>{this.updateState()})}updateState(){return new Promise(i=>{(this.libraryService.building||this.updating)&&i(null),this.spotifyService.getPlaybackState().then(o=>{o.subscribe(t=>{if(t&&null!=t){if(this.updating=!0,console.log("Playback State:",t),this.spotifyService.player.shuffleTrack=t.shuffle_state,this.lastUpdate=(new Date).getTime(),this._position=t.progress_ms,this.spotifyService.playing=t.is_playing,t.device&&(this.selectedDevice=t.device.id,this.volume=t.device.volume_percent),t.item){this.duration=t.item.duration_ms;const l=this.libraryService.getTrack(t.item.id);l?(this.spotifyService.player.song=l,this.spotifyService.player.album=this.libraryService.getAlbum(l.albumId),this.spotifyService.player.artist=this.libraryService.getArtist(l.artistId),console.log("encontrada",this.spotifyService.player.song)):(t.item&&(this.spotifyService.player.song=m.t.parseWebPlaybackTrack(t.item),t.item.album&&(this.spotifyService.player.album=d.d.parseWebPlaybackAlbum(t.item.album)),!!t.item.artists&&t.item.artists.length>0&&(this.spotifyService.player.artist=h.l.parseWebPlaybackArtist(t.item.artists[0]))),console.log("sin encontrar")),this.titleService.setTitle(this.spotifyService.player.song.name)}this.updating=!1,i(t)}else i(null)})})})}getAvaiableDevices(){var i=this;return(0,c.Z)(function*(){(!i.spotifyService.player||!i.spotifyService.player.ready)&&(yield i.spotifyService.initPlayer()),i.spotifyService.getAvaiableDevices()})()}play(){this.spotifyService.play().then(()=>{this.updateState().then(i=>{this.spotifyService.playing=!0})})}pause(){this.spotifyService.pause().then(()=>{this.updateState().then(i=>{this.spotifyService.playing=!1})})}next(){this.spotifyService.player.shuffleTrack?this.playRandomTrack():this.spotifyService.player.next().then(()=>{this.updateState().then(i=>{this.spotifyService.playing=!0})})}previous(){this.spotifyService.player.previous().then(()=>{this.updateState().then(i=>{this.spotifyService.playing=!0})})}playRandomAlbum(){var i=this;return(0,c.Z)(function*(){const o=i.libraryService.albums.filter(l=>!l.excluded),t=o[Math.floor(Math.random()*o.length)];console.log("album_uri:",t.uri),i.spotifyService.togglePlaybackShuffle(!1).then(()=>{i.spotifyService.play(t.uri).then(()=>{i.updateState().then(l=>{i.spotifyService.player.shuffleAlbum=!0})})})})()}playRandomTrack(){var i=this;return(0,c.Z)(function*(){const o=i.libraryService.albums.filter(u=>!u.excluded),t=i.libraryService.tracks.filter(u=>!!o.find(f=>f.id===u.albumId)),l=t[Math.floor(Math.random()*t.length)];console.log("track_uri",l.uri),yield i.spotifyService.playTrack(l.uri),yield i.spotifyService.togglePlaybackShuffle(!0),i.updateState().then(u=>{i.spotifyService.playing=!0})})()}setVolume(i){this.spotifyService.player.setVolume(i.target.value)}ngOnDestroy(){clearInterval(this.intervalId)}initPlayer(){var i=this;return(0,c.Z)(function*(){yield i.spotifyService.initPlayer(),i.spotifyService.getAvaiableDevices().then(()=>{i.spotifyService.devices&&i.spotifyService.devices.length>=0?i.selectedDevice=i.spotifyService.devices[0].id:i.initPlayer()})})()}}return n.\u0275fac=function(i){return new(i||n)(e.Y36(v.s),e.Y36(S.$),e.Y36(y.F0),e.Y36(P.Dx))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-playing"]],decls:22,vars:4,consts:[["slot","start"],["name","play-outline","slot","start"],[4,"ngIf"],[3,"click"],["size","large","name","disc-outline"],["name","shuffle-outline"],["size","large","name","musical-note-outline"],["name","refresh-outline"],["placeholder","Device..",3,"ngModel","ngModelChange","ionChange","click"],[3,"value",4,"ngFor","ngForOf"],["fixed","false",3,"ngStyle",4,"ngIf"],[3,"value"],["name","desktop-outline",4,"ngIf"],["name","phone-portrait-outline",4,"ngIf"],["name","radio-outline",4,"ngIf"],["name","tv-outline",4,"ngIf"],["name","desktop-outline"],["name","phone-portrait-outline"],["name","radio-outline"],["name","tv-outline"],["fixed","false",3,"ngStyle"],[3,"src","click"],["slot","end"],[3,"max","ngModel","ngModelChange","click"],[1,"botonera"],["size","large","color","success","shape","round",3,"click"],["name","play-skip-back"],["name","play",4,"ngIf"],["name","pause",4,"ngIf"],["name","play-skip-forward"],["color","success",3,"ngModel","ngModelChange","ionChange"],["color","success","slot","start","name","volume-off",4,"ngIf"],["color","success","slot","start","name","volume-low",4,"ngIf"],["color","success","slot","start","name","volume-medium",4,"ngIf"],["color","success","slot","start","name","volume-high",4,"ngIf"],["shape","round",3,"color","click"],["size","large","name","shuffle-outline"],["name","disc-outline"],["name","musical-note-outline"],["name","play"],["name","pause"],["color","success","slot","start","name","volume-off"],["color","success","slot","start","name","volume-low"],["color","success","slot","start","name","volume-medium"],["color","success","slot","start","name","volume-high"]],template:function(i,o){1&i&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e._UZ(3,"ion-menu-button")(4,"ion-icon",1),e.qZA(),e.YNc(5,k,2,1,"ion-title",2),e.qZA()(),e.TgZ(6,"ion-content")(7,"ion-grid")(8,"ion-row")(9,"ion-col")(10,"ion-button",3),e.NdJ("click",function(){return o.playRandomAlbum()}),e._UZ(11,"ion-icon",4)(12,"ion-icon",5),e.qZA(),e.TgZ(13,"ion-button",3),e.NdJ("click",function(){return o.playRandomTrack()}),e._UZ(14,"ion-icon",6)(15,"ion-icon",5),e.qZA(),e.TgZ(16,"ion-button",3),e.NdJ("click",function(){return o.updateState()}),e._UZ(17,"ion-icon",7),e.qZA()(),e.TgZ(18,"ion-col")(19,"ion-select",8),e.NdJ("ngModelChange",function(l){return o.selectedDevice=l})("ionChange",function(l){return o.transferPlaybackEvent(l)})("click",function(){return o.getAvaiableDevices()}),e.YNc(20,M,6,6,"ion-select-option",9),e.qZA()()()(),e.YNc(21,Q,46,27,"ion-grid",10),e.qZA()),2&i&&(e.xp6(5),e.Q6J("ngIf",!(null==o.player||!o.player.song)),e.xp6(14),e.Q6J("ngModel",o.selectedDevice),e.xp6(1),e.Q6J("ngForOf",o.devices),e.xp6(1),e.Q6J("ngIf",!(null==o.player||!o.player.song)))},dependencies:[p.sg,p.O5,p.PC,g.JJ,g.On,r.YG,r.Sm,r.wI,r.W2,r.jY,r.Gu,r.gu,r.Xz,r.Ie,r.Q$,r.q_,r.fG,r.I_,r.Nd,r.t9,r.n0,r.sr,r.wd,r.QI,p.uU,b],styles:[".botonera[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),n})()}];let Y=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[y.Bz.forChild(D),y.Bz]}),n})(),G=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({}),n})(),R=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,g.u5,r.Pc,Y,G]}),n})()}}]);