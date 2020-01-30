/*!
 * AppDownload v0.1.13
 * last update: 2020-1-1 16:40:45
 * author: RDT
 */
!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.AppDownload=n():e.AppDownload=n()}(window,function(){return function(e){var n={};function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(n){return e[n]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var o=function(e,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)};function i(e,n){function t(){this.constructor=e}o(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}var r=function(){return(r=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};function a(e,n,t,o){return new(t||(t=Promise))(function(i,r){function a(e){try{d(o.next(e))}catch(e){r(e)}}function s(e){try{d(o.throw(e))}catch(e){r(e)}}function d(e){e.done?i(e.value):new t(function(n){n(e.value)}).then(a,s)}d((o=o.apply(e,n||[])).next())})}function s(e,n){var t,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,o=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){a=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){a.label=r[1];break}if(6===r[0]&&a.label<i[1]){a.label=i[1],i=r;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(r);break}i[2]&&a.ops.pop(),a.trys.pop();continue}r=n.call(e,a)}catch(e){r=[6,e],o=0}finally{t=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}}var d={emitDelay:10,strictMode:!1},c=function(){function e(e){var n,t;void 0===e&&(e=d),this._emitDelay=0,this._strictMode=!1,this._listeners={},this.events=[],n=e.hasOwnProperty("emitDelay")?e.emitDelay:d.emitDelay,this._emitDelay=n,t=e.hasOwnProperty("strictMode")?e.strictMode:d.strictMode,this._strictMode=t,this._listeners={},this.events=[]}return e.prototype._addListenner=function(e,n,t){if("function"!=typeof n)throw TypeError("listener must be a function");-1===this.events.indexOf(e)?(this._listeners[e]=[{once:t,fn:n}],this.events.push(e)):this._listeners[e].push({once:t,fn:n})},e.prototype.on=function(e,n){this._addListenner(e,n,!1)},e.prototype.once=function(e,n){this._addListenner(e,n,!0)},e.prototype.off=function(e,n){var t=this.events.indexOf(e);if(e&&-1!==t)if(n){var o=[],i=this._listeners[e];i.forEach(function(e,t){e.fn===n&&o.unshift(t)}),o.forEach(function(e){i.splice(e,1)}),i.length||(this.events.splice(t,1),delete this._listeners[e])}else delete this._listeners[e],this.events.splice(t,1)},e.prototype._applyEvents=function(e,n){var t=this._listeners[e];if(t&&t.length){var o=[];t.forEach(function(e,t){e.fn.apply(null,n),e.once&&o.unshift(t)}),o.forEach(function(e){t.splice(e,1)})}else if(this._strictMode)throw"No listeners specified for event: "+e},e.prototype.emit=function(e){for(var n=this,t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];this._emitDelay?setTimeout(function(){n._applyEvents(e,t)},this._emitDelay):this._applyEvents(e,t)},e.prototype.emitSync=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];this._applyEvents(e,n)},e.prototype.destroy=function(){this._listeners={},this.events=[]},e}(),p=function(e){var n,t=document.getElementsByTagName("head")[0],o=document.createElement("script");o.setAttribute("type","text/javascript"),o.setAttribute("charset","UTF-8"),o.setAttribute("src",e);return t.appendChild(o),new Promise(function(t,i){o.onload=function(){n&&clearTimeout(n),t()},n=setTimeout(function(){o.parentNode&&o.parentNode.removeChild(o),n&&clearTimeout(n),i(new Error("get "+e+" timeout"))},5e3)})},u=function(){var e=navigator.userAgent.toLowerCase(),n=0,t={},o="";if(/qqnews/.test(e)){var i=e.match(/[qqnews/|qqnewslite/](\d+)\.(\d+)\.(\d+)/)||["",0,0,0],r=i[0],a=i[1],s=i[2],d=i[3];r&&(n=100*Number(a)+Number(s)+Number(d)/1e3)}return o=(t={androidversion:e.substr(e.indexOf("android")+8,3),ipad:/ipad/.test(e),iphone:/iphone/.test(e),android:/android/.test(e),qqnews:/qqnews\//.test(e),qqnewslite:/qqnewslite\//.test(e),weixin:/micromessenger/.test(e),mqqbrowser:/mqqbrowser\//.test(e),qq:/qq\//.test(e),tenvideo:/qqlivebrowser/.test(e),qqmusic:/qqmusic/.test(e),qqac:/qqac_client/.test(e),qqnews_version:n}).weixin?"weixin":t.qq?"qq":t.qqnews?"qqnews":t.qqnewslite?"qqnewslite":t.qqmusic?"qqmusic":t.tenvideo?"tenvideo":t.qqac?"qqac":"other",t.env=o,t}(),l=function(){var e="",n="",t=function(e,n){return""!==e?e+n.slice(0,1).toUpperCase()+n.slice(1):n},o=function(){var o=!1;return["","webkit","moz","ms","o"].forEach(function(i){var r=t(i,"hidden");!o&&r in document&&(e=r,n=t(i,"visibilityState"),o=!0)}),o}();return function(){return!o||(n in document?"visible"===document[n]:e in document?!document[e]:void 0)}}(),w=function(e){return void 0===e&&(e="cb"),e+"_"+Math.random().toString(36).slice(2)},f="downloadStart",h="downloadIng",_="downloadSteps",v="downloadSuccess",y="installPending",m="installSuccess",g="cancel",q="removed",k="error",b=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__version=0,t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t}return i(n,e),n.prototype.ready=function(){var e=this;return void 0!==window.WeixinJSBridge||this.__isReady?Promise.resolve(window.WeixinJSBridge):new Promise(function(n){window.WeixinJSBridgeReady=function(){e.__isReady=!0,n(window.WeixinJSBridge),delete window.WeixinJSBridgeReady},document.addEventListener("WeixinJSBridgeReady",window.WeixinJSBridgeReady,!1)})},n.prototype.__getVersion=function(){if(this.__version)return this.__version;var e=navigator.userAgent.toLowerCase().match(/micromessenger\/(\d+)\.(\d+)\.(\d+)/)||["",0,0,0],n=e[0],t=e[1],o=e[2],i=e[3];return n?(this.__version=100*Number(t)+Number(o)+Number(i)/1e3,this.__version):0},n.prototype.getNetworkType=function(e){return a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),n={fail:"none",edge:"wwan",wwan:"wwan",wifi:"wifi"},[2,new Promise(function(t){window.WeixinJSBridge.invoke("getNetworkType",{},function(o){var i=(o.err_msg.match(/(wifi|wwan|edge|fail)/)||["fail"])[0];"function"==typeof e&&e(n[i]),t(n[i])})})]}})})},n.prototype.run=function(e){var n=this;void 0===e&&(e=""),this.openApp(e).catch(function(){n.download()})},n.prototype.checkAppIsInstalled=function(e){return a(this,void 0,void 0,function(){var n=this;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),[2,new Promise(function(t){window.WeixinJSBridge.invoke("getInstallState",{packageName:n.__data.packageName,packageUrl:n.__data.openUrl},function(n){var o=n.err_msg,i=!1;return o&&o.indexOf("yes")>-1&&(i=!0),"function"==typeof e&&e(i),t(i),i})})]}})})},n.prototype.openApp=function(e){return void 0===e&&(e=""),a(this,void 0,void 0,function(){var n,t;return s(this,function(o){switch(o.label){case 0:return[4,this.ready()];case 1:if(o.sent(),!(n=e||this.__data.openUrl)&&!this.__data.wxAppId)throw new Error("openUrl or wxAppId must need at least one");return t=this.__data.wxAppId?{appID:this.__data.wxAppId,parameter:n,extInfo:n}:{schemeUrl:n},this.__getVersion()>=605.006?[2,new Promise(function(e,n){window.WeixinJSBridge.invoke("launchApplication",t,function(t){var o=t.err_msg;"launchApplication:ok"===o?e():"launchApplication:fail"===o&&n(new Error("WeixinAppDownloader.openApp faied"))})})]:(window.location.href=e,[2,Promise.resolve()])}})})},n.prototype.download=function(){return a(this,void 0,void 0,function(){var e=this;return s(this,function(n){switch(n.label){case 0:return[4,this.ready()];case 1:if(n.sent(),u.android)window.WeixinJSBridge.invoke("addDownloadTask",{task_name:this.__data.appName,task_url:this.__data.downloadUrl,thumb_url:this.__data.downLogo},function(n){var t=n.err_msg,o=n.download_id;if(e.__getVersion()>=605.007)if("addDownloadTask:ok"===t||"add_download_task:ok"===t)e.emit(f),e.addDownloadLister();else{if("addDownloadTask:cancel"!==t&&"add_download_task:cancel"!==t)throw new Error("WeixinAppDownloader.download error, err_msg: "+t);e.emit(g)}else e.install(o)});else{if(!this.__data.appleStoreId)throw new TypeError("WeixinAppDownloader.download error: appleStoreId is needed");window.location.href="http://itunes.apple.com/cn/app/id"+this.__data.appleStoreId}return[2]}})})},n.prototype.addDownloadLister=function(){var e=this;window.WeixinJSBridge.on("wxdownload:state_change",function(n){var t=n.err_code,o=n.state;switch(o){case"download_start":e.emit(f);break;case"downloading":e.emit(h);break;case"download_fail":e.emit(k,{err_code:t});break;case"download_removed":e.emit(q);break;case"download_succ":e.emit(v);break;default:console.error("WeixinAppDownloader.addDownloadLister: unkown state:"+o)}})},n.prototype.install=function(e){window.WeixinJSBridge.invoke("installDownloadTask",{download_id:e},function(){})},n}(c),A=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t}return i(n,e),n.prototype.ready=function(){var e=this;return window.mqq||this.__isReady?Promise.resolve(window.mqq):new Promise(function(n){p("//open.mobile.qq.com/sdk/qqapi.js?_bid=152").then(function(){e.__isReady=!0,n(window.mqq)}).catch(function(e){console.log(e)})})},n.prototype.getNetworkType=function(e){return a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),n={"-1":"none",0:"none",1:"wifi",2:"wwan",3:"wwan",4:"wwan"},[2,new Promise(function(t){window.mqq.device.getNetworkType(function(o){"function"==typeof e&&e(n[o]),t(n[o])})})]}})})},n.prototype.__downloadApp=function(e,n){window.mqq.app.downloadApp({appid:this.__data.appleStoreId,url:this.__data.downloadUrl,packageName:this.__data.packageName,actionCode:e,via:"ANDROIDQQ.TXREADING",appName:this.__data.appName},function(e){"function"==typeof n&&n(e)})},n.prototype.run=function(e){var n=this;void 0===e&&(e=""),this.checkAppIsInstalled(function(t){if(t)n.openApp(e);else{n.openApp(e);var o=(new Date).valueOf();setTimeout(function(){var e=(new Date).valueOf();l()&&1560>e-o&&n.download()},1500)}})},n.prototype.checkAppIsInstalled=function(e){return a(this,void 0,void 0,function(){var n=this;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),[2,new Promise(function(t){var o=u.android?n.__data.packageName:n.__data.openUrl;window.mqq.app.isAppInstalled(o,function(n){var o=!1;"boolean"==typeof n?o=n:"object"==typeof n&&0===n.code&&n.result&&(o=!0),"function"==typeof e&&e(o),t(o)})})]}})})},n.prototype.openApp=function(e){return void 0===e&&(e=""),a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:if(t.sent(),!(n=e||this.__data.openUrl))throw new TypeError("QQAppDownloader.openApp: openUrl is needed");return u.android?window.location.href=n:window.mqq.app.launchApp(n),[2]}})})},n.prototype.download=function(){return a(this,void 0,void 0,function(){var e=this;return s(this,function(n){switch(n.label){case 0:return u.android?[4,this.ready()]:[3,2];case 1:return n.sent(),this.emit(f),this.__downloadApp(2,function(n){var t=n.state,o=n.pro;4===t&&(o=100),e.emit(_,o),o>=100&&setTimeout(function(){e.install()},200)}),[3,3];case 2:if(!this.__data.appleStoreId)throw new TypeError("WeixinAppDownloader.download error: appleStoreId is needed");window.location.href="http://itunes.apple.com/cn/app/id"+this.__data.appleStoreId,n.label=3;case 3:return[2]}})})},n.prototype.install=function(){var e=this;this.emit(y),this.__downloadApp(5,function(n){9===n.state&&e.emit(m)})},n}(c),N=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t}return i(n,e),n.prototype.ready=function(){var e=this;return window.TencentNews||this.__isReady?Promise.resolve(window.TencentNews):u.android?new Promise(function(n){p("//mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1").then(function(){e.__isReady=!0,n(window.TencentNews)}).catch(function(e){console.log(e)})}):new Promise(function(e){document.addEventListener("TencentNewsJSInjectionComplete",function(){e(window.TencentNews)})})},n.prototype.getNetworkType=function(e){return a(this,void 0,void 0,function(){var n,t;return s(this,function(o){switch(o.label){case 0:return[4,this.ready()];case 1:return o.sent(),n=w("networkCallback"),t={0:"none",1:"wifi",2:"wwan",3:"wwan"},[2,new Promise(function(o){window[n]=function(i){"function"==typeof e&&e(t[i]),o(t[i]),delete window[n]},u.android?window.TencentNews.getNetworkStatus(n):window.TencentNews.getNetworkStatus(window[n])})]}})})},n.prototype.run=function(e){var n=this;void 0===e&&(e="");var t=e||this.__data.openUrl;0===t.indexOf("http://")||0===t.indexOf("https://")||u.qqnews&&0===t.indexOf("qqnews://")||u.qqnewslite&&0===t.indexOf("qqnewslite://")?this.openApp(t):this.checkAppIsInstalled(function(t){if(t)n.openApp(e);else{n.openApp(e);var o=(new Date).valueOf();setTimeout(function(){var e=(new Date).valueOf();l()&&1560>e-o&&n.download()},1500)}})},n.prototype.checkAppIsInstalled=function(e){return a(this,void 0,void 0,function(){var n=this;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),[2,new Promise(function(t){var o=u.android?n.__data.packageName:n.__data.openUrl,i=w();window[i]=function(n,o){var i=!!(u.android?n:o);"function"==typeof e&&e(i),t(i)},u.android?window.TencentNews.checkCanOpenNativeUrl(o,i):window.TencentNews.checkCanOpenNativeUrl(o,window[i])})]}})})},n.prototype.openApp=function(e){var n=this;void 0===e&&(e="");var t=e||this.__data.openUrl;0===t.indexOf("http://")||0===t.indexOf("https://")||u.qqnews&&0===t.indexOf("qqnews://")||u.qqnewslite&&0===t.indexOf("qqnewslite://")?window.location.href=t:a(n,void 0,void 0,function(){return s(this,function(e){switch(e.label){case 0:return[4,this.ready()];case 1:return e.sent(),u.android?window.TencentNews.openApp(t,this.__data.packageName):window.TencentNews.openNativeUrl(t,function(){},null),[2]}})})},n.prototype.download=function(){return a(this,void 0,void 0,function(){return s(this,function(e){switch(e.label){case 0:return[4,this.ready()];case 1:return e.sent(),u.android?window.TencentNews.downloadApp(this.__data.downloadUrl,this.__data.packageName,this.__data.appName):window.location.href="http://itunes.apple.com/cn/app/id"+this.__data.appleStoreId,[2]}})})},n}(c),T=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t}return i(n,e),n.prototype.ready=function(){var e=this;return void 0!==window.TenvideoJSBridge||this.__isReady?Promise.resolve(window.TenvideoJSBridge):new Promise(function(n){window.TenVideoReadyCallback=function(){e.__isReady=!0,n(window.TenvideoJSBridge),delete window.TenVideoReadyCallback},document.addEventListener("onTenvideoJSBridgeReady",window.TenVideoReadyCallback,!1)})},n.prototype.getNetworkType=function(e){return a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),n={0:"none",1:"wifi",2:"wwan",3:"wwan",4:"wwan",5:"wwan"},[2,new Promise(function(t){window.TenvideoJSBridge.invoke("getNetworkType",null,function(o){var i=JSON.parse(o).result.state;"function"==typeof e&&e(n[i]),t(n[i])})})]}})})},n.prototype.run=function(e){var n=this;void 0===e&&(e=""),this.checkAppIsInstalled(function(t){t?n.openApp(e):n.download()})},n.prototype.checkAppIsInstalled=function(e){return a(this,void 0,void 0,function(){var n=this;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),[2,new Promise(function(t){window.TenvideoJSBridge.invoke("isInstalled",{pkgName:n.__data.packageName,pkgUrl:n.__data.openUrl},function(n){var o=JSON.parse(n),i=o.errCode,r=o.result.installed;if(0!==i)throw new Error("QQVideoAppDownloader.checkAppInstall get error: "+i);var a=!!r;"function"==typeof e&&e(a),t(a)})})]}})})},n.prototype.openApp=function(e){void 0===e&&(e="");var n=e||this.__data.openUrl;if(!n)throw new TypeError("QQVideoAppDownloader.openApp: openUrl is needed");window.location.href=n},n.prototype.download=function(){return a(this,void 0,void 0,function(){return s(this,function(e){switch(e.label){case 0:return[4,this.ready()];case 1:return e.sent(),window.TenvideoJSBridge.invoke("download3rdApp",{downloadUrl:this.__data.downloadUrl,packageName:this.__data.packageName,iconUrl:this.__data.downLogo,appName:this.__data.appName,itunesUrl:"http://itunes.apple.com/cn/app/id"+this.__data.appleStoreId,packageUrl:this.__data.openUrl},function(){}),[2]}})})},n.prototype.addDownloadLister=function(){var e=this;window.TenvideoJSBridge.on("onDownloadTaskStateChanged",function(n){switch(n.state){case 10:e.emit(m);break;case 11:case 12:e.emit(f);break;case 13:e.emit(h);break;case 17:e.emit(k)}}),window.TenvideoJSBridge.on("onDownloadTaskProgressChanged",function(n){var t=n.progress;e.emit(_,t)})},n}(c),x=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t}return i(n,e),n.prototype.ready=function(){var e=this;return void 0!==window.M||this.__isReady?Promise.resolve(window.M):new Promise(function(n){window.TenMusicReadyCallback=function(){e.__isReady=!0,n(window.WebViewJavascriptBridge),delete window.TenMusicReadyCallback},document.addEventListener("WebViewJavascriptBridgeReady",window.TenMusicReadyCallback,!1)})},n.prototype.run=function(e){var n=this;void 0===e&&(e=""),u.android?this.checkAppIsInstalled(function(t){t?n.openApp(e):n.download()}):this.openApp(e).catch(function(){n.download()})},n.prototype.getNetworkType=function(e){return a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),n={unknown:"none",none:"none",wifi:"wifi","2G":"wwan","3G":"wwan","4G":"wwan","5G":"wwan"},[2,new Promise(function(t){window.M.client.invoke("device","getNetworkType",{},function(o){var i=o.code,r=o.data.type;if(0!==i)throw new Error("QQMusicAppDownloader.getNetworkType error: "+i);"function"==typeof e&&e(n[r]),t(n[r])})})]}})})},n.prototype.checkAppIsInstalled=function(e){return a(this,void 0,void 0,function(){var n=this;return s(this,function(t){switch(t.label){case 0:return[4,this.ready()];case 1:return t.sent(),[2,new Promise(function(t){window.M.client.invoke("app","isInstalled",{android:[n.__data.packageName],ios:[n.__data.openUrl]},function(n){var o=n.code,i=n.data.installed;if(0!==o)throw new Error("QQMusicAppDownloader.checkAppInstall get error: "+o);var r=1===i[0];"function"==typeof e&&e(r),t(r)})})]}})})},n.prototype.openApp=function(e){return void 0===e&&(e=""),a(this,void 0,void 0,function(){var n;return s(this,function(t){switch(t.label){case 0:return n=e||this.__data.openUrl,u.android?(window.location.href=n,[3,3]):[3,1];case 1:return[4,this.ready()];case 2:return t.sent(),[2,new Promise(function(e,t){window.M.client.invoke("ui","openUrl",{url:n,target:"app",type:"default"},function(n){var o=n.code;0===o?e(o):1===o&&t(new Error("QQMusicAppDownloader.openApp error: "+o))})})];case 3:return[2]}})})},n.prototype.__downloadApp=function(e){var n=this;return new Promise(function(t){window.M.client.invoke("app","downloadApp",{appid:n.__data.appleStoreId,url:n.__data.downloadUrl,packageName:n.__data.packageName,actionCode:e,appName:n.__data.appName},function(e){var n=e.code;t(n)})})},n.prototype.download=function(){return a(this,void 0,void 0,function(){var e=this;return s(this,function(n){switch(n.label){case 0:return[4,this.ready()];case 1:return n.sent(),u.android&&this.addDownloadLister(),this.__downloadApp("0").then(function(n){0===n&&e.__downloadApp("1")}),[2]}})})},n.prototype.addDownloadLister=function(){var e=this;window.M.client.invoke("app","downloadAppState",{action:1},function(n){var t=n.code,o=n.data,i=o.state,r=o.progress;if(0!==t)throw new Error("QQMusicAppDownloader.addDownloadLister error: "+t);i&&(e.emit(h),e.emit(_,r))})},n}(c),S=function(e){function n(n){var t=e.call(this)||this;return t.__isReady=!1,t.__data={},t.__data=r({openUrl:"qqnews://article_9527",packageName:"com.tencent.news",appName:"App"},n),t.__isReady=!0,t}return i(n,e),n.prototype.run=function(e){var n=this;void 0===e&&(e=""),this.openApp(e);var t=(new Date).valueOf();setTimeout(function(){var e=(new Date).valueOf();l()&&1560>e-t&&n.download()},1500)},n.prototype.getNetworkType=function(e){return"function"==typeof e&&e("none"),Promise.resolve("none")},n.prototype.checkAppIsInstalled=function(e){return new Promise(function(n){"function"==typeof e&&e(!1),n(!1)})},n.prototype.openApp=function(e){void 0===e&&(e="");var n=e||this.__data.openUrl;if(!n)throw new TypeError("BrowserDownloader.openApp: openUrl is needed");if(u.android){var t=document.createElement("iframe");t.style.cssText="width:1px;height:1px;position:fixed;top:0;left:0;",t.src=n,document.body.appendChild(t)}else window.location.href=n},n.prototype.download=function(e){"function"==typeof e?e():u.android?window.location.href=this.__data.downloadUrl:window.location.href="http://itunes.apple.com/cn/app/id"+this.__data.appleStoreId},n}(c),I=function(){function e(e){this.__instance=null,this.__warning=function(){"undefined"!=typeof window&&-1===window.location.host.indexOf("qq.com")&&console.error("AppDownload should be used in *.qq.com")},u.weixin?(this.__instance=new b(e),this.__warning()):u.qq?(this.__instance=new A(e),this.__warning()):u.qqnews||u.qqnewslite?(this.__instance=new N(e),this.__warning()):u.tenvideo?this.__instance=new T(e):u.qqmusic?this.__instance=new x(e):this.__instance=new S(e)}return e.prototype.run=function(e){return this.__instance.run(e)},e.prototype.on=function(e,n){return this.__instance.on(e,n)},e.prototype.getNetworkType=function(e){return this.__instance.getNetworkType(e)},e.prototype.checkAppIsInstalled=function(e){return this.__instance.checkAppIsInstalled(e)},e.prototype.openApp=function(e){return this.__instance.openApp(e)},e.prototype.download=function(){return this.__instance.download()},e}();n.default=I}]).default});