if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,a)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-f7a60410"],(function(e){"use strict";e.enable(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/[...all].b6082e59.js",revision:"0fba3e4eb6da5753467c2715f9e111f7"},{url:"assets/[...all].f8ebd110.css",revision:"9cc41c484f8e872657bf229510b37233"},{url:"assets/app.ee03c6f9.css",revision:"c340fdbc86758b91f6aac88112c6b00f"},{url:"assets/app.f9f6db8d.js",revision:"04527a98dd5eb3ace00218109d70787d"},{url:"assets/changelog.c4a2d241.css",revision:"e73b55dfab0b698a1a90913118c18df6"},{url:"assets/changelog.cf9fe0e9.js",revision:"99191d2bf4d8cf1e99ef7e7dc0c35738"},{url:"assets/db.1c624587.js",revision:"765c3fd59ac5a075ce372e8155e56d74"},{url:"assets/dexie-export-import.256887fd.js",revision:"7b67d1fb5d5255cdccf83172962d9563"},{url:"assets/index.3e6d5e57.css",revision:"f6b39cf485e861d4ef51cc65b9c57ff8"},{url:"assets/index.45e39227.js",revision:"2648bb056854aa22f80b5719e3951e08"},{url:"assets/index.b80212dc.css",revision:"b6c8658bd429de589a325411d36afe3d"},{url:"assets/index.e03140e0.js",revision:"df94a6afabc3b7613eb4f23a794ab277"},{url:"assets/vendor.bb6b99a8.js",revision:"4ebb7f93699029740d97995fe36754ab"},{url:"assets/virtual_pwa-register.151256e2.js",revision:"ee552d95e132467d363089ce41e19b8d"},{url:"index.html",revision:"b64be8a56887ea852e79eaa3de4e4928"},{url:"favicon.svg",revision:"4a057b727a08cfbed1b04ea3b6eb37fa"},{url:"robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"},{url:"sitemap.xml",revision:"87a0e9e12ccaba33f026e321f7e166de"},{url:"apple-icon.png",revision:"9733c46c082569d2109f7c9a09272ea2"},{url:"pwa-icon.png",revision:"636c51711dad38fcae50f770f5a7e709"},{url:"manifest.webmanifest",revision:"363c0b6e3252c1dac7b5fd8400373469"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/https:\/\/adhi-1989\.github\.io\/.+\.(svg|png)$/,new e.CacheFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:128,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=sw.js.map
