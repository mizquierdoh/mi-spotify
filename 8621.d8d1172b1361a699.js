"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8621],{8621:(j,b,g)=>{g.r(b),g.d(b,{LoginPageModule:()=>O});var x=g(6895),T=g(4719),v=g(7181),m=g(1543),F=g(5861),c=g(6738),U=g(3191);function C(n,r){if(1&n&&(c.TgZ(0,"ion-button",3),c._uU(1,"login"),c.qZA()),2&n){const e=c.oxw();c.Q6J("href",e.loginURL)}}const Z=[{path:"",component:(()=>{class n{constructor(e,t,o){this.spotifyService=e,this.route=t,this.router=o}ngOnInit(){var e=this;return(0,F.Z)(function*(){e.spotifyService.redirectUri=location.origin+location.pathname,console.log("redirect uri",e.spotifyService.redirectUri);try{yield e.spotifyService.getToken()}catch(t){console.log(t)}e.spotifyService.autorizado&&e.router.navigateByUrl("/library"),e.route.queryParams.subscribe(t=>{console.log(t),t.code?e.spotifyService.setToken(t.code).then(o=>{e.router.navigateByUrl("/library")}).catch(o=>{console.error("Ha habido un error: ",o),e.router.navigateByUrl("/login")}):e.loginURL=e.spotifyService.loginUrl()})})()}}return n.\u0275fac=function(e){return new(e||n)(c.Y36(U.s),c.Y36(m.gz),c.Y36(m.F0))},n.\u0275cmp=c.Xpm({type:n,selectors:[["app-login"]],decls:9,vars:1,consts:[["slot","start"],["name","log-in-outline","slot","start"],["color","success",3,"href",4,"ngIf"],["color","success",3,"href"]],template:function(e,t){1&e&&(c.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),c._UZ(3,"ion-menu-button")(4,"ion-icon",1),c.qZA(),c.TgZ(5,"ion-title"),c._uU(6,"login"),c.qZA()()(),c.TgZ(7,"ion-content"),c.YNc(8,C,2,1,"ion-button",2),c.qZA()),2&e&&(c.xp6(8),c.Q6J("ngIf",!!t.loginURL))},dependencies:[x.O5,v.YG,v.Sm,v.W2,v.Gu,v.gu,v.fG,v.sr,v.wd]}),n})()}];let k=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.oAB({type:n}),n.\u0275inj=c.cJS({imports:[m.Bz.forChild(Z),m.Bz]}),n})();var M=g(655),I=g(2916),N={error:"cordova_not_available"},E={error:"plugin_not_installed"};function P(n){if(typeof window<"u"&&window.angular){var e=window.document,t=window.angular.element(e.querySelector("[ng-app]")||e.body).injector();if(t)return t.get("$q")(function(i,u){n(i,u)});console.warn("Angular 1 was detected but $q couldn't be retrieved. This is usually when the app is not bootstrapped on the html or body tag. Falling back to native promises which won't trigger an automatic digest when promises resolve.")}return function(){if(Promise)return new Promise(function(i,u){n(i,u)});console.error("No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular or on a recent browser.")}()}function L(n,r,e){var t,o;"string"==typeof n?t=n:(t=n.constructor.getPluginRef(),e=n.constructor.getPluginName(),o=n.constructor.getPluginInstallName());var i=function R(n){return typeof window<"u"?function B(n,r){for(var e=r.split("."),t=n,o=0;o<e.length;o++){if(!t)return null;t=t[e[o]]}return t}(window,n):null}(t);return!(!i||r&&typeof i[r]>"u")||(typeof window>"u"||!window.cordova?(function Q(n,r){typeof process>"u"&&console.warn(r?"Native: tried calling "+n+"."+r+", but Cordova is not available. Make sure to include cordova.js or run in a device/simulator":"Native: tried accessing the "+n+" plugin but Cordova is not available. Make sure to include cordova.js or run in a device/simulator")}(e,r),N):(function J(n,r,e){console.warn(e?"Native: tried calling "+n+"."+e+", but the "+n+" plugin is not installed.":"Native: tried accessing the "+n+" plugin but it's not installed."),r&&console.warn("Install the "+n+" plugin: 'ionic cordova plugin add "+r+"'")}(e,o,r),E))}function A(n,r){return n._objectInstance&&(!r||typeof n._objectInstance[r]<"u")}function y(n,r,e,t,o,i){if(void 0===t&&(t={}),e=function S(n,r,e,t){if(void 0===r&&(r={}),r.sync)return n;if("reverse"===r.callbackOrder)n.unshift(t),n.unshift(e);else if("node"===r.callbackStyle)n.push(function(s,l){s?t(s):e(l)});else if("object"===r.callbackStyle&&r.successName&&r.errorName){var o={};o[r.successName]=e,o[r.errorName]=t,n.push(o)}else if(typeof r.successIndex<"u"||typeof r.errorIndex<"u"){var i=function(){r.successIndex>n.length?n[r.successIndex]=e:n.splice(r.successIndex,0,e)},u=function(){r.errorIndex>n.length?n[r.errorIndex]=t:n.splice(r.errorIndex,0,t)};r.successIndex>r.errorIndex?(u(),i()):(i(),u())}else n.push(e),n.push(t);return n}(e,t,o,i),A(n,r))return n._objectInstance[r].apply(n._objectInstance,e)}var V=function(){function n(){}return n.installed=function(){return!0===L(this.pluginRef)},n.getPlugin=function(){return typeof window<"u"?function H(n,r){for(var e=r.split("."),t=n,o=0;o<e.length;o++){if(!t)return null;t=t[e[o]]}return t}(window,this.pluginRef):null},n.getPluginName=function(){return this.pluginName},n.getPluginRef=function(){return this.pluginRef},n.getPluginInstallName=function(){return this.plugin},n.getSupportedPlatforms=function(){return this.platforms},n.pluginName="",n.pluginRef="",n.plugin="",n.repo="",n.platforms=[],n.install="",n}();function p(n,r,e,t){return t=Array.from(t),function $(n,r,e){return void 0===e&&(e={}),function(){for(var t=[],o=0;o<arguments.length;o++)t[o]=arguments[o];if(e.sync)return y(n,r,t,e);if(e.observable)return new I.y(function(l){var d;return d=e.destruct?y(n,r,t,e,function(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];return l.next(a)},function(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];return l.error(a)}):y(n,r,t,e,l.next.bind(l),l.error.bind(l)),d&&d.error&&l.error(d.error),function(){try{return e.clearWithArgs?y(n,e.clearFunction,t,e,l.next.bind(l),l.error.bind(l)):y(n,e.clearFunction,[])}catch(a){console.warn("Unable to clear the previous observable watch for",n.constructor.getPluginName(),r),console.warn(a)}}});if(e.otherPromise)return P(function(l,d){var a;a=e.destruct?y(n,r,t,e,function(){for(var f=[],w=0;w<arguments.length;w++)f[w]=arguments[w];return l(f)},function(){for(var f=[],w=0;w<arguments.length;w++)f[w]=arguments[w];return d(f)}):y(n,r,t,e,l,d),a&&a.then?a.then(l,d):d()});var i,u,s=P(function(l,d){i=e.destruct?y(n,r,t,e,function(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];return l(a)},function(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];return d(a)}):y(n,r,t,e,l,d),u=d});return i&&i.error&&(s.catch(function(){}),"function"==typeof u&&u(i.error)),s}}(n,r,e).apply(this,t)}!function z(){if(typeof process>"u"){var n=typeof window<"u"?window:{},e=Date.now(),t=!1;n.document.addEventListener("deviceready",function(){console.log("Ionic Native: deviceready event fired after "+(Date.now()-e)+" ms"),t=!0}),setTimeout(function(){!t&&n.cordova&&console.warn("Ionic Native: deviceready did not fire within 5000ms. This can happen when plugins are in an inconsistent state. Try removing plugins from plugins/ and reinstalling them.")},5e3)}}();var K=function(){function n(r,e,t){try{t&&"string"!=typeof t&&(t=Object.keys(t).map(function(o){return o+"="+t[o]}).join(",")),this._objectInstance=cordova.InAppBrowser.open(r,e,t)}catch{typeof window<"u"&&window.open(r,e),console.warn("Native: InAppBrowser is not installed or you are running on a browser. Falling back to window.open.")}}return n.prototype._loadAfterBeforeload=function(r){return p(this,"_loadAfterBeforeload",{sync:!0},arguments)},n.prototype.show=function(){return p(this,"show",{sync:!0},arguments)},n.prototype.close=function(){return p(this,"close",{sync:!0},arguments)},n.prototype.hide=function(){return p(this,"hide",{sync:!0},arguments)},n.prototype.executeScript=function(r){return p(this,"executeScript",{},arguments)},n.prototype.insertCSS=function(r){return p(this,"insertCSS",{},arguments)},n.prototype.on=function(r){var e=this;return function(){if(!0===A(e))return new I.y(function(t){return e._objectInstance.addEventListener(r,t.next.bind(t)),function(){return e._objectInstance.removeEventListener(r,t.next.bind(t))}})}()},n.prototype.on=function(r){var e=this;return function(){if(!0===A(e))return new I.y(function(t){return e._objectInstance.addEventListener(r,t.next.bind(t)),function(){return e._objectInstance.removeEventListener(r,t.next.bind(t))}})}()},n}(),q=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return(0,M.ZT)(r,n),r.prototype.create=function(e,t,o){return new K(e,t,o)},r.pluginName="InAppBrowser",r.plugin="cordova-plugin-inappbrowser",r.pluginRef="cordova.InAppBrowser",r.repo="https://github.com/apache/cordova-plugin-inappbrowser",r.platforms=["AmazonFire OS","Android","Browser","iOS","macOS","Windows"],r.\u0275fac=function(){var e;return function(o){return(e||(e=c.n5z(r)))(o||r)}}(),r.\u0275prov=c.Yz7({token:r,factory:function(e){return r.\u0275fac(e)}}),r}(V);let O=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.oAB({type:n}),n.\u0275inj=c.cJS({providers:[q],imports:[x.ez,T.u5,v.Pc,k]}),n})()}}]);