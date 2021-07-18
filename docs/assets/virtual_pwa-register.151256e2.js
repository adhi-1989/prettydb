try{self["workbox:window:6.1.5"]&&_()}catch(f){}function n(n,e){return new Promise((function(t){var r=new MessageChannel;r.port1.onmessage=function(n){t(n.data)},n.postMessage(e,[r.port2])}))}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}try{self["workbox:core:6.1.5"]&&_()}catch(f){}var t=function(){var n=this;this.promise=new Promise((function(e,t){n.resolve=e,n.reject=t}))};function r(n,e){var t=location.href;return new URL(n,t).href===new URL(e,t).href}var i=function(n,e){this.type=n,Object.assign(this,e)};function o(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}function a(){}var s={type:"SKIP_WAITING"};function c(n,e){if(!e)return n&&n.then?n.then(a):Promise.resolve()}var u=function(e){var a,u;function v(n,a){var s,c;return void 0===a&&(a={}),(s=e.call(this)||this).nn={},s.tn=0,s.rn=new t,s.en=new t,s.on=new t,s.un=0,s.an=new Set,s.cn=function(){var n=s.fn,e=n.installing;s.tn>0||!r(e.scriptURL,s.sn)||performance.now()>s.un+6e4?(s.vn=e,n.removeEventListener("updatefound",s.cn)):(s.hn=e,s.an.add(e),s.rn.resolve(e)),++s.tn,e.addEventListener("statechange",s.ln)},s.ln=function(n){var e=s.fn,t=n.target,r=t.state,o=t===s.vn,a={sw:t,isExternal:o,originalEvent:n};!o&&s.mn&&(a.isUpdate=!0),s.dispatchEvent(new i(r,a)),"installed"===r?s.wn=self.setTimeout((function(){"installed"===r&&e.waiting===t&&s.dispatchEvent(new i("waiting",a))}),200):"activating"===r&&(clearTimeout(s.wn),o||s.en.resolve(t))},s.dn=function(n){var e=s.hn,t=e!==navigator.serviceWorker.controller;s.dispatchEvent(new i("controlling",{isExternal:t,originalEvent:n,sw:e,isUpdate:s.mn})),t||s.on.resolve(e)},s.gn=(c=function(n){var e=n.data,t=n.source;return o(s.getSW(),(function(){s.an.has(t)&&s.dispatchEvent(new i("message",{data:e,sw:t,originalEvent:n}))}))},function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];try{return Promise.resolve(c.apply(this,n))}catch(t){return Promise.reject(t)}}),s.sn=n,s.nn=a,navigator.serviceWorker.addEventListener("message",s.gn),s}u=e,(a=v).prototype=Object.create(u.prototype),a.prototype.constructor=a,a.__proto__=u;var l,h=v.prototype;return h.register=function(n){var e,t,a=(void 0===n?{}:n).immediate,s=void 0!==a&&a;try{var u=this;return e=function(){return u.mn=Boolean(navigator.serviceWorker.controller),u.yn=u.pn(),o(u.bn(),(function(n){u.fn=n,u.yn&&(u.hn=u.yn,u.en.resolve(u.yn),u.on.resolve(u.yn),u.yn.addEventListener("statechange",u.ln,{once:!0}));var e=u.fn.waiting;return e&&r(e.scriptURL,u.sn)&&(u.hn=e,Promise.resolve().then((function(){u.dispatchEvent(new i("waiting",{sw:e,wasWaitingBeforeRegister:!0}))})).then((function(){}))),u.hn&&(u.rn.resolve(u.hn),u.an.add(u.hn)),u.fn.addEventListener("updatefound",u.cn),navigator.serviceWorker.addEventListener("controllerchange",u.dn,{once:!0}),u.fn}))},(t=function(){if(!s&&"complete"!==document.readyState)return c(new Promise((function(n){return window.addEventListener("load",n)})))}())&&t.then?t.then(e):e()}catch(v){return Promise.reject(v)}},h.update=function(){try{return this.fn?c(this.fn.update()):void 0}catch(f){return Promise.reject(f)}},h.getSW=function(){return void 0!==this.hn?Promise.resolve(this.hn):this.rn.promise},h.messageSW=function(e){try{return o(this.getSW(),(function(t){return n(t,e)}))}catch(f){return Promise.reject(f)}},h.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&n(this.fn.waiting,s)},h.pn=function(){var n=navigator.serviceWorker.controller;return n&&r(n.scriptURL,this.sn)?n:void 0},h.bn=function(){try{var n=this;return function(e,t){try{var r=o(navigator.serviceWorker.register(n.sn,n.nn),(function(e){return n.un=performance.now(),e}))}catch(i){return t(i)}return r&&r.then?r.then(void 0,t):r}(0,(function(n){throw n}))}catch(e){return Promise.reject(e)}},(l=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&function(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}(v.prototype,l),v}(function(){function n(){this.Pn=new Map}var t=n.prototype;return t.addEventListener=function(n,e){this.Sn(n).add(e)},t.removeEventListener=function(n,e){this.Sn(n).delete(e)},t.dispatchEvent=function(n){n.target=this;for(var t,r=function(n,t){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,t){if(n){if("string"==typeof n)return e(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,t):void 0}}(n))||t&&n&&"number"==typeof n.length){r&&(n=r);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}(this.Sn(n.type));!(t=r()).done;)(0,t.value)(n)},t.Sn=function(n){return this.Pn.has(n)||this.Pn.set(n,new Set),this.Pn.get(n)},n}());function v(n={}){const{immediate:e=!1,onNeedRefresh:t,onOfflineReady:r}=n;let i;return"serviceWorker"in navigator&&(i=new u("/prettydb/sw.js",{scope:"/prettydb/"}),i.addEventListener("activated",(n=>{n.isUpdate?window.location.reload():null==r||r()})),i.register({immediate:e}).then((n=>n))),async(n=!0)=>{}}export{v as registerSW};
