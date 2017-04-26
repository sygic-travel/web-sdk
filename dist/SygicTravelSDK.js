!(function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("SygicTravelSDK",[],t):"object"==typeof exports?exports.SygicTravelSDK=t():e.SygicTravelSDK=t()})(this,(function(){return (function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=46)})([(function(e,t,n){"use strict";function r(e){return"[object Array]"===P.call(e)}function o(e){return"[object ArrayBuffer]"===P.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function f(e){return"[object Date]"===P.call(e)}function p(e){return"[object File]"===P.call(e)}function d(e){return"[object Blob]"===P.call(e)}function h(e){return"[object Function]"===P.call(e)}function y(e){return l(e)&&h(e.pipe)}function m(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function v(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function b(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function w(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=w(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)b(arguments[n],e);return t}function _(e,t,n){return b(t,(function(t,r){e[r]=n&&"function"==typeof t?x(t,n):t})),e}var x=n(7),P=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isFormData:i,isArrayBufferView:a,isString:s,isNumber:u,isObject:l,isUndefined:c,isDate:f,isFile:p,isBlob:d,isFunction:h,isStream:y,isURLSearchParams:m,isStandardBrowserEnv:g,forEach:b,merge:w,extend:_,trim:v}}),(function(e,t,n){"use strict";(function(t){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(3):void 0!==t&&(e=n(3)),e}var i=n(0),a=n(27),s=/^\)\]\}',?\n/,u={"Content-Type":"application/x-www-form-urlencoded"},c={adapter:o(),transformRequest:[function(e,t){return a(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(s,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),i.forEach(["post","put","patch"],(function(e){c.headers[e]=i.merge(u)})),e.exports=c}).call(t,n(31))}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(38);t.locationToCanvasCoordinate=r.locationToCanvasCoordinate,t.locationToTileCoordinate=r.locationToTileCoordinate,t.normalizeLng=r.normalizeLng;var o=n(39);t.boundsToMapTileKeys=o.boundsToMapTileKeys}),(function(e,t,n){"use strict";var r=n(0),o=n(19),i=n(22),a=n(28),s=n(26),u=n(6),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(21);e.exports=function(e){return new Promise(function(t,l){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"];var d=new XMLHttpRequest,h="onreadystatechange",y=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in d||s(e.url)||(d=new window.XDomainRequest,h="onload",y=!0,d.onprogress=function(){},d.ontimeout=function(){}),e.auth){var m=e.auth.username||"",v=e.auth.password||"";p.Authorization="Basic "+c(m+":"+v)}if(d.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d[h]=function(){if(d&&(4===d.readyState||y)&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null;o(t,l,{data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:1223===d.status?204:d.status,statusText:1223===d.status?"No Content":d.statusText,headers:n,config:e,request:d}),d=null}},d.onerror=function(){l(u("Network Error",e)),d=null},d.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),d=null},r.isStandardBrowserEnv()){var g=n(24),b=(e.withCredentials||s(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in d&&r.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)})),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(e){if("json"!==d.responseType)throw e}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),l(e),d=null)})),void 0===f&&(f=null),d.send(f)})}}),(function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r}),(function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}}),(function(e,t,n){"use strict";var r=n(18);e.exports=function(e,t,n,o){return r(new Error(e),t,n,o)}}),(function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}}),(function(e,t,n){"use strict";function r(e,t){a=e,s=t}function o(){return a}function i(){return s}Object.defineProperty(t,"__esModule",{value:!0});var a=null,s=null;t.setEnvironment=r,t.getApiUrl=o,t.getClientKey=i}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(function(){function e(e,t,n,r){this._status=e,this._statusCode=t,this._statusMessage=n,this._data=r}return Object.defineProperty(e.prototype,"status",{get:function(){return this._status},set:function(e){this._status=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusCode",{get:function(){return this._statusCode},set:function(e){this._statusCode=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusMessage",{get:function(){return this._statusMessage},set:function(e){this._statusMessage=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"data",{get:function(){return this._data},set:function(e){this._data=e},enumerable:!0,configurable:!0}),e})();t.ApiResponse=r}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(45);t.get=r.get;var o=n(9);t.ApiResponse=o.ApiResponse}),(function(e,t,n){"use strict";var r=this&&this.__extends||(function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}})();Object.defineProperty(t,"__esModule",{value:!0});var o=n(37),i=n(42),a=n(44),s=(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.getPlaces=function(e){return i.getPlaces(new i.PlacesFilter(e))},t.prototype.getPlaceDetailed=function(e,t){return i.getPlaceDetailed(e,t)},t.prototype.getPlaceMedia=function(e){return i.getPlaceMedia(e)},t.prototype.spreadPlacesOnMap=function(e,t,n,r){return a.spread(e,t,n,r)},t})(o.BaseSDK);t.default=s}),(function(e,t,n){e.exports=n(13)}),(function(e,t,n){"use strict";function r(e){var t=new a(e),n=i(a.prototype.request,t);return o.extend(n,a.prototype,t),o.extend(n,t),n}var o=n(0),i=n(7),a=n(15),s=n(1),u=r(s);u.Axios=a,u.create=function(e){return r(o.merge(s,e))},u.Cancel=n(4),u.CancelToken=n(14),u.isCancel=n(5),u.all=function(e){return Promise.all(e)},u.spread=n(29),e.exports=u,e.exports.default=u}),(function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e((function(e){n.reason||(n.reason=new o(e),t(n.reason))}))}var o=n(4);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r}),(function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var o=n(1),i=n(0),a=n(16),s=n(17),u=n(25),c=n(23);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head"],(function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}})),i.forEach(["post","put","patch"],(function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}})),e.exports=r}),(function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(0);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=r}),(function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(0),i=n(20),a=n(5),s=n(1);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}}),(function(e,t,n){"use strict";e.exports=function(e,t,n,r){return e.config=t,n&&(e.code=n),e.response=r,e}}),(function(e,t,n){"use strict";var r=n(6);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n)):e(n)}}),(function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}}),(function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),a="",s=0,u=i;o.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&t>>8-s%1*8)){if((n=o.charCodeAt(s+=.75))>255)throw new r;t=t<<8|n}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o}),(function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(0);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var a=[];o.forEach(t,(function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,(function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),a.push(r(t)+"="+r(e))})))})),i=a.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}}),(function(e,t,n){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}}),(function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?(function(){return{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),a===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}})():(function(){return{write:function(){},read:function(){return null},remove:function(){}}})()}),(function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}}),(function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?(function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}})():(function(){return function(){return!0}})()}),(function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}}),(function(e,t,n){"use strict";var r=n(0);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),(function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)})),i):i}}),(function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}),(function(e,t,n){var r,o;!(function(i){var a=function(e,t,n){if(!d(t)||y(t)||m(t)||v(t)||p(t))return t;var r,o=0,i=0;if(h(t))for(r=[],i=t.length;o<i;o++)r.push(a(e,t[o],n));else{r={};for(var s in t)t.hasOwnProperty(s)&&(r[e(s,n)]=a(e,t[s],n))}return r},s=function(e,t){t=t||{};var n=t.separator||"_",r=t.split||/(?=[A-Z])/;return e.split(r).join(n)},u=function(e){return g(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""})),e.substr(0,1).toLowerCase()+e.substr(1))},c=function(e){var t=u(e);return t.substr(0,1).toUpperCase()+t.substr(1)},l=function(e,t){return s(e,t).toLowerCase()},f=Object.prototype.toString,p=function(e){return"function"==typeof e},d=function(e){return e===Object(e)},h=function(e){return"[object Array]"==f.call(e)},y=function(e){return"[object Date]"==f.call(e)},m=function(e){return"[object RegExp]"==f.call(e)},v=function(e){return"[object Boolean]"==f.call(e)},g=function(e){return(e-=0)===e},b=function(e,t){var n=t&&"process"in t?t.process:t;return"function"!=typeof n?e:function(t,r){return n(t,e,r)}};r={camelize:u,decamelize:l,pascalize:c,depascalize:l,camelizeKeys:function(e,t){return a(b(u,t),e)},decamelizeKeys:function(e,t){return a(b(l,t),e,t)},pascalizeKeys:function(e,t){return a(b(c,t),e)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}},void 0!==(o="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=o)})()}),(function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function i(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function a(){y&&d&&(y=!1,d.length?h=d.concat(h):m=-1,h.length&&s())}function s(){if(!y){var e=o(a);y=!0;for(var t=h.length;t;){for(d=h,h=[];++m<t;)d&&d[m].run();m=-1,t=h.length}d=null,y=!1,i(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var l,f,p=e.exports={};!(function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}})();var d,h=[],y=!1,m=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new u(e,t)),1!==h.length||y||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}}),(function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,n,i){t=t||"&",n=n||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(t);var u=1e3;i&&"number"==typeof i.maxKeys&&(u=i.maxKeys);var c=e.length;u>0&&c>u&&(c=u);for(var l=0;l<c;++l){var f,p,d,h,y=e[l].replace(s,"%20"),m=y.indexOf(n);m>=0?(f=y.substr(0,m),p=y.substr(m+1)):(f=y,p=""),d=decodeURIComponent(f),h=decodeURIComponent(p),r(a,d)?o(a[d])?a[d].push(h):a[d]=[a[d],h]:a[d]=h}return a};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}),(function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,n,s){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(a(e),(function(a){var s=encodeURIComponent(o(a))+n;return i(e[a])?r(e[a],(function(e){return s+encodeURIComponent(o(e))})).join(t):s+encodeURIComponent(o(e[a]))})).join(t):s?encodeURIComponent(o(s))+n+encodeURIComponent(o(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},a=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}}),(function(e,t,n){"use strict";t.decode=t.parse=n(32),t.encode=t.stringify=n(33)}),(function(e,t,n){"use strict";function r(e){return e.mapSpread?c(e):u.get("places?"+e.toQueryString())}var o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,i=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){u.label=n[1];break}if(6===n[0]&&u.label<a[1]){u.label=a[1],a=n;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(n);break}a[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},a=this;Object.defineProperty(t,"__esModule",{value:!0});var s=n(2),u=n(10);t.getPlaces=r;var c=function(e){return o(a,void 0,void 0,(function(){var t,n,r,a,c,l,f,p,d=this;return i(this,(function(h){switch(h.label){case 0:for(t=s.boundsToMapTileKeys(e.bounds,e.zoom),n=[],r=function(t){var r=e.cloneSetBounds(null);r=r.cloneSetLimit(32),r=r.cloneSetMapTile(t);var a=new Promise(function(e){return o(d,void 0,void 0,(function(){var t,n;return i(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),t=e,[4,u.get("places?"+r.toQueryString())];case 1:return t.apply(void 0,[o.sent()]),[3,3];case 2:return n=o.sent(),e(new u.ApiResponse("",200,"",{places:[]})),[3,3];case 3:return[2]}}))}))});n.push(a)},a=0,c=t;a<c.length;a++)l=c[a],r(l);return[4,Promise.all(n)];case 1:return f=h.sent(),p=f.reduce((function(e,t){return e.statusMessage=t.statusMessage,e.statusCode=t.statusCode,e.data.places=e.data.places.concat(t.data.places),e}),new u.ApiResponse("",200,"",{places:[]})),p.data.places=p.data.places.sort((function(e,t){return e.rating>t.rating?-1:1})),[2,p]}}))}))}}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(35);t.getPlaces=r.getPlaces}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(8),o=(function(){function e(e,t){r.setEnvironment(e,t)}return e})();t.BaseSDK=o}),(function(e,t,n){"use strict";function r(e,t){var n=256,r=(e.lng+180)/360,o=Math.sin(e.lat*Math.PI/180),i=.5-Math.log((1+o)/(1-o))/(4*Math.PI),s=n<<t,u=a(r*s+.5,0,s-1)/n,c=a(i*s+.5,0,s-1)/n;return{x:Math.floor(u),y:Math.floor(c)}}function o(e,t,n){var r=t.north-e.lat,o=e.lng-t.west,i=n.height/Math.abs(t.south-t.north),a=n.width/Math.abs(t.west-t.east);return t.west>t.east&&(a=n.width/Math.abs(180-t.west+180+t.east),e.lng<0&&e.lng<t.east&&(o=180-t.west+180+e.lng),e.lng>0&&e.lng<t.west&&(o=180-t.west+180+e.lng)),{x:Math.round(o*a),y:Math.round(r*i)}}function i(e){var t=Math.abs(e);return t>360&&(t-=360*Math.floor(t/360)),t>180&&(t-=360),e<0?t*-1:t}Object.defineProperty(t,"__esModule",{value:!0}),t.locationToTileCoordinate=r,t.locationToCanvasCoordinate=o,t.normalizeLng=i;var a=function(e,t,n){return Math.max(t,Math.min(e,n))}}),(function(e,t,n){"use strict";function r(e,t){if(e=Object.assign({},e),e.west=o.normalizeLng(e.west),e.east=o.normalizeLng(e.east),e.west>e.east){var n={south:e.south,west:e.west,north:e.north,east:179.99999},i={south:e.south,west:-180,north:e.north,east:e.east};return r(n,t).concat(r(i,t))}for(var a=o.locationToTileCoordinate({lat:e.north,lng:e.east},t),s=o.locationToTileCoordinate({lat:e.south,lng:e.west},t),u={x:a.x,y:a.y},c=[];u.y<=s.y;){for(;u.x>=s.x;){for(var l="",f=t;f>0;f--){var p=0,d=1<<f-1;0!=(u.x&d)&&(p+=1),0!=(u.y&d)&&(p+=2),l+=p.toString()}c.push(l),u.x-=1}u.y+=1,u.x=a.x}return c}Object.defineProperty(t,"__esModule",{value:!0});var o=n(2);t.boundsToMapTileKeys=r}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(34),o=(function(){function e(e){this._query=e.query,this._mapTile=e.mapTile,this._mapSpread=e.mapSpread,this._categories=e.categories,this._tags=e.tags,this._parent=e.parent,this._level=e.level,this._limit=e.limit,this._bounds=e.bounds,this._zoom=e.zoom,this.validate()}return Object.defineProperty(e.prototype,"mapSpread",{get:function(){return this._mapSpread},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bounds",{get:function(){return this._bounds},enumerable:!0,configurable:!0}),e.prototype.cloneSetBounds=function(e){var t=Object.create(this);return Object.assign(t,this,{_bounds:e})},e.prototype.cloneSetLimit=function(e){var t=Object.create(this);return Object.assign(t,this,{_limit:e})},e.prototype.cloneSetMapTile=function(e){var t=Object.create(this);return Object.assign(t,this,{_mapTile:e})},Object.defineProperty(e.prototype,"zoom",{get:function(){return this._zoom},enumerable:!0,configurable:!0}),e.prototype.toQueryString=function(){var e={};return this._query&&(e.query=this._query),this._mapTile&&(e.map_tile=this._mapTile),this._mapSpread&&(e.map_spread=this._mapSpread),this._categories&&this._categories.length>0&&(e.categories=this._categories.join("|")),this._tags&&this._tags.length>0&&(e.tags=this._tags.join("|")),this._parent&&(e.parent=this._parent),this._level&&(e.level=this._level),this._limit&&(e.limit=this._limit),this._bounds&&(e.bounds=this._bounds.south+","+this._bounds.west+","+this._bounds.north+","+this._bounds.east),r.stringify(e)},e.prototype.validate=function(){if(this._mapSpread){if(this._limit)throw new Error("Do not use limit with mapSpread.");if(!this._bounds)throw new Error("Bounds must be specified when calling with mapSpread.");if(!this._zoom)throw new Error("Zoom must be specified when calling with mapSpread.")}},e})();t.PlacesFilter=o}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(30),o="300x300";t.mapPlaceApiResponseToPlaces=function(e){return e.data.places.map((function(e){return i(e,null)}))},t.mapPlaceDetailedApiResponseToPlace=function(e,t){var n=e.data.place;return i(n,a(n,t))};var i=function(e,t){return{guid:e.guid,level:e.level,rating:e.rating,location:e.location,quadkey:e.quadkey,name:e.name,nameSuffix:e.name_suffix,boundingBox:e.bounding_box,perex:e.perex,url:e.url,thumbnailUrl:e.thumbnail_url,price:e.price,marker:e.marker,categories:e.categories,parents:e.parent_guids,detail:t}},a=function(e,n){var o=e.tags.map((function(e){return r.camelizeKeys(e)})),i=e.description?r.camelizeKeys(e.description):null,a=e.references.map((function(e){return r.camelizeKeys(e)}));return{tags:o,address:e.address,admission:e.admission,description:i,email:e.email,duration:e.duration,openingHours:e.opening_hours,phone:e.phone,media:t.mapMainMediaToMedia(r.camelizeKeys(e.main_media),n),references:a}};t.mapMainMediaToMedia=function(e,t){var n={square:null,videoPreview:null,portrait:null,landscape:null};return e&&Object.keys(e.usage).forEach((function(r){var i=e.usage[r];n[r]=e.media.reduce((function(e,n){return n.guid===i?(n.urlTemplate=n.urlTemplate.replace(/{size}/i,t||o),n):e}),null)})),n}}),(function(e,t,n){"use strict";function r(e){return a(this,void 0,void 0,(function(){var t;return s(this,(function(n){switch(n.label){case 0:return[4,u.getPlaces(e)];case 1:if(t=n.sent(),!t.data.hasOwnProperty("places"))throw new Error("Wrong API response");return[2,f.mapPlaceApiResponseToPlaces(t)]}}))}))}function o(e,t){return a(this,void 0,void 0,(function(){var n;return s(this,(function(r){switch(r.label){case 0:return[4,c.get("place-details/"+e)];case 1:if(n=r.sent(),!n.data.hasOwnProperty("place"))throw new Error("Wrong API response");return[2,f.mapPlaceDetailedApiResponseToPlace(n,t)]}}))}))}function i(e){return a(this,void 0,void 0,(function(){var t;return s(this,(function(n){switch(n.label){case 0:return[4,c.get("places/"+e+"/media")];case 1:if(t=n.sent(),!t.data.hasOwnProperty("media"))throw new Error("Wrong API response");return[2,t.data.media.map((function(e){return e}))]}}))}))}var a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})},s=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,i=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){u.label=n[1];break}if(6===n[0]&&u.label<a[1]){u.label=a[1],a=n;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(n);break}a[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s};Object.defineProperty(t,"__esModule",{value:!0});var u=n(36),c=n(10),l=n(40);t.PlacesFilter=l.PlacesFilter;var f=n(41);t.getPlaces=r,t.getPlaceDetailed=o,t.getPlaceMedia=i}),(function(e,t,n){"use strict";function r(e,t,n,r){return e.reduce((function(e,o){return i(e,o,t,n,r)}),{hidden:[],visible:[]})}Object.defineProperty(t,"__esModule",{value:!0});var o=n(2);t.spread=r;var i=function(e,t,n,r,i){if(!t.location)return e.hidden.push(t),e;for(var s=o.locationToCanvasCoordinate(t.location,r,i),u=0,c=n;u<c.length;u++){var l=c[u];if((!l.photoRequired||t.thumbnailUrl)&&!(l.minimalRating&&t.rating<=l.minimalRating||a(l,s,e.visible)))return e.visible.push({place:t,coordinate:s,size:l}),e}return e.hidden.push(t),e},a=function(e,t,n){for(var r,o=e.radius,i=0,a=n;i<a.length;i++){var s=a[i],u=e.margin>s.size.margin?e.margin:s.size.margin;if(r=s.size.radius,Math.pow(t.x-s.coordinate.x,2)+Math.pow(t.y-s.coordinate.y,2)<=Math.pow(o+r+u,2))return!0}return!1}}),(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(43);t.spread=r.spread}),(function(e,t,n){"use strict";function r(e){return o(this,void 0,void 0,(function(){var n;return i(this,(function(r){switch(r.label){case 0:return[4,t.axiosInstance.get(e,{baseURL:s.getApiUrl(),headers:{"x-api-key":s.getClientKey()}})];case 1:return n=r.sent(),[2,new u.ApiResponse(n.data.status,n.data.status_code,n.data.status_message,n.data.data)]}}))}))}var o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,i=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){u.label=n[1];break}if(6===n[0]&&u.label<a[1]){u.label=a[1],a=n;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(n);break}a[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s};Object.defineProperty(t,"__esModule",{value:!0});var a=n(12),s=n(8),u=n(9);t.axiosInstance=a.default.create(),t.axiosInstance.interceptors.request.use((function(e){if(!e.baseURL)throw new Error("API Url not set");if(!e.headers["x-api-key"])throw new Error("Client key not set");return e})),t.get=r}),(function(e,t,n){"use strict";function r(e,t){return new o.default(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(11);t.create=r})])}));