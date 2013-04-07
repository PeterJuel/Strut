var requirejs,require,define;(function(global){function isFunction(t){return"[object Function]"===ostring.call(t)}function isArray(t){return"[object Array]"===ostring.call(t)}function each(t,e){if(t){var i;for(i=0;t.length>i&&(!t[i]||!e(t[i],i,t));i+=1);}}function eachReverse(t,e){if(t){var i;for(i=t.length-1;i>-1&&(!t[i]||!e(t[i],i,t));i-=1);}}function hasProp(t,e){return hasOwn.call(t,e)}function eachProp(t,e){var i;for(i in t)if(t.hasOwnProperty(i)&&e(t[i],i))break}function mixin(t,e,i,n){return e&&eachProp(e,function(e,o){(i||!hasProp(t,o))&&(n&&"string"!=typeof e?(t[o]||(t[o]={}),mixin(t[o],e,i,n)):t[o]=e)}),t}function bind(t,e){return function(){return e.apply(t,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(t){if(!t)return t;var e=global;return each(t.split("."),function(t){e=e[t]}),e}function makeContextModuleFunc(t,e,i){return function(){var n,o=aps.call(arguments,0);return i&&isFunction(n=o[o.length-1])&&(n.__requireJsBuild=!0),o.push(e),t.apply(null,o)}}function addRequireMethods(t,e,i){each([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(n){var o=n[1]||n[0];t[n[0]]=e?makeContextModuleFunc(e[o],i):function(){var t=contexts[defContextName];return t[o].apply(t,arguments)}})}function makeError(t,e,i,n){var o=Error(e+"\nhttp://requirejs.org/docs/errors.html#"+t);return o.requireType=t,o.requireModules=n,i&&(o.originalError=i),o}function newContext(t){function e(t){var e,i;for(e=0;t[e];e+=1)if(i=t[e],"."===i)t.splice(e,1),e-=1;else if(".."===i){if(1===e&&(".."===t[2]||".."===t[0]))break;e>0&&(t.splice(e-1,2),e-=2)}}function i(t,i,n){var o,r,g,s,I,a,c,l,C,u,A,d=i&&i.split("/"),h=d,p=v.map,m=p&&p["*"];if(t&&"."===t.charAt(0)&&(i?(h=v.pkgs[i]?d=[i]:d.slice(0,d.length-1),t=h.concat(t.split("/")),e(t),r=v.pkgs[o=t[0]],t=t.join("/"),r&&t===o+"/"+r.main&&(t=o)):0===t.indexOf("./")&&(t=t.substring(2))),n&&(d||m)&&p){for(s=t.split("/"),I=s.length;I>0;I-=1){if(c=s.slice(0,I).join("/"),d)for(a=d.length;a>0;a-=1)if(g=p[d.slice(0,a).join("/")],g&&(g=g[c])){l=g,C=I;break}if(l)break;!u&&m&&m[c]&&(u=m[c],A=I)}!l&&u&&(l=u,C=A),l&&(s.splice(0,C,l),t=s.join("/"))}return t}function n(t){isBrowser&&each(scripts(),function(e){return e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===y.contextName?(e.parentNode.removeChild(e),!0):void 0})}function o(t){var e=v.paths[t];return e&&isArray(e)&&e.length>1?(n(t),e.shift(),y.undef(t),y.require([t]),!0):void 0}function r(t,e,n,o){var r,g,s,I=t?t.indexOf("!"):-1,a=null,c=e?e.name:null,l=t,C=!0,u="";return t||(C=!1,t="_@r"+(w+=1)),-1!==I&&(a=t.substring(0,I),t=t.substring(I+1,t.length)),a&&(a=i(a,c,o),g=T[a]),t&&(a?u=g&&g.normalize?g.normalize(t,function(t){return i(t,c,o)}):i(t,c,o):(u=i(t,c,o),r=y.nameToUrl(u))),s=!a||g||n?"":"_unnormalized"+(x+=1),{prefix:a,name:u,parentMap:e,unnormalized:!!s,url:r,originalName:l,isDefine:C,id:(a?a+"!"+u:u)+s}}function g(t){var e=t.id,i=z[e];return i||(i=z[e]=new y.Module(t)),i}function s(t,e,i){var n=t.id,o=z[n];!hasProp(T,n)||o&&!o.defineEmitComplete?g(t).on(e,i):"defined"===e&&i(T[n])}function I(t,e){var i=t.requireModules,n=!1;e?e(t):(each(i,function(e){var i=z[e];i&&(i.error=t,i.events.error&&(n=!0,i.emit("error",t)))}),n||req.onError(t))}function a(){globalDefQueue.length&&(apsp.apply(j,[j.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function c(t,e,i){var n=t&&t.map,o=makeContextModuleFunc(i||y.require,n,e);return addRequireMethods(o,y,n),o.isBrowser=isBrowser,o}function l(t){delete z[t],each(D,function(e,i){return e.map.id===t?(D.splice(i,1),e.defined||(y.waitCount-=1),!0):void 0})}function C(t,e,i){var n,o=t.map.id,r=t.depMaps;if(t.inited)return e[o]?t:(e[o]=!0,each(r,function(t){var o=t.id,r=z[o];if(r&&!i[o]&&r.inited&&r.enabled)return n=C(r,e,i)}),i[o]=!0,n)}function u(t,e,i){var n=t.map.id,o=t.depMaps;if(t.inited&&t.map.isDefine)return e[n]?T[n]:(e[n]=t,each(o,function(o){var r,g=o.id,s=z[g];if(!M[g]&&s){if(!s.inited||!s.enabled)return i[n]=!0,void 0;r=u(s,e,i),i[g]||t.defineDepById(g,r)}}),t.check(!0),T[n])}function A(t){t.check()}function d(){var t,e,i,r,g=1e3*v.waitSeconds,s=g&&y.startTime+g<(new Date).getTime(),a=[],c=!1,l=!0;if(!f){if(f=!0,eachProp(z,function(i){if(t=i.map,e=t.id,i.enabled&&!i.error)if(!i.inited&&s)o(e)?(r=!0,c=!0):(a.push(e),n(e));else if(!i.inited&&i.fetched&&t.isDefine&&(c=!0,!t.prefix))return l=!1}),s&&a.length)return i=makeError("timeout","Load timeout for modules: "+a,null,a),i.contextName=y.contextName,I(i);l&&(each(D,function(t){if(!t.defined){var e=C(t,{},{}),i={};e&&(u(e,i,{}),eachProp(i,A))}}),eachProp(z,A)),s&&!r||!c||!isBrowser&&!isWebWorker||N||(N=setTimeout(function(){N=0,d()},50)),f=!1}}function h(t){g(r(t[0],null,!0)).init(t[1],t[2])}function p(t,e,i,n){t.detachEvent&&!isOpera?n&&t.detachEvent(n,e):t.removeEventListener(i,e,!1)}function m(t){var e=t.currentTarget||t.srcElement;return p(e,y.onScriptLoad,"load","onreadystatechange"),p(e,y.onScriptError,"error"),{node:e,id:e&&e.getAttribute("data-requiremodule")}}var f,b,y,M,N,v={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},z={},W={},j=[],T={},Z={},w=1,x=1,D=[];return M={require:function(t){return c(t)},exports:function(t){return t.usingExports=!0,t.map.isDefine?t.exports=T[t.map.id]={}:void 0},module:function(t){return t.module={id:t.map.id,uri:t.map.url,config:function(){return v.config&&v.config[t.map.id]||{}},exports:T[t.map.id]}}},b=function(t){this.events=W[t.id]||{},this.map=t,this.shim=v.shim[t.id],this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(t,e,i,n){n=n||{},this.inited||(this.factory=e,i?this.on("error",i):this.events.error&&(i=bind(this,function(t){this.emit("error",t)})),this.depMaps=t&&t.slice(0),this.depMaps.rjsSkipMap=t.rjsSkipMap,this.errback=i,this.inited=!0,this.ignore=n.ignore,n.enabled||this.enabled?this.enable():this.check())},defineDepById:function(t,e){var i;return each(this.depMaps,function(e,n){return e.id===t?(i=n,!0):void 0}),this.defineDep(i,e)},defineDep:function(t,e){this.depMatched[t]||(this.depMatched[t]=!0,this.depCount-=1,this.depExports[t]=e)},fetch:function(){if(!this.fetched){this.fetched=!0,y.startTime=(new Date).getTime();var t=this.map;return this.shim?(c(this,!0)(this.shim.deps||[],bind(this,function(){return t.prefix?this.callPlugin():this.load()})),void 0):t.prefix?this.callPlugin():this.load()}},load:function(){var t=this.map.url;Z[t]||(Z[t]=!0,y.load(this.map.id,t))},check:function(t){if(this.enabled&&!this.enabling){var e,i,n=this.map.id,o=this.depExports,r=this.exports,g=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(g)){if(this.events.error)try{r=y.execCb(n,g,o,r)}catch(s){e=s}else r=y.execCb(n,g,o,r);if(this.map.isDefine&&(i=this.module,i&&void 0!==i.exports&&i.exports!==this.exports?r=i.exports:void 0===r&&this.usingExports&&(r=this.exports)),e)return e.requireMap=this.map,e.requireModules=[this.map.id],e.requireType="define",I(this.error=e)}else r=g;this.exports=r,this.map.isDefine&&!this.ignore&&(T[n]=r,req.onResourceLoad&&req.onResourceLoad(y,this.map,this.depMaps)),delete z[n],this.defined=!0,y.waitCount-=1,0===y.waitCount&&(D=[])}this.defining=!1,t||this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var t=this.map,e=t.id,n=r(t.prefix,null,!1,!0);s(n,"defined",bind(this,function(n){var o,a,C,u=this.map.name,A=this.map.parentMap?this.map.parentMap.name:null;return this.map.unnormalized?(n.normalize&&(u=n.normalize(u,function(t){return i(t,A,!0)})||""),a=r(t.prefix+"!"+u,this.map.parentMap,!1,!0),s(a,"defined",bind(this,function(t){this.init([],function(){return t},null,{enabled:!0,ignore:!0})})),C=z[a.id],C&&(this.events.error&&C.on("error",bind(this,function(t){this.emit("error",t)})),C.enable()),void 0):(o=bind(this,function(t){this.init([],function(){return t},null,{enabled:!0})}),o.error=bind(this,function(t){this.inited=!0,this.error=t,t.requireModules=[e],eachProp(z,function(t){0===t.map.id.indexOf(e+"_unnormalized")&&l(t.map.id)}),I(t)}),o.fromText=function(t,e){var i=useInteractive;i&&(useInteractive=!1),g(r(t)),req.exec(e),i&&(useInteractive=!0),y.completeLoad(t)},n.load(t.name,c(t.parentMap,!0,function(t,e,i){return t.rjsSkipMap=!0,y.require(t,e,i)}),o,v),void 0)})),y.enable(n,this),this.pluginMaps[n.id]=n},enable:function(){this.enabled=!0,this.waitPushed||(D.push(this),y.waitCount+=1,this.waitPushed=!0),this.enabling=!0,each(this.depMaps,bind(this,function(t,e){var i,n,o;if("string"==typeof t){if(t=r(t,this.map.isDefine?this.map:this.map.parentMap,!1,!this.depMaps.rjsSkipMap),this.depMaps[e]=t,o=M[t.id])return this.depExports[e]=o(this),void 0;this.depCount+=1,s(t,"defined",bind(this,function(t){this.defineDep(e,t),this.check()})),this.errback&&s(t,"error",this.errback)}i=t.id,n=z[i],M[i]||!n||n.enabled||y.enable(t,this)})),eachProp(this.pluginMaps,bind(this,function(t){var e=z[t.id];e&&!e.enabled&&y.enable(t,this)})),this.enabling=!1,this.check()},on:function(t,e){var i=this.events[t];i||(i=this.events[t]=[]),i.push(e)},emit:function(t,e){each(this.events[t],function(t){t(e)}),"error"===t&&delete this.events[t]}},y={config:v,contextName:t,registry:z,defined:T,urlFetched:Z,waitCount:0,defQueue:j,Module:b,makeModuleMap:r,configure:function(t){t.baseUrl&&"/"!==t.baseUrl.charAt(t.baseUrl.length-1)&&(t.baseUrl+="/");var e=v.pkgs,i=v.shim,n=v.paths,o=v.map;mixin(v,t,!0),v.paths=mixin(n,t.paths,!0),t.map&&(v.map=mixin(o||{},t.map,!0,!0)),t.shim&&(eachProp(t.shim,function(t,e){isArray(t)&&(t={deps:t}),t.exports&&!t.exports.__buildReady&&(t.exports=y.makeShimExports(t.exports)),i[e]=t}),v.shim=i),t.packages&&(each(t.packages,function(t){var i;t="string"==typeof t?{name:t}:t,i=t.location,e[t.name]={name:t.name,location:i||t.name,main:(t.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),v.pkgs=e),eachProp(z,function(t,e){t.inited||t.map.unnormalized||(t.map=r(e))}),(t.deps||t.callback)&&y.require(t.deps||[],t.callback)},makeShimExports:function(t){var e;return"string"==typeof t?(e=function(){return getGlobal(t)},e.exports=t,e):function(){return t.apply(global,arguments)}},requireDefined:function(t,e){return hasProp(T,r(t,e,!1,!0).id)},requireSpecified:function(t,e){return t=r(t,e,!1,!0).id,hasProp(T,t)||hasProp(z,t)},require:function(e,i,n,o){var s,c,l,C,u;if("string"==typeof e)return isFunction(i)?I(makeError("requireargs","Invalid require call"),n):req.get?req.get(y,e,i):(s=e,o=i,l=r(s,o,!1,!0),c=l.id,hasProp(T,c)?T[c]:I(makeError("notloaded",'Module name "'+c+'" has not been loaded yet for context: '+t)));for(n&&!isFunction(n)&&(o=n,n=void 0),i&&!isFunction(i)&&(o=i,i=void 0),a();j.length;){if(u=j.shift(),null===u[0])return I(makeError("mismatch","Mismatched anonymous define() module: "+u[u.length-1]));h(u)}return C=g(r(null,o)),C.init(e,i,n,{enabled:!0}),d(),y.require},undef:function(t){a();var e=r(t,null,!0),i=z[t];delete T[t],delete Z[e.url],delete W[t],i&&(i.events.defined&&(W[t]=i.events),l(t))},enable:function(t){var e=z[t.id];e&&g(t).enable()},completeLoad:function(t){var e,i,n,r=v.shim[t]||{},g=r.exports&&r.exports.exports;for(a();j.length;){if(i=j.shift(),null===i[0]){if(i[0]=t,e)break;e=!0}else i[0]===t&&(e=!0);h(i)}if(n=z[t],!e&&!T[t]&&n&&!n.inited){if(!(!v.enforceDefine||g&&getGlobal(g)))return o(t)?void 0:I(makeError("nodefine","No define call for "+t,null,[t]));h([t,r.deps||[],r.exports])}d()},toUrl:function(t,e){var n=t.lastIndexOf("."),o=null;return-1!==n&&(o=t.substring(n,t.length),t=t.substring(0,n)),y.nameToUrl(i(t,e&&e.id,!0),o)},nameToUrl:function(t,e){var i,n,o,r,g,s,I,a,c;if(req.jsExtRegExp.test(t))a=t+(e||"");else{for(i=v.paths,n=v.pkgs,g=t.split("/"),s=g.length;s>0;s-=1){if(I=g.slice(0,s).join("/"),o=n[I],c=i[I]){isArray(c)&&(c=c[0]),g.splice(0,s,c);break}if(o){r=t===o.name?o.location+"/"+o.main:o.location,g.splice(0,s,r);break}}a=g.join("/"),a+=e||(/\?/.test(a)?"":".js"),a=("/"===a.charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":v.baseUrl)+a}return v.urlArgs?a+((-1===a.indexOf("?")?"?":"&")+v.urlArgs):a},load:function(t,e){req.load(y,t,e)},execCb:function(t,e,i,n){return e.apply(n,i)},onScriptLoad:function(t){if("load"===t.type||readyRegExp.test((t.currentTarget||t.srcElement).readyState)){interactiveScript=null;var e=m(t);y.completeLoad(e.id)}},onScriptError:function(t){var e=m(t);return o(e.id)?void 0:I(makeError("scripterror","Script error",t,[e.id]))}}}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(t){return"interactive"===t.readyState?interactiveScript=t:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.0.6",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,aps=ap.slice,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(t,e,i,n){var o,r,g=defContextName;return isArray(t)||"string"==typeof t||(r=t,isArray(e)?(t=e,e=i,i=n):t=[]),r&&r.context&&(g=r.context),o=contexts[g],o||(o=contexts[g]=req.s.newContext(g)),r&&o.configure(r),o.require(t,e,i)},req.config=function(t){return req(t)},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),addRequireMethods(req),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(t){throw t},req.load=function(t,e,i){var n,o=t&&t.config||{};return isBrowser?(n=o.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),n.type=o.scriptType||"text/javascript",n.charset="utf-8",n.async=!0,n.setAttribute("data-requirecontext",t.contextName),n.setAttribute("data-requiremodule",e),!n.attachEvent||n.attachEvent.toString&&0>(""+n.attachEvent).indexOf("[native code")||isOpera?(n.addEventListener("load",t.onScriptLoad,!1),n.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,n.attachEvent("onreadystatechange",t.onScriptLoad)),n.src=i,currentlyAddingScript=n,baseElement?head.insertBefore(n,baseElement):head.appendChild(n),currentlyAddingScript=null,n):(isWebWorker&&(importScripts(i),t.completeLoad(e)),void 0)},isBrowser&&eachReverse(scripts(),function(t){return head||(head=t.parentNode),dataMain=t.getAttribute("data-main"),dataMain?(cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0):void 0}),define=function(t,e,i){var n,o;"string"!=typeof t&&(i=e,e=t,t=null),isArray(e)||(i=e,e=[]),!e.length&&isFunction(i)&&i.length&&((""+i).replace(commentRegExp,"").replace(cjsRequireRegExp,function(t,i){e.push(i)}),e=(1===i.length?["require"]:["require","exports","module"]).concat(e)),useInteractive&&(n=currentlyAddingScript||getInteractiveScript(),n&&(t||(t=n.getAttribute("data-requiremodule")),o=contexts[n.getAttribute("data-requirecontext")])),(o?o.defQueue:globalDefQueue).push([t,e,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this);