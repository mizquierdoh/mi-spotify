"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5921],{5921:(P,m,o)=>{o.r(m),o.d(m,{LibraryPageModule:()=>Z});var l=o(6895),c=o(4719),n=o(7181),g=o(1543),i=o(6738),d=o(3191),y=o(7922);function f(t,e){1&t&&i._UZ(0,"ion-spinner",8)}function b(t,e){if(1&t&&(i.TgZ(0,"ion-thumbnail",11),i._UZ(1,"img",12),i.qZA()),2&t){const r=i.oxw().$implicit;i.xp6(1),i.Q6J("src",r.images[0].url,i.LSH)}}function h(t,e){if(1&t){const r=i.EpF();i.TgZ(0,"ion-item",9),i.NdJ("click",function(){const u=i.CHM(r).$implicit,v=i.oxw();return i.KtG(v.navigateToAlbums(u.id))}),i.YNc(1,b,2,1,"ion-thumbnail",10),i.TgZ(2,"ion-label")(3,"strong"),i._uU(4),i.qZA(),i.TgZ(5,"h2")(6,"em"),i._uU(7),i.qZA()()()()}if(2&t){const r=e.$implicit;i.xp6(1),i.Q6J("ngIf",!!r.images[0]),i.xp6(3),i.Oqu(r.name),i.xp6(3),i.Oqu(r.genres)}}const p=[{path:"",component:(()=>{class t{constructor(r,a,s){this.spotifyService=r,this.libraryService=a,this.router=s,this.cargando=!1,this.name=""}get artists(){return this.libraryService.artists.filter(r=>!0)}ngOnInit(){this.spotifyService.autorizado||this.router.navigateByUrl("/login"),this.cargando=!0,this.libraryService.loadLibrary().then(r=>this.cargando=!1)}reloadLibrary(){this.cargando=!0,this.libraryService.loadLibrary(!0).then(r=>this.cargando=!1)}navigateToAlbums(r){this.router.navigateByUrl(`albums?artistId=${r}`)}}return t.\u0275fac=function(r){return new(r||t)(i.Y36(d.s),i.Y36(y.$),i.Y36(g.F0))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-library"]],decls:14,vars:3,consts:[["slot","start"],["name","library-outline","slot","start"],[2,"display","inline-block"],["slot","end",4,"ngIf"],["slot","end",3,"click"],["name","refresh-outline"],["showCancelButton","focus",3,"ngModel","ngModelChange"],[3,"click",4,"ngFor","ngForOf"],["slot","end"],[3,"click"],["style","margin-right: 1em;",4,"ngIf"],[2,"margin-right","1em"],[3,"src"]],template:function(r,a){1&r&&(i.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),i._UZ(3,"ion-menu-button")(4,"ion-icon",1),i.qZA(),i.TgZ(5,"ion-title",2),i._uU(6,"Biblioteca"),i.qZA(),i.YNc(7,f,1,0,"ion-spinner",3),i.TgZ(8,"ion-button",4),i.NdJ("click",function(){return a.reloadLibrary()}),i._UZ(9,"ion-icon",5),i.qZA()(),i.TgZ(10,"ion-searchbar",6),i.NdJ("ngModelChange",function(u){return a.name=u}),i.qZA()(),i.TgZ(11,"ion-content")(12,"ion-list"),i.YNc(13,h,8,3,"ion-item",7),i.qZA()()),2&r&&(i.xp6(7),i.Q6J("ngIf",a.cargando),i.xp6(3),i.Q6J("ngModel",a.name),i.xp6(3),i.Q6J("ngForOf",a.artists))},dependencies:[l.sg,l.O5,c.JJ,c.On,n.YG,n.Sm,n.W2,n.Gu,n.gu,n.Ie,n.Q$,n.q_,n.fG,n.VI,n.PQ,n.Bs,n.sr,n.wd,n.j9]}),t})()}];let L=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[g.Bz.forChild(p),g.Bz]}),t})(),Z=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[l.ez,c.u5,n.Pc,L]}),t})()}}]);