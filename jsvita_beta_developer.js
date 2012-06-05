/*
 *COPYRIGHT - NOTICE
 *JSVita JavaScript Framework Copyright 2012, Dominick A.
 *http://www.vitajs.com/
 *http://www.fmquery.com/
 *Credits to LGforum @ http://www.avacweb.com/ for extra help
 *Removal of this copyright is prohibited without the author's consent. 
 *JSVita is in combined use with Peppy - A lightning fast CSS 3 Compliant selector engine.	 
 *http://www.w3.org/TR/css3-selectors/#selectors
 *version 0.1.2	
 *Author: James Donaghue - james.donaghue@gmail.com
 *Copyright (c) 2008 James Donaghue (jamesdonaghue.com)	
 *Licenced under the FreeBSD (http://www.freebsd.org/copyright/freebsd-license.html) licence.
 */ 
 (function () {
	//BEGIN - Peppy
var doc=document,isIE=/(?!.*?opera.*?)msie(?!.*?opera.*?)/i.test(navigator.userAgent),isWebKit=/webkit/i.test(navigator.userAgent),cache={},cacheOn=!isIE&&!isWebKit,persistCache={},_uid=0,reg={trim:/^\s+|\s+$/g,quickTest:/^[^:\[>+~ ,]+$/,typeSelector:/(^[^\[:]+?)(?:\[|\:|$)/,tag:/^(\w+|\*)/,id:/^(\w*|\*)#/,classRE:/^(\w*|\*)\./,attributeName:/(\w+)(?:[!+~*\^$|=])|\w+/,attributeValue:/(?:[!+~*\^$|=]=*)(.+)(?:\])/,pseudoName:/(\:[^\(]+)/,pseudoArgs:/(?:\()(.+)(?:\))/,nthParts:/([+-]?\d)*(n)([+-]\d+)*/i, combinatorTest:/[+>~ ](?![^\(]+\)|[^\[]+\])/,combinator:/\s*[>~]\s*(?![=])|\s*\+\s*(?![0-9)])|\s+/g,recursive:/:(not|has)\((\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*(\s*,\s*(\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*)*\)/gi},arrayIt=function(){return window.attachEvent&&!window.opera?function(c){if(c instanceof Array)return c;for(var d=0,e=[],f;f=c[d++];)e[e.length]=f;return e}:function(c){return Array.prototype.slice.call(c)}}(); function filter(c,d){var e=[],f={};d&&(d=RegExp("^"+d+"$","i"));for(var g=0,j;j=c[g++];)if(j.uid=j.uid||_uid++,!f[j.uid]&&(!d||-1!==j.nodeName.search(d)))e[e.length]=f[j.uid]=j;return e}function getAttribute(c,d){return!c?null:"class"===d||"className"===d?c.className:"for"===d?c.htmlFor:c.getAttribute(d)||c[d]} function getByClass(c,d,e,f,g,j,i){var h=[];if(i)return d.test(e.className)?[e]:[];if(e.getElementsByClassName)return h=arrayIt(e.getElementsByClassName(c)),f&&d.test(e.className)&&(h[h.length]=e),"*"!=j&&(h=filter(h,j)),cache[g]=h.slice(0),h;if(doc.getElementsByClassName)return h=arrayIt(doc.getElementsByClassName(c)),"*"!=j&&(h=filter(h,j)),cache[g]=h.slice(0),h;c="*"==j&&e.all?e.all:e.getElementsByTagName(j);f&&(c[c.length]=e);for(e=0;f=c[e++];)d.test(f.className)&&(h[h.length]=f);return h} function getById(c,d,e,f,g,j){var i=[];if(j)return getAttribute(d,"id")===c?[d]:[];if((j=d.getElementById?d.getElementById(c):doc.getElementById(c))&&getAttribute(j,"id")===c)return i[i.length]=j,cache[f]=i.slice(0),i;f=d.getElementsByTagName(g);e&&(f[f.length]=d);for(d=0;e=f[d++];)if(getAttribute(e,"id")===c){i[i.length]=e;break}return i} function getContextFromSequenceSelector(c,d,e,f){var g,j,i="",h=[],m=[],k,o,n;reg.id.lastIndex=reg.typeSelector.lastIndex=reg.classRE.lastIndex=0;reg.tag.test(c)||(c="*"+c);g=reg.typeSelector.exec(c)[1];d=d instanceof Array?d.slice(0):[d];n=d.length;o=n-1;reg.id.test(g)?(i="id",j=(j=g.match(/^\w+/))?j[0]:"*",g=g.replace(reg.id,"")):reg.classRE.test(g)&&(i="class",j=(j=g.match(reg.tag))?j[0]:"*",g=g.replace(reg.tag,""),contextRE=persistCache[g+"RegExp"]||(persistCache[g+"RegExp"]=RegExp("(?:^|\\s)"+ g.replace(/\./g,"\\s*")+"(?:\\s|$)")),g=g.replace(/\./g," "));for(;-1<o;){k=d[o--];k.uid=k.uid||_uid++;var p=c+k.uid;if(cacheOn&&cache[p])h=h.concat(cache[p]);else{if("id"===i)m=getById(g,k,e,p,j,f);else if("class"===i)m=getByClass(g,contextRE,k,e,p,j,f);else if(m=arrayIt(k.getElementsByTagName(g)),e&&(k.nodeName.toUpperCase()===g.toUpperCase()||"*"===g))m[m.length]=k;h=1<n?h.concat(m):m;cache[p]=h.slice(0)}}return h} peppy={query:function(c,d,e,f,g){var j=[];f||(c=c.replace(reg.trim,"").replace(/(\[)\s+/g,"$1").replace(/\s+(\])/g,"$1").replace(/(\[[^\] ]+)\s+/g,"$1").replace(/\s+([^ \[]+\])/g,"$1").replace(/(\()\s+/g,"$1").replace(/(\+)([^0-9])/g,"$1 $2").replace(/['"]/g,"").replace(/\(\s*even\s*\)/gi,"(2n)").replace(/\(\s*odd\s*\)/gi,"(2n+1)"));"string"===typeof d&&(d=0<(d=getContextFromSequenceSelector(d,doc)).length?d:void 0);d=d||doc;d.uid=d.uid||_uid++;f=c+d.uid;if(cacheOn&&cache[f])return cache[f];reg.quickTest.lastIndex= 0;if(reg.quickTest.test(c))return j=getContextFromSequenceSelector(c,d,e,g),cache[f]=j.slice(0);var i,h;i=[];i=c.split(/\s*,\s*/g);for(var c=1<i.length?[""]:i,m=0,k=0,o=0,n;1<i.length&&void 0!==(n=i[m++]);)k+=((l=n.match(/\(/g))?l.length:0)-((r=n.match(/\)/g))?r.length:0),c[o]=c[o]||"",c[o]+=""===c[o]?n:","+n,0===k&&o++;for(n=0;void 0!==(h=c[n++]);)if(reg.quickTest.lastIndex=0,reg.quickTest.test(h))p=getContextFromSequenceSelector(h,d,e,g),j=1<c.length?j.concat(p):p;else if(reg.combinatorTest.lastIndex= 0,reg.combinatorTest.test(h)){var o=k=0,p;i=h.split(reg.combinator);m=i.length;for(h=h.match(reg.combinator)||[""];k<m;){var q,s;q=h[o++].replace(reg.trim,"");p=p||peppy.query(i[k++],d,e,!0,g);s=peppy.query(i[k++],""==q||">"==q?p:d,""==q||">"==q,!0,g);p=peppy.queryCombinator(p,s,q)}j=1<c.length?j.concat(p):p;p=void 0}else p=peppy.querySelector(h,d,e,g),j=1<c.length?j.concat(p):p;1<c.length&&(j=filter(j));return cache[f]=j.slice(0)},queryCombinator:function(c,d,e){for(var f=[],g={},j={},i={},h={}, e=peppy.simpleSelector.combinator[e],m=0,k;k=c[m++];)k.uid=k.uid||_uid++,g[k.uid]=k;for(c=0;m=d[c++];)m.uid=m.uid||_uid++,!j[m.uid]&&e(m,g,h,i)&&(f[f.length]=m),j[m.uid]=m;return f},querySelector:function(c,d,e,f){var g=[],j=!0,d=getContextFromSequenceSelector(c,d,e,f),e=d.length-1,i;/:(not|has)/i.test(c)&&(i=c.match(reg.recursive),c=c.replace(reg.recursive,""));if(!(c=c.match(/:(\w|-)+(\([^\(]+\))*|\[[^\[]+\]/g)))c=[];for(i&&(c=c.concat(i));void 0!==(f=c.pop());){var h=persistCache[f],m,k;i=[];k= !1;g=[];if(h)k=h[0],m=h[1],i=h.slice(2),h=m[k];else{if(/^:/.test(f))if(m=f.match(reg.pseudoArgs),i[1]=m?m[1]:"",k=f.match(reg.pseudoName)[1],m=peppy.simpleSelector.pseudos,/nth-(?!.+only)/i.test(f)){var o,n=i[1];if(!persistCache[n]&&(o=n.match(reg.nthParts)))h=parseInt(o[1],10)||0,o=parseInt(o[3],10)||0,/^\+n|^n/i.test(n)?h=1:/^-n/i.test(n)&&(h=-1),i[2]=h,i[3]=o,persistCache[n]=[h,o]}else/^:contains/.test(f)&&(h=i[1],n=persistCache[h],i[1]=n?n:persistCache[h]=RegExp(h));else m=f.match(reg.attributeName), k=f.match(reg.attributeValue),i[1]=m[1]||m[0],i[2]=k?k[1]:"",k=""+f.match(/[~!+*\^$|=]/),m=peppy.simpleSelector.attribute;h=m[k];persistCache[f]=[k,m].concat(i)}/:(\w|-)+type/i.test(f);(k=/^:(nth[^-]|eq|gt|lt|first|last)/i.test(f))&&(i[3]=e);for(n=d.length-1;-1<n;)f=d[n--],j&&(f.peppyCount=n+1),o=!0,i[0]=f,k&&(i[2]=f.peppyCount),h.apply(m,i)||(o=!1),o&&g.push(f);d=g;j=!1}return g},simpleSelector:{attribute:{"null":function(c,d){return!!getAttribute(c,d)},"=":function(c,d,e){return getAttribute(c, d)==e},"~":function(c,d,e){return getAttribute(c,d).match(RegExp("\\b"+e+"\\b"))},"^":function(c,d,e){return 0===getAttribute(c,d).indexOf(e)},$:function(c,d,e){c=getAttribute(c,d);return c.lastIndexOf(e)===c.length-e.length},"*":function(c,d,e){return-1!=getAttribute(c,d).indexOf(e)},"|":function(c,d,e){return getAttribute(c,d).match("^"+e+"-?(("+e+"-)*("+e+"$))*")},"!":function(c,d,e){return getAttribute(c,d)!==e}},pseudos:{":root":function(c){return c===doc.getElementsByTagName("html")[0]?!0:!1}, ":nth-child":function(c,d,e,f){if(!c.nodeIndex){for(var g=c.parentNode.firstChild,j=0,i;g;g=g.nextSibling)1==g.nodeType&&(i=g,g.nodeIndex=++j);i.IsLastNode=!0;1==j&&(i.IsOnlyChild=!0)}g=c.nodeIndex;return"first"==d?1==g:"last"==d?!!c.IsLastNode:"only"==d?!!c.IsOnlyChild:!e&&!f&&g==d||(0==e?g==f:0<e?g>=f&&0==(g-f)%e:g<=f&&0==(g+f)%e)},":nth-last-child":function(c,d){return this[":nth-child"](c,d,a,b)},":nth-of-type":function(c,d,e){return this[":nth-child"](c,d,a,b,e)},":nth-last-of-type":function(c, d,e){return this[":nth-child"](c,d,a,b,e)},":first-child":function(c){return this[":nth-child"](c,"first")},":last-child":function(c){return this[":nth-child"](c,"last")},":first-of-type":function(c,d,e){return this[":nth-child"](c,"first",null,null,e)},":last-of-type":function(c,d,e){return this[":nth-child"](c,"last",null,null,e)},":only-child":function(c){return this[":nth-child"](c,"only")},":only-of-type":function(c,d,e){return this[":nth-child"](c,"only",null,null,e)},":empty":function(c){for(c= c.firstChild;null!==c;c=c.nextSibling)if(1===c.nodeType||3===c.nodeType)return!1;return!0},":not":function(c,d){return 0===peppy.query(d,c,!0,!0,!0).length},":has":function(c,d){return 0<peppy.query(d,c,!0,!0,!0).length},":selected":function(c){return c.selected},":hidden":function(c){return"hidden"===c.type||"none"===c.style.display},":visible":function(c){return"hidden"!==c.type&&"none"!==c.style.display},":input":function(c){return-1!==c.nodeName.search(/input|select|textarea|button/i)},":radio":function(c){return"radio"=== c.type},":checkbox":function(c){return"checkbox"===c.type},":text":function(c){return"text"===c.type},":header":function(c){return-1!==c.nodeName.search(/h\d/i)},":enabled":function(c){return!c.disabled&&"hidden"!==c.type},":disabled":function(c){return c.disabled},":checked":function(c){return c.checked},":contains":function(c,d){return d.test(c.textContent||c.innerText||"")},":parent":function(c){return!!c.firstChild},":odd":function(c){return this[":nth-child"](c,"2n+2",2,2)},":even":function(c){return this[":nth-child"](c, "2n+1",2,1)},":nth":function(c,d,e){return d==e},":eq":function(c,d,e){return d==e},":gt":function(c,d,e){return e>d},":lt":function(c,d,e){return e<d},":first":function(c,d,e){return 0==e},":last":function(c,d,e,f){return e==f}},combinator:{"":function(c,d,e,f){for(var g=c.uid;null!==(c=c.parentNode)&&!e[c.uid];)if(d[c.uid]||f[c.uid])return f[g]=!0;return e[g]=!1},">":function(c,d){return c.parentNode&&d[c.parentNode.uid]},"+":function(c,d,e){for(;null!==(c=c.previousSibling)&&!e[c.uid];)if(1=== c.nodeType)return c.uid in d;return!1},"~":function(c,d,e,f){for(var g=c.uid;null!==(c=c.previousSibling)&&!e[c.uid];)if(d[c.uid]||f[c.uid])return f[g]=!0;return e[g]=!1}}}}; if(doc.querySelectorAll)(function(){var c=peppy.query;peppy.query=function(d,e){e=e||doc;if(e===doc)try{return e.querySelectorAll(d)}catch(f){}return c.apply(c,arrayIt(arguments))}})();else{var aEvent=doc.addEventListener||doc.attachEvent,clearCache=function(){cache={}};aEvent("DOMAttrModified",clearCache,!1);aEvent("DOMNodeInserted",clearCache,!1);aEvent("DOMNodeRemoved",clearCache,!1)};
    //END - Peppy
var $fx = function $fx(g){if(g.nodeType&&1==g.nodeType)var b=g;else if((""+g).match(/^#([^$]+)$/i)){if(b=document.getElementById(RegExp.$1+""),!b)return null}else return null;if("undefined"!=typeof b._fx&&b._fx)return b._fx._addSet(),b;b.fxVersion=0.1;b._fx={};b._fx.sets=[];b._fx._currSet=0;if("undefined"!=typeof b._fxTerminated)try{delete b._fxTerminated}catch(m){b._fxTerminated=null}var h={"left|top|right|bottom|width|height|margin|padding|spacing|backgroundx|backgroundy":"px",font:"pt",opacity:""},i=!!navigator.userAgent.match(/MSIE/ig), j={delay:100,step:5,unit:""},k={opacity:function(a){a=parseInt(a);if(isNaN(a))return i?(a=/alpha\s*\(opacity\s*=\s*(\d+)\)/.exec(b.style.filter+""))?parseInt(a[1]):1:Math.round(100*(b.style.opacity?parseFloat(b.style.opacity):1));a=Math.min(100,Math.max(0,a));i?(b.style.zoom=1,b.style.filter="alpha(opacity="+a+");"):b.style.opacity=a/100},backgroundx:function(a,e){var a=parseInt(a),c=0,d=0,f=/^(-?\d+)[^\d\-]+(-?\d+)/.exec(b.style.backgroundPosition+"");f&&(c=parseInt(f[1]),d=parseInt(f[2]));if(isNaN(a))return c; b.style.backgroundPosition=a+e+" "+d+e},backgroundy:function(a,e){var a=parseInt(a),c=0,d=0,f=/^(-?\d+)[^\d\-]+(-?\d+)/.exec(b.style.backgroundPosition+"");f&&(c=parseInt(f[1]),d=parseInt(f[2]));if(isNaN(a))return d;b.style.backgroundPosition=c+e+" "+a+e}},l={width:function(){return parseInt(b.offsetWidth)},height:function(){return parseInt(b.offsetHeight)},left:function(){for(var a=0,e=b;e;e=e.offsetParent)a+=parseInt(e.offsetLeft);return a},top:function(){for(var a=0,e=b;e;e=e.offsetParent)a+=parseInt(e.offsetTop); return a}};b.fxAddSet=function(){this._fx._addSet();return this};b.fxHold=function(a,e){if(b._fx.sets[this._fx._currSet]._isrunning)return this;e=parseInt(e);this._fx.sets[isNaN(e)?this._fx._currSet:e]._holdTime=a;return this};b.fxAdd=function(a){var b=this._fx._currSet;if(this._fx.sets[b]._isrunning)return this;for(var c in j)a[c]||(a[c]=j[c]);if(!a.unit)for(var d in h)if(RegExp(d,"i").test(a.type)){a.unit=h[d];break}a.onstart=a.onstart&&a.onstart.call?a.onstart:function(){};a.onfinish=a.onfinish&& a.onfinish.call?a.onfinish:function(){};if(!this._fx[a.type])if(k[a.type])this._fx[a.type]=k[a.type];else{var f=this;this._fx[a.type]=function(b,e){if("undefined"==typeof b)return parseInt(f.style[a.type]);f.style[a.type]=parseInt(b)+e}}isNaN(a.from)&&(a.from=isNaN(this._fx[a.type]())?l[a.type]?l[a.type]():0:this._fx[a.type]());a._initial=a.from;this._fx[a.type](a.from,a.unit);this._fx.sets[b]._queue.push(a);return this};b.fxRun=function(a,e,c){var d=b._fx._currSet;if(this._fx.sets[d]._isrunning)return this; setTimeout(function(){if(b._fx.sets[d]._isrunning)return b;b._fx.sets[d]._isrunning=!0;if(0<b._fx.sets[d]._effectsDone)return b;b._fx.sets[d]._onfinal=a&&a.call?a:function(){};b._fx.sets[d]._onloop=c&&c.call?c:function(){};isNaN(e)||(b._fx.sets[d]._loops=e);for(var f=0;f<b._fx.sets[d]._queue.length;f++)b._fx.sets[d]._queue[f].onstart.call(b),b._fx._process(d,f)},b._fx.sets[d]._holdTime);return this};b.fxPause=function(a,b){this._fx.sets[!isNaN(b)?b:this._fx._currSet]._paused=a;return this};b.fxStop= function(a){this._fx.sets[!isNaN(a)?a:this._fx._currSet]._stoped=!0;return this};b.fxReset=function(){for(var a=0;a<this._fx.sets.length;a++)for(var b=0;b<this._fx.sets[a]._queue.length;b++){var c=this._fx.sets[a]._queue[b];if(isNaN(c._initial))this._fx[c.type]("","");else this._fx[c.type](c._initial,c.unit)}b="_fx fxHold fxAdd fxAddSet fxRun fxPause fxStop fxReset".split(" ");for(a=0;a<b.length;a++)try{delete this[b[a]]}catch(d){this[b[a]]=null}this._fxTerminated=!0};b._fx._addSet=function(){var a= this.sets.length;this._currSet=a;this.sets[a]={};this.sets[a]._loops=1;this.sets[a]._stoped=!1;this.sets[a]._queue=[];this.sets[a]._effectsDone=0;this.sets[a]._loopsDone=0;this.sets[a]._holdTime=0;this.sets[a]._paused=!1;this.sets[a]._isrunning=!1;this.sets[a]._onfinal=function(){};return this};b._fx._process=function(a,e){if(this.sets[a]&&!this.sets[a]._stoped&&!b._fxTerminated){var c=this.sets[a]._queue[e],d=this[c.type]();if(0<c.step&&d+c.step<=c.to||0>c.step&&d+c.step>=c.to){if(!this.sets[a]._paused)this[c.type](d+ c.step,c.unit);var f=this;setTimeout(function(){f._process&&f._process(a,e)},c.delay)}else if(this[c.type](c.to,c.unit),this.sets[a]._effectsDone++,c.onfinish.call(b),this.sets[a]._queue.length==this.sets[a]._effectsDone)if(this.sets[a]._effectsDone=0,this.sets[a]._loopsDone++,this.sets[a]._onloop.call(b,this.sets[a]._loopsDone),this.sets[a]._loopsDone<this.sets[a]._loops||-1==this.sets[a]._loops)for(d=0;d<this.sets[a]._queue.length;d++)this[c.type](c.from,this.sets[a]._queue[d].unit),this.sets[a]._queue[d].onstart.call(b, this.sets[a]._loopsDone),this._process(a,d);else this.sets[a]._onfinal.call(b)}};b._fx._addSet();return b};
	var vita = (function () {
	    var vita = function (selectorGroups, root, includeRoot, recursed, flat) {
	            if (vita.isit(selectorGroups) == "string") return new JSV(query(selectorGroups, root, includeRoot, recursed, flat));
	            else if (vita.isit(selectorGroups) == "function") return vita.onload(selectorGroups);
	            else if (/html/.test(vita.isit(selectorGroups))) return new JSV([selectorGroups]);
	        };
	    return vita;
	})();

	var JSV = function (elements) {
	        this.elements = this.originalelements = elements;
	        this.previousLength = elements.length;
	        this.compileElements();
	    }

	var vitajs = vita.fn = JSV.prototype;

	vitajs.compileElements = function () {
	    for (var i = 0, ol = 0, l = this.elements.length; i < l; i++) {
	        if (!this.elements[i]) continue;
	        this[ol] = this.elements[i];
	        ol++;
	    };
	    this.length = this.elements.length;
	    if (this.length < this.previousLength) {
	        for (j = this.previousLength; j >= this.length; j--) this[j] = null;
	    }
	    this.previousLength = this.length;
	};

	vitajs.generateNodes = function (node) {
	    if (document.createContextualFragment) return document.createRange().createContextualFragment(node);
	    else {
	        var wrap = document.createDocumentFragment(),
	            span = document.createElement('span'),
	            holder;
	        span.innerHTML = node;
	        while (holder = span.firstChild) wrap.appendChild(holder);
	        return wrap;
	    }
	};

	vitajs.addEvent = function (eName, func) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].addEventListener) {
	            this.elements[i].addEventListener(eName, func, false);
	        } else if (this.elements[i].attachEvent) {
	            this.elements[i].attachEvent('on' + eName, func);
	        } else {
	            this.elements[i]['on' + eName] = func();
	        }
	    }
	    return this;
	};

	vitajs.remDash = function (text) { //Copyright vita's Camel Case Replacement
	    var returnDash = function (all, letter) {
	            return (letter + "").toUpperCase();
	        };
	    var dashText = /-([a-z]|[0-9])/ig;
	    var dashPrefix = /^-ms-/;
	    return text.replace(dashPrefix, "ms-").replace(dashText, returnDash);
	};

	//Begin Defining Functions
	vitajs.get = function () {
	    return this.elements;
	};

	vitajs.html = function (html) {
	    if (html == undefined) return this.elements.innerHTML;
	    else for (i = 0; i < this.elements.length; i++) this.elements[i].innerHTML = html;
	    return this;
	};

	vitajs.val = function (value) {
	    if (value == undefined) return this.elements.value;
	    else for (i = 0; i < this.elements.length; i++) this.elements[i].value = value;
	    return this;
	};

	vitajs.text = function (text) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].textContent) {
	            if (text == undefined) return this.elements[i].textContent;
	            else this.elements[i].textContent = text;
	        } else if (this.elements[i].innerText) {
	            if (text == undefined) return this.elements[i].innerText;
	            else this.elements[i].innerText = text;
	        }
	    }
	    return this;
	};

	vitajs.showHide = function () {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].style.display == "none") this.elements[i].style.display = "";
	        else this.elements[i].style.display = "none";
	    }
	    return this;
	};

	vitajs.show = function () {
	    for (i = 0; i < this.elements.length; i++) if (this.elements[i]) this.elements[i].style.display = "";
	    return this;
	};

	vitajs.hide = function () {
	    for (i = 0; i < this.elements.length; i++) if (this.elements[i]) this.elements[i].style.display = "none";
	    return this;
	};

	vitajs.prop = function (prop, value) {
	    if (value == undefined) { //Get Attributes
	        if (/^[^!]+$/.test(prop)) return this.elements.getAttribute(prop); //Return the attribute
	        else if (/^!\w+/.test(prop)) for (i = 0; i < this.elements.length; i++) this.elements[i].removeAttribute(prop.substr(1)); //Remove from all classes, tags, names
	    } else for (i = 0; i < this.elements.length; i++) this.elements[i].setAttribute(prop, value); //Set attribute for all
	    return this;
	};

	vitajs.className = function (cname) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (cname == undefined) return this.elements[i].className;
	        else if (/^\+[^;]+$/.test(cname)) this.elements[i].className += ' ' + cname.substr(1);
	        else this.elements[i].className = cname; //Set attribute for all
	    }
	    return this;
	};

	vitajs.css = function (style, value) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (vita.isit(style) == "string" && value == undefined) {
	            var strValue = "";
	            if (document.defaultView && document.defaultView.getComputedStyle) {
	                strValue = document.defaultView.getComputedStyle(this.elements[i], "").getPropertyValue(style);
	            } else if (this.elements[i].currentStyle) {
	                try {
	                    style = style.replace(/\-(\w)/g, function (strMatch, p1) {
	                        return p1.toUpperCase();
	                    });
	                    strValue = this.elements[i].currentStyle[style];
	                } catch (e) {
	                    // Used to prevent an error in IE 5.0
	                }
	            }
	            return strValue;
	        } else if (vita.isit(style) == "object" && value == undefined) {
	            for (var property in style) {
	                if (this.elements[i].style.setProperty) this.elements[i].style.setProperty([property], style[property]);
	                else this.elements[i].style[this.remDash(property)] = style[property];
	            }
	        } else {
	            if (this.elements[i].style.setProperty) this.elements[i].style.setProperty(style, value);
	            else this.elements[i].style[this.remDash(style)] = value;
	        }
	    }
	    return this;
	};

	vitajs.after = function (node) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].insertAdjacentHTML) this.elements[i].insertAdjacentHTML('afterend', node);
	        else {
	            node = this.generateNodes(node);
	            this.elements[i].parentNode.insertBefore(node.cloneNode(true), this.elements[i].nextSibling);
	        }
	    }
	    return this;
	};

	vitajs.before = function (node) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].insertAdjacentHTML) this.elements[i].insertAdjacentHTML('beforebegin', node);
	        else {
	            node = this.generateNodes(node);
	            this.elements[i].parentNode.insertBefore(node.cloneNode(true), this.elements[i]);
	        }
	    }
	    return this;
	};

	vitajs.append = function (node) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].insertAdjacentHTML) this.elements[i].insertAdjacentHTML('beforeend', node);
	        else {
	            node = this.generateNodes(node);
	            this.elements[i].appendChild(node.cloneNode(true));
	        }
	    }
	    return this;
	};

	vitajs.prepend = function (node) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].insertAdjacentHTML) this.elements[i].insertAdjacentHTML('afterbegin', node);
	        else {
	            node = this.generateNodes(node);
	            this.elements[i].insertBefore(node.cloneNode(true), this.elements[i].firstChild);
	        }
	    }
	    return this;
	};

	vitajs.remove = function () {
	    for (i = 0; i < this.elements.length; i++) this.elements[i].parentNode.removeChild(this.elements[i]);
	    return this;
	};

	vitajs.change = function (element) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].outerHTML) this.elements[i].outerHTML = element;
	        else {
	            this.before(element);
	            this.remove();
	            this.compileElements();
	        }
	    }
	    return this;
	};

	vitajs.cover = function (openWrap, closeWrap) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].outerHTML) this.elements[i].outerHTML = openWrap + this.elements[i].outerHTML + closeWrap;
	        else {
	            var wraps = document.createElement('span');
	            wraps.appendChild(this.elements[i].cloneNode(true));
	            vita(this.elements[i]).change(openWrap + wraps.innerHTML + closeWrap);
	        }
	    }
	    return this;
	};

	vitajs.hover = function (script) {
	    this.addEvent('mouseover', script);
	    return this;
	};

	vitajs.hoverOut = function (script) {
	    this.addEvent('mouseout', script);
	    return this;
	};

	vitajs.click = function (script) {
	    this.addEvent('click', script);
	    return this;
	};

	vitajs.focus = function (script) {
	    this.addEvent('focus', script);
	    return this;
	};

	vitajs.dblclick = function (script) {
	    this.addEvent('dblclick', script);
	    return this;
	};

	vitajs.submit = function (script) {
	    this.addEvent('submit', script);
	    return this;
	};

	vitajs.determine = function (position) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (position == undefined) {
	            var topLocate = this.elements[i].offsetTop;
	            var leftLocate = this.elements[i].offsetLeft;
	            return '(Left: ' + leftLocate + ', Top: ' + topLocate + ')';
	        } else if (position == "left") return this.elements[i].offsetLeft;
	        else if (position == "top") return this.elements[i].offsetTop;
	        else if (position == "height") return this.elements[i].offsetHeight;
	        else if (position == "width") return this.elements[i].offsetWidth;
	    }
	};

	vitajs.parent = function () {
	    for (i = 0; i < this.elements.length; i++) this.elements = [this.elements[i].parentNode];
	    return this;
	};

	vitajs.next = function () {
	    for (i = 0; i < this.elements.length; i++) this.elements = [this.elements[i].nextSibling];
	    return this;
	};

	vitajs.prev = function () {
	    for (i = 0; i < this.elements.length; i++) this.elements = [this.elements[i].previousSibling];
	    return this;
	};

	vitajs.clone = function () {
	    for (i = 0; i < this.elements.length; i++) return this.elements[i].cloneNode(true);
	};

	vitajs.children = function () {
	    for (i = 0; i < this.elements.length; i++) return this.elements[i].childNodes;
	};

	vitajs.find = function (selector) {
	    for (i = 0; i < this.elements.length; i++)
	    this.elements = query(selector, this.elements[i]);
	    this.compileElements();
	    return this;
	};

	//Specifications for if this selector exists
	vitajs.has = function (getby, value) {
	    var searchString = new RegExp(getby.substr(1), "g");
	    for (i = 0; i < this.elements.length; i++) {
	        if (/^\*\w+/.test(getby)) {
	            if (searchString.test(this.elements[i].innerHTML)) return true;
	        } else if (/^@\w+/.test(getby)) {
	            if (this.elements[i].getAttribute(getby.substr(1)).indexOf(value) == 0) return true;
	        } else if (/^\.\w+/.test(getby)) {
	            if (searchString.test(this.elements[i].getAttribute('class'))) return true;
	        }
	    }
	    return false;
	    return this;
	};

	vitajs.last = function () {
	    this.elements = [this.elements[this.elements.length - 1]];
	    return this;
	};

	vitajs.first = function () {
	    this.elements = [this.elements[0]];
	    return this;
	};

	//Animations
	vitajs.animate = function (type, to, step, delay) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (vita.isit(delay) == 'number') $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: delay
	        }).fxRun();
	    }
	};

	vitajs.animateHide = function (type, to, step, delay) {
	    for (i = 0; i < this.elements.length; i++) {
	        var finished = function () {
	                this.style.display = 'none';
	            }
	        if (vita.isit(delay) == 'number') $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: delay,
	            onfinish: finished
	        }).fxRun();
	        else if (vita.isit(delay) == 'string' && delay == "slow") $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: 25,
	            onfinish: finished
	        }).fxRun();
	        else if (vita.isit(delay) == 'string' && delay == "fast") $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: 5,
	            onfinish: finished
	        }).fxRun();
	    }
	};

	vitajs.animateShow = function (type, to, step, delay, effect) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (effect == "opacity") this.elements[i].style.opacity = 0;
	        this.elements[i].style.display = '';
	        if (vita.isit(delay) == 'number') $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: delay
	        }).fxRun();
	        else if (vita.isit(delay) == 'string' && delay == "slow") $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: 25
	        }).fxRun();
	        else if (vita.isit(delay) == 'string' && delay == "fast") $fx(this.elements[i]).fxAdd({
	            type: type,
	            to: to,
	            step: step,
	            delay: 5
	        }).fxRun();
	    }
	};

	vitajs.fadeOut = function (duration) {
	    if (duration == undefined) this.animateHide('opacity', 0, -5, 20);
	    else this.animateHide('opacity', 0, -5, duration);
	    return this;
	};

	vitajs.fadeIn = function (duration) {
	    if (duration == undefined) this.animateShow('opacity', 100, 1, 5, 'opacity');
	    else this.animateShow('opacity', 100, 1, duration, 'opacity');
	    return this;
	};

	vitajs.fadeToggle = function (duration) {
	    for (i = 0; i < this.elements.length; i++) {
	        if (this.elements[i].style.display == "none") this.fadeIn(duration);
	        else this.fadeOut(duration);
	    }
	    return this;
	};

	vitajs.colorize = function (type, color, duration) {
	    if (type == "bg") this.css('background-color', color);
	    if (type == "text") this.css('color', color)
	    this.fadeIn(duration);
	    return this;
	};

	//Non-Selector Functions
	vita.script = function (src, mode) {
	    var script = document.createElement('script');
	    script.type = "text/javascript";
	    script.src = src;
	    if (mode == "true") script.setAttribute('async', 'async');
	    document.getElementsByTagName('head')[0].appendChild(script);
	};

	vita.isit = function (obj) {
	    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	vita.onload = function (script) {
	    window.alreadyrunflag = 0;
	    if (document.addEventListener) document.addEventListener('DOMContentLoaded', function () {
	        alreadyrunflag = 1;
	        script()
	    }, false);
	    else if (/Safari/i.test(navigator.userAgent)) {
	        var _timer = setInterval(function () {
	            if (/loaded|complete/.test(document.readyState)) {
	                clearInterval(_timer);
	                script();
	            }
	        }, 10);
	    } else if (document.all && !window.opera) {
	        document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
	        var contentloadtag = document.getElementById('contentloadtag');
	        contentloadtag.onreadystatechange = function () {
	            if (this.readyState == "complete") {
	                alreadyrunflag = 1;
	                script();
	            }
	        }
	    }
	    window.onload = function () {
	        setTimeout('if (!alreadyrunflag) script()', 0);
	    }
	};

	//Define how to call JSVita
	window.$jsv = window.vita = vita;
	window.query = peppy.query;
	window.$fx = $fx;
})(); //END JSVita