"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[326],{326:(Z,d,s)=>{s.r(d),s.d(d,{AlbumsPageModule:()=>x});var m=s(6895),g=s(4719),i=s(7181),u=s(1543),e=s(6738),h=s(3191),b=s(624);function p(n,r){1&n&&e._UZ(0,"ion-spinner",6)}function f(n,r){if(1&n&&(e.TgZ(0,"ion-thumbnail",11),e._UZ(1,"img",12),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Q6J("src",t.images[0].url,e.LSH)}}function A(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"ion-item",7),e.YNc(1,f,2,1,"ion-thumbnail",8),e.TgZ(2,"ion-label")(3,"strong"),e._uU(4),e.qZA(),e.TgZ(5,"h2")(6,"em"),e._uU(7),e.qZA()()(),e.TgZ(8,"ion-label",6),e._uU(9),e.ALo(10,"date"),e.qZA(),e.TgZ(11,"ion-checkbox",9),e.NdJ("ngModelChange",function(l){const c=e.CHM(t).$implicit;return e.KtG(c.excluded=l)})("ionChange",function(){const a=e.CHM(t).$implicit,c=e.oxw();return e.KtG(c.libraryService.updateExcluded(a))}),e.qZA(),e.TgZ(12,"ion-icon",10),e.NdJ("click",function(){const a=e.CHM(t).$implicit,c=e.oxw();return e.KtG(c.play(a.uri))}),e.qZA()()}if(2&n){const t=r.$implicit;e.Q6J("routerLink","tracks?albumId="+t.id),e.xp6(1),e.Q6J("ngIf",!!t.images[0]),e.xp6(3),e.Oqu(t.name),e.xp6(3),e.Oqu(t.artistName),e.xp6(2),e.Oqu(e.xi3(10,6,t.releaseDate,"y")),e.xp6(2),e.Q6J("ngModel",t.excluded)}}const _=[{path:"",component:(()=>{class n{constructor(t,o,l,a){this.spotifyService=t,this.libraryService=o,this.route=l,this.router=a,this.cargando=!1,this.artistId="",this.name=""}get albums(){return this.libraryService.albums.filter(t=>{let o=!0;return""!==this.artistId&&(o=t.artistId===this.artistId),""!==this.name&&(o=t.name.toLowerCase().includes(this.name.toLowerCase())),o})}ngOnInit(){this.spotifyService.autorizado||this.router.navigateByUrl("/login"),this.cargando=!0,this.libraryService.loadLibrary().then(t=>this.cargando=!1),this.route.queryParams.subscribe(t=>{t.artistId&&(this.artistId=t.artistId)})}getArtist(t){const o=this.libraryService.getArtist(t);return o?o.name:""}play(t){console.log("Play album",t),this.spotifyService.play(t)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(h.s),e.Y36(b.$),e.Y36(u.gz),e.Y36(u.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-albums"]],decls:12,vars:3,consts:[["slot","start"],["name","library-outline","slot","start"],[2,"display","inline-block"],["slot","end",4,"ngIf"],["showCancelButton","focus",3,"ngModel","ngModelChange"],[3,"routerLink",4,"ngFor","ngForOf"],["slot","end"],[3,"routerLink"],["style","margin-right: 1em;",4,"ngIf"],["slot","end","color","danger",3,"ngModel","ngModelChange","ionChange"],["slot","end","color","primary","name","play",3,"click"],[2,"margin-right","1em"],[3,"src"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e._UZ(3,"ion-menu-button")(4,"ion-icon",1),e.qZA(),e.TgZ(5,"ion-title",2),e._uU(6,"Albums"),e.qZA(),e.YNc(7,p,1,0,"ion-spinner",3),e.qZA(),e.TgZ(8,"ion-searchbar",4),e.NdJ("ngModelChange",function(a){return o.name=a}),e.qZA()(),e.TgZ(9,"ion-content")(10,"ion-list"),e.YNc(11,A,13,9,"ion-item",5),e.qZA()()),2&t&&(e.xp6(7),e.Q6J("ngIf",o.cargando),e.xp6(1),e.Q6J("ngModel",o.name),e.xp6(3),e.Q6J("ngForOf",o.albums))},dependencies:[m.sg,m.O5,g.JJ,g.On,i.Sm,i.nz,i.W2,i.Gu,i.gu,i.Ie,i.Q$,i.q_,i.fG,i.VI,i.PQ,i.Bs,i.sr,i.wd,i.w,i.j9,i.YI,u.rH,m.uU]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[u.Bz.forChild(_),u.Bz]}),n})(),x=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.ez,g.u5,i.Pc,y]}),n})()}}]);