// jq.mobi.js
if(!window.jq||typeof jq!=="function"){var jq=function(g){function u(a){return a in s?s[a]:s[a]=RegExp("(^|\\s)"+a+"(\\s|$)")}function o(a){for(var c=0;c<a.length;c++)a.indexOf(a[c])!=c&&(a.splice(c,1),c--);return a}function v(a,c){var b=[];if(a==f)return b;for(;a;a=a.nextSibling)a.nodeType==1&&a!==c&&b.push(a);return b}function n(){}function w(a,c){a.os={};a.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1;a.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1;a.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?
!0:!1;a.os.iphone=!a.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?!0:!1;a.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1;a.os.touchpad=a.os.webos&&c.match(/TouchPad/)?!0:!1;a.os.ios=a.os.ipad||a.os.iphone;a.os.blackberry=c.match(/BlackBerry/)||c.match(/PlayBook/)?!0:!1;a.os.opera=c.match(/Opera Mobi/)?!0:!1;a.os.fennec=c.match(/fennec/i)?!0:!1;a.os.desktop=!(a.os.ios||a.os.android||a.os.blackberry||a.os.opera||a.os.fennec)}function A(a,c,b,e){c=x(c);if(c.ns)var d=RegExp("(?:^| )"+c.ns.replace(" ",
" .* ?")+"(?: |$)");return(p[a._jqmid||(a._jqmid=t++)]||[]).filter(function(a){return a&&(!c.e||a.e==c.e)&&(!c.ns||d.test(a.ns))&&(!b||a.fn==b||typeof a.fn==="function"&&typeof b==="function"&&""+a.fn===""+b)&&(!e||a.sel==e)})}function x(a){a=(""+a).split(".");return{e:a[0],ns:a.slice(1).sort().join(" ")}}function y(a,c,b){d.isObject(a)?d.each(a,b):a.split(/\s/).forEach(function(a){b(a,c)})}function q(a,c,b,e,f){var i=a._jqmid||(a._jqmid=t++),g=p[i]||(p[i]=[]);y(c,b,function(b,c){var i=f&&f(c,b),
j=i||c,k=function(b){var c=j.apply(a,[b].concat(b.data));c===!1&&b.preventDefault();return c},i=d.extend(x(b),{fn:c,proxy:k,sel:e,del:i,i:g.length});g.push(i);a.addEventListener(i.e,k,!1)})}function r(a,c,b,e){var d=a._jqmid||(a._jqmid=t++);y(c||"",b,function(b,c){A(a,b,c,e).forEach(function(b){delete p[d][b.i];a.removeEventListener(b.e,b.proxy,!1)})})}function B(a){var c=d.extend({originalEvent:a},a);d.each(C,function(b,e){c[b]=function(){this[e]=D;return a[b].apply(a,arguments)};c[e]=E});return c}
var f,j=g.document,l=[],F=l.slice,s=[],G=1,H=/^\s*<(\w+)[^>]*>/,k={},m=function(a,c){this.length=0;if(a)if(a instanceof m&&c==f)return a;else if(d.isFunction(a))return d(j).ready(a);else if(d.isArray(a)&&a.length!=f){for(var b=0;b<a.length;b++)this[this.length++]=a[b];return this}else if(d.isObject(a)&&d.isObject(c)){if(a.length==f)a.parentNode==c&&(this[this.length++]=a);else for(b=0;b<a.length;b++)a[b].parentNode==c&&(this[this.length++]=a[b]);return this}else if(d.isObject(a)&&c==f)return this[this.length++]=
a,this;else if(c!==f){if(c instanceof m)return c.find(a)}else c=j;else return this;if(b=this.selector(a,c))if(d.isArray(b))for(var e=0;e<b.length;e++)this[this.length++]=b[e];else this[this.length++]=b;return this},d=function(a,c){return new m(a,c)};d.map=function(a,c){var b,e=[],h;if(d.isArray(a))for(h=0;h<a.length;h++)b=c(a[h],h),b!==f&&e.push(b);else if(d.isObject(a))for(h in a)a.hasOwnProperty(h)&&(b=c(a[h],h),b!==f&&e.push(b));return d([e])};d.each=function(a,c){var b;if(d.isArray(a))for(b=0;b<
a.length;b++){if(c(b,a[b])===!1)break}else if(d.isObject(a))for(b in a)if(a.hasOwnProperty(b)&&c(b,a[b])===!1)break;return a};d.extend=function(a){a==f&&(a=this);if(arguments.length===1){for(var c in a)this[c]=a[c];return this}else F.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]});return a};d.isArray=function(a){return a instanceof Array&&a.push!=f};d.isFunction=function(a){return typeof a==="function"};d.isObject=function(a){return typeof a==="object"};d.fn=m.prototype={constructor:m,
forEach:l.forEach,reduce:l.reduce,push:l.push,indexOf:l.indexOf,concat:l.concat,selector:function(a,c){var b;if(a[0]==="#"&&a.indexOf(" ")===-1&&a.indexOf(">")===-1)return b=c==j?c.getElementById(a.replace("#","")):[].slice.call(c.querySelectorAll(a));a=a.trim();a[0]==="<"&&a[a.length-1]===">"?(b=j.createElement("div"),b.innerHTML=a.trim(),b=[].slice.call(b.childNodes)):b=[].slice.call(c.querySelectorAll(a));return b},oldElement:f,slice:l.slice,setupOld:function(a){if(a==f)return d();a.oldElement=
this;return a},map:function(a){return d.map(this,function(c,b){return a.call(c,b,c)})},each:function(a){this.forEach(function(c,b){a.call(c,b,c)});return this},ready:function(a){(j.readyState==="complete"||j.readyState==="loaded")&&a();j.addEventListener("DOMContentLoaded",a,!1);return this},find:function(a){if(this.length===0)return f;for(var c=[],b,e=0;e<this.length;e++){b=d(a,this[e]);for(var h=0;h<b.length;h++)c.push(b[h])}return d(o(c))},html:function(a){if(this.length===0)return f;if(a===f)return this[0].innerHTML;
for(var c=0;c<this.length;c++)this[c].innerHTML=a;return this},text:function(a){if(this.length===0)return f;if(a===f)return this[0].textContent;for(var c=0;c<this.length;c++)this[c].textContent=a;return this},css:function(a,c,b){b=b!=f?b:this[0];if(this.length===0)return f;if(c==f&&typeof a==="string")return g.getComputedStyle(b),b.style[a]?b.style[a]:g.getComputedStyle(b)[a];for(b=0;b<this.length;b++)if(d.isObject(a))for(var e in a)this[b].style[e]=a[e];else this[b].style[a]=c;return this},empty:function(){for(var a=
0;a<this.length;a++)this[a].innerHTML="";return this},hide:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])!="none")this[a].setAttribute("jqmOldStyle",this.css("display",null,this[a])),this[a].style.display="none";return this},show:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])=="none")this[a].style.display=this[a].getAttribute("jqmOldStyle")?this[a].getAttribute("jqmOldStyle"):
"block",this[a].removeAttribute("jqmOldStyle");return this},toggle:function(a){for(var c=a===!0?!0:!1,b=0;b<this.length;b++)g.getComputedStyle(this[b]).display!=="none"||a!==f&&c===!1?(this[b].setAttribute("jqmOldStyle",this[b].style.display),this[b].style.display="none"):(this[b].style.display=this[b].getAttribute("jqmOldStyle")!=f?this[b].getAttribute("jqmOldStyle"):"block",this[b].removeAttribute("jqmOldStyle"));return this},val:function(a){if(this.length===0)return f;if(a==f)return this[0].value;
for(var c=0;c<this.length;c++)this[c].value=a;return this},attr:function(a,c){if(this.length===0)return f;if(c===f&&!d.isObject(a))return this[0].jqmCacheId&&k[this[0].jqmCacheId][a]?this[0].jqmCacheId&&k[this[0].jqmCacheId][a]:this[0].getAttribute(a);for(var b=0;b<this.length;b++)if(d.isObject(a))for(var e in a)d(this[b]).attr(e,a[e]);else if(d.isArray(c)||d.isObject(c)||d.isFunction(c)){if(!this[b].jqmCacheId)this[b].jqmCacheId=d.uuid();k[this[b].jqmCacheId]||(k[this[b].jqmCacheId]={});k[this[b].jqmCacheId][a]=
c}else c==null&&c!==f?(this[b].removeAttribute(a),this[b].jqmCacheId&&k[this[b].jqmCacheId][a]&&delete k[this[b].jqmCacheId][a]):this[b].setAttribute(a,c);return this},removeAttr:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(e){c[b].removeAttribute(e);c[b].jqmCacheId&&k[c[b].jqmCacheId][a]&&delete k[c[b].jqmCacheId][a]});return this},remove:function(a){a=d(this).filter(a);if(a==f)return this;for(var c=0;c<a.length;c++)a[c].parentNode.removeChild(a[c]);return this},
addClass:function(a){for(var c=0;c<this.length;c++){var b=this[c].className,e=[],d=this;a.split(/\s+/g).forEach(function(a){d.hasClass(a,d[c])||e.push(a)});this[c].className+=(b?" ":"")+e.join(" ");this[c].className=this[c].className.trim()}return this},removeClass:function(a){for(var c=0;c<this.length;c++){if(a==f){this[c].className="";break}var b=this[c].className;a.split(/\s+/g).forEach(function(a){b=b.replace(u(a)," ")});this[c].className=b.length>0?b.trim():""}return this},hasClass:function(a,
c){if(this.length===0)return!1;c||(c=this[0]);return u(a).test(c.className)},append:function(a,c){if(a&&a.length!=f&&a.length===0)return this;if(d.isArray(a)||d.isObject(a))a=d(a);var b;for(b=0;b<this.length;b++)if(a.length&&typeof a!="string")for(var a=d(a),e=0;e<a.length;e++)c!=f?this[b].insertBefore(a[e],this[b].firstChild):this[b].appendChild(a[e]);else{e=H.test(a)?d(a):f;if(e==f||e.length==0)e=j.createTextNode(a);if(e.nodeName!=f&&e.nodeName.toLowerCase()=="script"&&(!e.type||e.type.toLowerCase()===
"text/javascript"))g.eval(e.innerHTML);else if(e instanceof m)for(var h=0;h<e.length;h++)c!=f?this[b].insertBefore(e[h],this[b].firstChild):this[b].appendChild(e[h]);else c!=f?this[b].insertBefore(e,this[b].firstChild):this[b].appendChild(e)}return this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,c){if(this.length==0)return this;a=d(a).get(0);if(!a||a.length==0)return this;for(var b=0;b<this.length;b++)c?a.parentNode.insertBefore(this[b],a.nextSibling):a.parentNode.insertBefore(this[b],
a);return this},insertAfter:function(a){this.insertBefore(a,!0)},get:function(a){a=a==f?0:a;a<0&&(a+=this.length);return this[a]?this[a]:f},offset:function(){if(this.length===0)return f;var a=this[0].getBoundingClientRect();return{left:a.left+g.pageXOffset,top:a.top+g.pageYOffset,width:parseInt(this[0].style.width),height:parseInt(this[0].style.height)}},parent:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&c.push(this[b].parentNode);return this.setupOld(d(o(c)).filter(a))},
children:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c=c.concat(v(this[b].firstChild));return this.setupOld(d(c).filter(a))},siblings:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&(c=c.concat(v(this[b].parentNode.firstChild,this[b])));return this.setupOld(d(c).filter(a))},closest:function(a,c){if(this.length==0)return f;var b=this[0],e=d(a,c);if(e.length==0)return d();for(;b&&e.indexOf(b)==-1;)b=b!==c&&b!==j&&b.parentNode;
return d(b)},filter:function(a){if(this.length==0)return f;if(a==f)return this;for(var c=[],b=0;b<this.length;b++){var e=this[b];e.parentNode&&d(a,e.parentNode).indexOf(e)>=0&&c.push(e)}return this.setupOld(d(o(c)))},not:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++){var e=this[b];e.parentNode&&d(a,e.parentNode).indexOf(e)==-1&&c.push(e)}return this.setupOld(d(o(c)))},data:function(a,c){return this.attr("data-"+a,c)},end:function(){return this.oldElement!=f?this.oldElement:
d()},clone:function(a){a=a===!1?!1:!0;if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c.push(this[b].cloneNode(a));return d(c)},size:function(){return this.length},serialize:function(a){if(this.length==0)return"";for(var c={},b=0;b<this.length;b++)this.slice.call(this[b].elements).forEach(function(a){var b=a.getAttribute("type");if(a.nodeName.toLowerCase()!="fieldset"&&!a.disabled&&b!="submit"&&b!="reset"&&b!="button"&&(b!="radio"&&b!="checkbox"||a.checked))c[a.getAttribute("name")]=
a.value});return d.param(c,a)}};var z={type:"GET",beforeSend:n,success:n,error:n,complete:n,context:f,timeout:0,crossDomain:!1};d.jsonP=function(a){var c="jsonp_callback"+ ++G,b="",e=j.createElement("script");g[c]=function(f){clearTimeout(b);d(e).remove();delete g[c];a.success.call(void 0,f)};e.src=a.url.replace(/=\?/,"="+c);if(a.error)e.onerror=function(){clearTimeout(b);a.error.call(void 0,"","error")};d("head").append(e);a.timeout>0&&(b=setTimeout(function(){a.error.call(void 0,"","timeout")},
a.timeout));return{}};d.ajax=function(a){var c;try{c=new g.XMLHttpRequest;var b=a||{},e;for(e in z)b[e]||(b[e]=z[e]);if(!b.url)b.url=g.location;if(!b.contentType)b.contentType="application/x-www-form-urlencoded";if(!b.headers)b.headers={};if(b.dataType)switch(b.dataType){case "script":b.dataType="text/javascript, application/javascript";break;case "json":b.dataType="application/json";break;case "xml":b.dataType="application/xml, text/xml";break;case "html":b.dataType="text/html";break;case "text":b.dataType=
"text/plain";break;default:b.dataType="text/html";break;case "jsonp":return d.jsonP(a)}else b.dataType="text/html";if(d.isObject(b.data))b.data=d.param(b.data);b.type.toLowerCase()==="get"&&b.data&&(b.url+=b.url.indexOf("?")===-1?"?"+b.data:"&"+b.data);if(/=\?/.test(b.url))return d.jsonP(b);if(!b.crossDomain)b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&RegExp.$2!=g.location.host;if(!b.crossDomain)b.headers=d.extend({"X-Requested-With":"XMLHttpRequest"},b.headers);var f,i=b.context,j=/^([\w-]+:)\/\//.test(b.url)?
RegExp.$1:g.location.protocol;c.onreadystatechange=function(){var a=b.dataType;if(c.readyState===4){clearTimeout(f);var d,e=!1;if(c.status>=200&&c.status<300||c.status===0&&j=="file:"){if(a==="application/json"&&!/^\s*$/.test(c.responseText))try{d=JSON.parse(c.responseText)}catch(g){e=g}else d=c.responseText;c.status===0&&d.length===0&&(e=!0);e?b.error.call(i,c,"parsererror",e):b.success.call(i,d,"success",c)}else e=!0,b.error.call(i,c,"error");b.complete.call(i,c,e?"error":"success")}};c.open(b.type,
b.url,!0);if(b.contentType)b.headers["Content-Type"]=b.contentType;for(var k in b.headers)c.setRequestHeader(k,b.headers[k]);if(b.beforeSend.call(i,c,b)===!1)return c.abort(),!1;b.timeout>0&&(f=setTimeout(function(){c.onreadystatechange=n;c.abort();b.error.call(i,c,"timeout")},b.timeout));c.send(b.data)}catch(l){console.log(l)}return c};d.get=function(a,c){return this.ajax({url:a,success:c})};d.post=function(a,c,b,d){typeof c==="function"&&(b=c,c={});d===f&&(d="html");return this.ajax({url:a,type:"POST",
data:c,dataType:d,success:b})};d.getJSON=function(a,c,b){typeof c==="function"&&(b=c,c={});return this.ajax({url:a,data:c,success:b,dataType:"json"})};d.param=function(a,c){var b=[];if(a instanceof m)a.each(function(){b.push((c?c+"[]":this.id)+"="+encodeURIComponent(this.value))});else for(var e in a){var f=c?c+"["+e+"]":e,g=a[e];b.push(d.isObject(g)?d.param(g,f):f+"="+encodeURIComponent(g))}return b.join("&")};d.parseJSON=function(a){return JSON.parse(a)};d.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};w(d,navigator.userAgent);d.__detectUA=w;if(typeof String.prototype.trim!=="function")String.prototype.trim=function(){this.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+|\s+$/,"");return this};d.uuid=function(){var a=function(){return((1+Math.random())*65536|0).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()};var p={},t=1,I={};d.event={add:q,remove:r};d.fn.bind=function(a,c){for(var b=0;b<this.length;b++)q(this[b],a,c);return this};d.fn.unbind=function(a,
c){for(var b=0;b<this.length;b++)r(this[b],a,c);return this};d.fn.one=function(a,c){return this.each(function(b,d){q(this,a,c,null,function(a,b){return function(){var c=a.apply(d,arguments);r(d,b,a);return c}})})};var D=function(){return!0},E=function(){return!1},C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};d.fn.delegate=function(a,c,b){for(var e=0;e<this.length;e++){var f=this[e];q(f,c,b,a,function(b){return function(c){var e,
g=d(c.target).closest(a,f).get(0);if(g)return e=d.extend(B(c),{currentTarget:g,liveFired:f}),b.apply(g,[e].concat([].slice.call(arguments,1)))}})}return this};d.fn.undelegate=function(a,c,b){for(var d=0;d<this.length;d++)r(this[d],c,b,a);return this};d.fn.on=function(a,c,b){return c===f||d.isFunction(c)?this.bind(a,c):this.delegate(c,a,b)};d.fn.off=function(a,c,b){return c===f||d.isFunction(c)?this.unbind(a,c):this.undelegate(c,a,b)};d.fn.trigger=function(a,c){typeof a=="string"&&(a=d.Event(a));a.data=
c;for(var b=0;b<this.length;b++)this[b].dispatchEvent(a);return this};d.Event=function(a,c){var b=j.createEvent(I[a]||"Events"),d=!0;if(c)for(var f in c)f=="bubbles"?d=!!c[f]:b[f]=c[f];b.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null);return b};d.proxy=function(a,c){return function(b){return a.call(c,b)}};return d}(window);"$"in window||(window.$=jq);if(!window.numOnly)window.numOnly=function(g){isNaN(parseFloat(g))&&(g=g.replace(/[^0-9.-]/,""));return parseFloat(g)}};





















// parse data



__parse = {};

if (undefined !== window.__parse_debug)
	__parse_debug = false;

if (undefined == window.__api_url)
	__api_url = 'http://api.vsea.tv/';
if (undefined == window.__api_reveal)
	__api_reveal = __api_url+'app/reveal/?u=';




;var refreshImg = function(o, t) {
	if (!o.__refresh_time)
		o.__refresh_time = 0;

	if (o.__refresh_time>t) {
		o.onerror=null;
		return;
	}

	//console.log(o,o.src);

	if (o.src.indexOf('?')>-1) {
		o.src=o.src+'&__refresh_time='+o.__refresh_time;
	} else {
		o.src=o.src+'?__refresh_time='+o.__refresh_time;
	}

	o.__refresh_time++;
};







// Get/Set Cookies
function getCookie(n){
	// Fix: '+' -> ' '(space)
	var arr = document.cookie.match(new RegExp("(^| )"+n+"=([^;]*)(;|$)"));
	if(arr != null) return decodeURIComponent(arr[2]).replace(/\+/g,' ');
	return null;
}
function setCookie(n,v,expire,path,domain,secure){
	if(!expire)expire=0;
	var exp  = new Date();
	exp.setTime(exp.getTime() + expire*24*60*60*1000);
	document.cookie = n + "="+ escape(v) +";expires="+ exp.toGMTString()
		+ ( (path) ? ";path=" + path : "") +
		+ ( (domain) ? ";domain=" + domain : "") +
		( (secure) ? ";secure" : "");
}
function delCookie(n){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(n);
	if(cval!=null) document.cookie=n +"="+cval+";expires="+exp.toGMTString();
}











(function(){
	var o = __parse;

	o.data=[];
	o.menu_data=[];
	o.category_data=[];
	o.page_data=[];
	o.select_data=[];
	o.data_not_empty = false;
	o.ca_not_empty = false;



	var htmlEncode = function (str)
	{
		var s = "";
		if (str.length == 0) return "";
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g,"&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		//s = s.replace(/\n/g, "<br>");
		return s;
	}

	var htmlDecode = function (str)
	{
		var s="";
		if(str.length ==0) return "";
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/<br>/g, "\n");
		return s;
	}



	var removeHTMLComments = function(s) {
		return s.replace(/\<\!\-\-[\s\S]*?\-\-\>/g, '');
	};


	var getUrlVal = function(u,n) {
		var reg = new RegExp("[\\?&]"+n+"=([^&]*)");
		var r = u.match(reg);
		if (r!=null)
			return decodeURIComponent(r[1]);
		return null;
	};


	var pattern_match_all = function(patt, src, cb) {
		var m=null;
		var d=[];
		while( (m=patt.exec(src))!=null ) {
			d.push(m);
			if (cb)
				cb(m);
		}

		return d;
	};


	var proccessSimplePattern = function(keys, patt, code, data) {
		var m=null;
		//if ( (m=patt.exec(code))!=null ) {
		if ( code && (m=code.toString().match(patt))!=null ) {
			for (var i = 0, len = keys.length; i < len; i++) {
				var k = keys[i];
				if (m[i] && m[i]!='' && k!='') {
					data[k] = htmlDecode(m[i]);
				}
			};
		}
	};



	var processPatterns = function(patts, src, data, deep, pm) {
		if (!deep)
			deep=0;
		for (var i = 0, len = patts.length; i < len; i++) {
			var p = patts[i];
			var pStartTime = getTime();
			pattern_match_all(p.pattern, src, function(m){
				//
				if (p.sub_patterns) {
					processPatterns(p.sub_patterns, m[0], data, deep+1, m);
				} else {
					var d={};

					if (p.keys) {
						for (var j = p.keys.length - 1; j >= 0; j--) {
							var k = p.keys[j];
							if (m[j] && m[j]!='' && k!='')
								d[k] = htmlDecode(m[j]);
						}
					}

					//ex_patterns
					if (p.ex_patterns) {
						for (var ii = 0, ll = p.ex_patterns.length; ii < ll; ii++) {
							var ex_p = p.ex_patterns[ii];
							proccessSimplePattern(ex_p.keys, ex_p.pattern, m[0], d);
						};
					}

					d.data=[];
					if (p.data_patterns) {
						processPatterns(p.data_patterns, m[0], d.data, deep+1, m);
					}

					if (p.callback) {
						p.callback(d, pm);
					}

					data.push(d);
				}
			});
			if (deep===0)
			spendTimeString += p.pattern+': '+(getTime()-pStartTime)+N;
		};
	};


	var getTime=function(){
		return new Date().getTime();
	};




















	// show data
	o.show = function(){

		var o=this;

		// set title
		if (__src_code)
		(function(){
			var p=/<title>([\w\W]*?)<\/title>/ig;
			var m;
			if ( (m=p.exec(__src_code))!=null ) {
				document.title=m[1];
			}
		})();


		var uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
		var formatSeed = function (seed, reqWidth) {
			seed = parseInt(seed, 10).toString(16); // to hex str
			if (reqWidth < seed.length) { // so long we split
				return seed.slice(seed.length - reqWidth);
			}
			if (reqWidth > seed.length) { // so short we pad
				return Array(1 + (reqWidth - seed.length)).join('0') + seed;
			}
			return seed;
		};
		var uniqid = function() {
			var s;
			s = '';
			s += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
			s += formatSeed(uniqidSeed, 5);
			return s;
		};

		var replaceAll = function(str, needle, replacement) {
			return str.split(needle).join(replacement);
		};

		var fetchTpl = function(tpl, d) {
			for (var k in d) {
				tpl=replaceAll(tpl, '{'+k+'}', d[k]);
			}
			return tpl;
		};

		var eid = function (i) {
			return document.getElementById(i);
		};




		var container=eid('container');
		var nav=eid('nav');
		var cv=eid('cv');
		var pager=[eid('pager0'),eid('pager1')];
		var selecter = eid('selecter');
		var item_limit = 50;

		var li_tpl=__tpl_li;
		var ca_tpl=__tpl_category;
		
		var splitCategoryData = function(cas, n) {
			var _cas = [];
			for (var i = 0, l = cas.length; i < l; i++) {
				var ca = cas[i];
				ca.data = formatData(ca.data);
				if (ca.data && ca.data.length>n) {
					var index = 0;
					var title = ca.category?ca.category+':':'';
					while (index<ca.data.length) {
						var _ca = {
							category: title,
							data: ca.data.slice(index, index+n)
						};
						_cas.push(_ca);
						index += n;
					}
				} else {
					_cas.push(ca);
				}
			};
			return _cas;
		};

		var formatData = function(data) {
			var _data = [];

			for (var i = 0, l = data.length; i < l; i++) {
				var d = data[i];
				if (!d.title || d.title=='' || !d.img || d.img=='')
					continue;

				d.time = d.time?'<span>'+d.time+'</span>':'';
				d.subtitle = d.subtitle? '<span class="subtitle">'+d.subtitle+'</span>' : '';
				d.view = d.view? '<span class="view">'+d.view+'</span>' : '';
				d.img = (d.img && d.img!='blank')? d.img : __api_url+'images/play_btn.png';
				d.durl = (d.url.indexOf('reveal')>-1)? d.url+'&mode=getMergeUrl' : '#';
				d.options = d.options ? d.options : '';

				_data.push(d);
			};
			return _data;
		}

		var showCategory = function() {
			o.category_data = splitCategoryData(o.category_data, item_limit);
			var data = o.category_data;

			var ca_html='';
			for (var i = 0, len = data.length; i < len; i++) {
				var ca = data[i];
				
				if (!ca.data || ca.data.length<1)
					continue;

				if (!ca.category)
					ca.category = '';

				var li_html=''
				for (var j = 0, len2 = ca.data.length; j < len2; j++) {
					var d = ca.data[j];

					
					if (ca.category=='' || ca.category.substr(ca.category.length-1,1) == ':')
					{
						if (/^[^<>]+$/i.test(d.title))
							ca.category += d.title.substr(0,10)+'...';
						else
							ca.category += d.title+'...';
					}

					li_html += fetchTpl(li_tpl, d);
				};

				if (li_html=='')
					continue;

				ca.key = i;
				ca.content = li_html;
				ca_html += fetchTpl(ca_tpl, ca);
			};
			container.innerHTML = ca_html;
		};


		var showData = function(data){

			var li_html=''
			for (var i = 0, len = data.length; i < len; i++) {
				var d = data[i];
				d.time = d.time?'<span>'+d.time+'</span>':'';
				d.subtitle = d.subtitle? '<span class="subtitle">'+d.subtitle+'</span>' : '';
				d.view = d.view? '<span class="view">'+d.view+'</span>' : '';
				d.img = (d.img && d.img!='blank')? d.img : __api_url+'images/play_btn.png';
				d.durl = (d.url.indexOf('reveal')>-1)? d.url+'&mode=getMergeUrl' : '#';
				d.options = d.options ? d.options : '';

				if (!d.title || d.title=='' || !d.img || d.img=='')
					continue;

				li_html += fetchTpl(li_tpl, d);
			};
			container.innerHTML = '<div class="videos" style="display: block;"><ul>'+li_html+'</ul></div>';
		};


		var showMenu = function(data) {
			var menu_html='';
			for (var i = 0, len = data.length; i < len; i++) {
				var menu = data[i];
				var li_html='';
				if (menu && menu.data)
				for (var ii = 0, len = menu.data.length; ii < len; ii++) {
					var d = menu.data[ii];
					if (d && d.url)
						li_html+='<a href="'+d.url+'">'+d.title+'</a>';
					else if (d.title)
						li_html+='<span>'+d.title+'</span>';
				};
				if (li_html!='')
					menu_html+='<div class="nav">'+li_html+'</div>'
			};
			if (menu_html!='')
				nav.innerHTML = menu_html;
		};


		var showPage = function(data) {
			var page_html='';
			for (var i = 0, l = data.length; i < l; i++) {

				var page = data[i];
				var li_html='';
				if (page && page.data)
				for (var ii = 0, ll = page.data.length; ii < ll; ii++) {
					var d = page.data[ii];
					if (d && d.url && d.title)
						li_html+='<a href="'+d.url+'">'+d.title+'</a>';
					else if(d.title)
						li_html+='<span>'+d.title+'</span>';
				};
				if (li_html!='')
					page_html+='<div class="page">'+li_html+'</div>';
			};

			if (page_html!='')
			{
				for (var i = 0, len = pager.length; i < len; i++) {
					var v = pager[i];
					v.innerHTML = page_html;
				};
			}
		};

		var showSelect = function(data) {
			var s='';
			for (var i = 0, l = data.length; i < l; i++) {

				var da = data[i];
				var li_html='';
				if (da && da.data)
				for (var ii = 0, ll = da.data.length; ii < ll; ii++) {
					var d = da.data[ii];
					if (d && d.url && d.title)
						li_html+='<option value="'+d.url+'">'+d.title+'</option>';
					else if(d.title)
						li_html+='<option selected="selected">'+d.title+'</option>';
				};
				var label = (da.label && da.label.length>0)?'<label>'+da.label+'</label>':'';

				if (li_html!='')
					s+=label+'<select onchange="var v=this.options[this.selectedIndex].value; if (v&&v.length>0)window.location.href=v;">'+li_html+'</select>&nbsp;';
			};

			if (s!='' && selecter)
			{
				selecter.innerHTML = s;
			}
		};


		var showCurrentData = function() {
			var cvdJSON = getUrlVal(__src_url, 'cvdJSON');
			//var cvdJSON = getCookie('cvdJSON_'+encodeURIComponent(__src_url));

			//var cvdJSON = (window.$_COOKIE && window.$_COOKIE.cvdJSON) ? window.$_COOKIE.cvdJSON : null;
			console.log('cvdJSON: ', cvdJSON);
			//alert('cvdJSON:'+cvdJSON+' COOKIE:'+window.$_COOKIE);
			if (!cvdJSON)
				return;


			var d = JSON.parse(cvdJSON);
			if (!d)
				return;

			var li_html='';

			d.time = d.time?'<span>'+d.time+'</span>':'';
			d.subtitle = d.subtitle? '<span class="subtitle">'+d.subtitle+'</span>' : '';
			d.view = d.view? '<span class="view">'+d.view+'</span>' : '';
			d.img = (d.img && d.img!='blank')? d.img : __api_url+'images/play_btn.png';
			d.url = d.url ? __api_reveal+encodeURIComponent(d.url)+'&playmode=play' : '';
			d.durl = (d.url.indexOf('reveal')>-1)? d.url+'&mode=getMergeUrl' : '#';

			if (d.iid)
				d.url += '&iid='+d.iid;

			if (!d.title || d.title=='' || !d.img || d.img=='')
				return;

			li_html = fetchTpl(li_tpl, d);

			cv.innerHTML = '<div class="videos" style="display: block;"><ul>'+li_html+'</ul></div>';
		};





		if (o.menu_data && o.menu_data.length>0)
			showMenu(o.menu_data);



		// show current video data
		showCurrentData();



		if (!o.data_not_empty && o.category_data && o.category_data.length==1 &&
			o.category_data[0].data && o.category_data[0].data.length>0)
		{
			o.data = o.category_data[0].data;
			o.data_not_empty=true;
		}


		//if (data.length>0) {
		if (o.data_not_empty) {
			if (o.data.length>item_limit) {
				o.category_data = [{
					category: '',
					data: o.data
				}]
				showCategory();
			} else {
				showData(o.data);
			}
		} else {
			showCategory();
		}
			

		if (o.page_data && o.page_data.length>0)
			showPage(o.page_data);

		if (o.select_data && o.select_data.length>0)
			showSelect(o.select_data);


		window.isMove=false;
		$(document).bind('touchmove',function(){
			isMove=true;
		});

		var initTouchCategory=function(data){

			$('.category>.title>.point')
				.bind("click", function(){
					var key=$(this).attr('key');

					var videos=$(this).parent().siblings('.videos');
					var isVisible=(videos.css('display') !== "none");

					if (!data[key].showed) {
						eid('category_ul_'+key).innerHTML = data[key].content;
						data[key].showed=true;

						//initTouchOptions($('.optionlink'));
					}

					$('.category>.videos').hide();
					if (!isVisible) {
						window.scrollTo(0, $(this).offset().top);
						//setTimeout(function(){
							videos.show();
						//}, 300);
					}
				});
		};

		var initTouchOptions=function(t){
			console.log(t);
			t.bind("click", function(){
				$(this).parent().siblings('.options').toggle();
			});
		};

		initTouchCategory(o.category_data);
		//initTouchOptions($('.optionlink'));

		$('a,select,input,button').bind('focus', function () {
			$(this).addClass('focus');
		}).bind('blur', function () {
			$(this).removeClass('focus');
		});

	};
	// show data ---- end



























	var startTime=getTime();
	var spendTimeString = '';
	var N="<br />\n";




	var removeHTMLCommentsStartTime=getTime();
	var c_src_code = removeHTMLComments(__src_code);
	spendTimeString += 'removeHTMLComments: '+(getTime()-removeHTMLCommentsStartTime)+N;


	if (window.__preParseData)
	{
		if (__preParseData() === false)
			return false;
	}


	var parseMenuStartTime = getTime();
	if (__patterns.menu && __patterns.menu.length>0) {
		processPatterns(__patterns.menu, c_src_code, o.menu_data);
	}
	spendTimeString += 'parse menu: '+(getTime()-parseMenuStartTime)+N;



	var parseSelectStartTime = getTime();
	if (__patterns.select && __patterns.select.length>0) {
		processPatterns(__patterns.select, c_src_code, o.select_data);
	}
	spendTimeString += 'parse select: '+(getTime()-parseSelectStartTime)+N;
	

	//parse category
	var parseCategoryStartTime = getTime();
	//if (0)
	if (__patterns.category && __patterns.category.length>0) {
		// category & data
		processPatterns(__patterns.category, c_src_code, o.category_data);
	}
	


	//if(0)
	for (var ij = 0, leng = o.category_data.length; ij < leng; ij++) {
		var ca = o.category_data[ij];
		if (ca.data && ca.data.length>0) {
			o.ca_not_empty=true;
			break;
		}
	};
	spendTimeString += 'parse category: '+(getTime()-parseCategoryStartTime)+N;


	// parse data
	var getDatas = function(a, r) {
		if (!r)
			r=[];
		for (var i = 0, l = a.length; i < l; i++) {
			var d = a[i];
			if (d.data && d.data.length) {
				getDatas(d.data, r);
				continue;
			}

			if (d.title && d.img && d.title!='' && d.img!='') {
				r.push(d);
			}
		};
		return r;
	}

	var parseItemStartTime = getTime();
	
	if ( !o.ca_not_empty ) {
		// only data
		processPatterns(__patterns.item, c_src_code, o.data);
		var rdata = getDatas(o.data);
		if (rdata && rdata.length)
			o.data_not_empty=true;
		o.data = rdata;
	}

	
	// for (var i = 0, len = data.length; i < len; i++) {
	// 	var d = data[i];
	// 	if (d.title && d.img && d.title!='' && d.img!='') {
	// 		data_not_empty=true;
	// 		break;
	// 	}
	// };
	spendTimeString += 'parse item: '+(getTime()-parseItemStartTime)+N;


	// parse page
	var parsePageStartTime=getTime();
	if (__patterns.page && __patterns.page.length>0) {
		processPatterns(__patterns.page, c_src_code, o.page_data);
	}
	spendTimeString+='parse page: '+(getTime()-parsePageStartTime)+N;

	spendTimeString += 'totalTime: '+(getTime()-startTime)+N;


	if (console && console.log)
	{
		console.log('data', o.data);
		console.log('category_data', o.category_data);
		console.log('menu_data', o.menu_data);
		console.log('page_data', o.page_data);
		console.log('select_data', o.select_data);
		console.log(spendTimeString);
	}


	if (window.__parseCallback)
		__parseCallback();






	setTimeout(function(){
		if (o.ca_not_empty || o.data_not_empty) {
			//__tpl_page += '<span>'+spendTimeString+'</span>';
			document.write(__tpl_page);

			//document.body.innerHTML = __tpl_page;
			o.show();
		} else {
			document.write(__src_code);
			//document.body.innerHTML = __src_code;
		}
	},100);
	


})();






