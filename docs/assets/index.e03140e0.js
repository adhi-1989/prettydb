import{a as t}from"./app.f9f6db8d.js";import{g as e,u as a,q as o,j as s,p as i,n,s as l,E as r,w as p,C as f,t as c}from"./vendor.bb6b99a8.js";import{d as m}from"./db.1c624587.js";var d=e({setup(){const{t:e}=a();o({title:e("pages.settings.title"),meta:[{name:"description",content:e("pages.settings.description")}],link:[{rel:"canonical",href:"https://prettydb.adhi.jp/settings"}]});const i=s(!1),n=s(),l=s(),r=s("dummy.dat"),p=s("hall-of-fame/data"),f=()=>{i.value=!0,window.setTimeout((()=>{i.value=!1}),3e3)};return{t:e,showToast:i,importRef:n,downloadRef:l,fileName:r,openFileChooser:t=>{if(p.value=t,n.value){n.value.click()}},exportData:async a=>{const{exportDB:o}=await t((()=>import("./dexie-export-import.256887fd.js")),["/prettydb/assets/dexie-export-import.256887fd.js","/prettydb/assets/db.1c624587.js","/prettydb/assets/vendor.bb6b99a8.js"]);if(l.value&&"hall-of-fame/data"===a){const t=e("pages.settings.content.export-import.file-name.hall-of-fame.data"),a=new Date,s=`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`,i=await o(m),n=l.value;n.href=window.URL.createObjectURL(i),n.download=`${t}-${s}.dat`,n.click()}},importData:async()=>{const{importInto:e}=await t((()=>import("./dexie-export-import.256887fd.js")),["/prettydb/assets/dexie-export-import.256887fd.js","/prettydb/assets/db.1c624587.js","/prettydb/assets/vendor.bb6b99a8.js"]);if(n.value){const t=n.value;if(t.files){const a=t.files[0];"hall-of-fame/data"===p.value&&e(m,a,{clearTablesBeforeImport:!0}).then((()=>{f()}))}}}}}});const u={class:"settings-root"},g={class:"content export-import"},h={class:"label"},v={class:"items"},b={class:"item hall-of-fame"},w={class:"label"},x={key:0,class:"toast"},_={class:"invisible"};d.render=function(t,e,a,o,s,m){return i(),n("article",u,[l("section",g,[l("h1",h,r(t.t("pages.settings.content.export-import.label")),1),l("div",v,[l("div",b,[l("span",w,r(t.t("pages.hall-of-fame.name")),1),l("div",{class:"button export",onClick:e[1]||(e[1]=e=>t.exportData("hall-of-fame/data"))},r(t.t("pages.settings.content.export-import.button.export")),1),l("div",{class:"button import",onClick:e[2]||(e[2]=e=>t.openFileChooser("hall-of-fame/data"))},r(t.t("pages.settings.content.export-import.button.import")),1)])])]),l(c,{name:"toast"},{default:p((()=>[t.showToast?(i(),n("section",x,r(t.t("pages.settings.content.toast.import")),1)):f("v-if",!0)])),_:1}),l("section",_,[l("input",{ref:"importRef",type:"file",onChange:e[3]||(e[3]=(...e)=>t.importData&&t.importData(...e))},null,544),l("a",{ref:"downloadRef",href:"#",download:t.fileName},null,8,["download"])])])};export default d;