import{c as F,a as y,r as p,G as M,u as O,b as x,d as S,j as n,L as k,h as L,e as T,f as _}from"./index-_zzJulur.js";var f;(function(e){e.maroon="#800000",e.red="#FF0000",e.orange="#FFA500",e.yellow="#FFFF00",e.olive="#808000",e.green="#008000",e.purple="#800080",e.fuchsia="#FF00FF",e.lime="#00FF00",e.teal="#008080",e.aqua="#00FFFF",e.blue="#0000FF",e.navy="#000080",e.black="#000000",e.gray="#808080",e.silver="#C0C0C0",e.white="#FFFFFF"})(f||(f={}));var E=function(e,s){if(Object.keys(f).includes(e)&&(e=f[e]),e[0]==="#"&&(e=e.slice(1)),e.length===3){var r="";e.split("").forEach(function(t){r+=t,r+=t}),e=r}var i=(e.match(/.{2}/g)||[]).map(function(t){return parseInt(t,16)}).join(", ");return"rgba(".concat(i,", ").concat(s,")")},m=function(){return m=Object.assign||function(e){for(var s,r=1,i=arguments.length;r<i;r++){s=arguments[r];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e},m.apply(this,arguments)},N=function(e,s){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&s.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,i=Object.getOwnPropertySymbols(e);t<i.length;t++)s.indexOf(i[t])<0&&Object.prototype.propertyIsEnumerable.call(e,i[t])&&(r[i[t]]=e[i[t]]);return r},P=F("BarLoader","0% {left: -35%;right: 100%} 60% {left: 100%;right: -90%} 100% {left: 100%;right: -90%}","long"),V=F("BarLoader","0% {left: -200%;right: 100%} 60% {left: 107%;right: -8%} 100% {left: 107%;right: -8%}","short");function R(e){var s=e.loading,r=s===void 0?!0:s,i=e.color,t=i===void 0?"#000000":i,o=e.speedMultiplier,l=o===void 0?1:o,d=e.cssOverride,u=d===void 0?{}:d,g=e.height,c=g===void 0?4:g,h=e.width,v=h===void 0?100:h,a=N(e,["loading","color","speedMultiplier","cssOverride","height","width"]),w=m({display:"inherit",position:"relative",width:y(v),height:y(c),overflow:"hidden",backgroundColor:E(t,.2),backgroundClip:"padding-box"},u),j=function(b){return{position:"absolute",height:y(c),overflow:"hidden",backgroundColor:t,backgroundClip:"padding-box",display:"block",borderRadius:2,willChange:"left, right",animationFillMode:"forwards",animation:"".concat(b===1?P:V," ").concat(2.1/l,"s ").concat(b===2?"".concat(1.15/l,"s"):""," ").concat(b===1?"cubic-bezier(0.65, 0.815, 0.735, 0.395)":"cubic-bezier(0.165, 0.84, 0.44, 1)"," infinite")}};return r?p.createElement("span",m({style:w},a),p.createElement("span",{style:j(1)}),p.createElement("span",{style:j(2)})):null}function z(e){return M({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M464 428 339.92 303.9a160.48 160.48 0 0 0 30.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0 0 94.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 1 1 110.37-110.37 110.5 110.5 0 0 1-110.37 110.37z"},child:[]}]})(e)}const A=()=>{const e=O(),s=x(a=>a.media.isLoading),{query:r,isLoading:i}=x(a=>a.search),[t,o]=p.useState(!1),[l,d]=p.useState(!1),u=S(),g=a=>{e(L(a))},c=()=>{r.trim().length>0&&(e(T()),u("/search"))},h={movieTypes:[{title:"Popular",path:"/movie/popular"},{title:"Now Playing",path:"/movie/now_playing"},{title:"Upcoming",path:"/movie/upcoming"},{title:"Top Rated",path:"/movie/top_rated"}],tvShowTypes:[{title:"Popular",path:"/tv/popular"},{title:"Airing Today",path:"/tv/on_the_air"},{title:"Top Rated",path:"/tv/top_rated"}]},v=a=>{e(_()),u(a)};return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"header",children:[n.jsxs("div",{className:"logoContainer",children:[n.jsx("h1",{children:"MWM"}),n.jsx("p",{children:"Must Watch Movies"})]}),n.jsxs("div",{className:"searchContainer",children:[n.jsx("input",{type:"search",placeholder:"Search...",name:"",id:"",value:r,onChange:a=>g(a.target.value),onKeyDown:a=>a.key==="Enter"&&c()}),n.jsx("button",{onClick:()=>c(),title:"Search",children:n.jsx(z,{})})]}),n.jsxs("div",{className:"linkContainer",children:[n.jsxs("span",{onMouseEnter:()=>o(!t),onMouseLeave:()=>o(!t),children:[n.jsx("span",{children:"Movies"}),t&&n.jsx("ul",{children:h.movieTypes.map(a=>n.jsx("li",{onClick:()=>v(a.path),children:a.title},a.title))})]}),n.jsxs("span",{onMouseEnter:()=>d(!l),onMouseLeave:()=>d(!l),children:[n.jsx("span",{children:"TV Shows"}),l&&n.jsx("ul",{children:h.tvShowTypes.map(a=>n.jsx("li",{onClick:()=>v(a.path),children:a.title},a.title))})]}),n.jsx("span",{children:n.jsx(k,{to:"/",children:"Home"})})]})]}),(s||i)&&n.jsx(R,{width:"100%",color:"blue"})]})};export{A as Header};