/*
 *COPYRIGHT - NOTICE
 *JSVita JavaScript Framework Copyright 2012, Dominick A.
 *http://www.vitajs.com/
 *http://www.fmquery.com/
 *Credits to LGforum @ http://www.avacweb.com/ for extra help
 *Removal of this copyright is prohibited without the author's consent.
 */ 
 (function () {
    var vita = (function () {
        var vita = function (selector, child) {
                //Begin Defining Selectors
                //Begin Defining Variables
                //Regex for classes, tags, names, and IDs
                var ifCLASS = /^\.\w+/;
                var ifID = /^#\w+/;
                var ifTAG = /^[^\.#@]+$/;
                var ifNAME = /^@\w+/;
                //End Defining Variables
                var ns;
                if (typeof selector === 'function' && child == undefined) return vita.onload(selector);
                else if (typeof child === 'number') {
                    if (ifCLASS.test(selector)) ns = [document.getElementsByClassName(selector.substr(1))[child]];
                    else if (ifTAG.test(selector)) ns = [document.getElementsByTagName(selector)[child]];
                    else if (ifNAME.test(selector)) ns = [document.getElementsByName(selector.substr(1))[child]];
                } else if (child == undefined) {
                    if (ifCLASS.test(selector)) ns = document.getElementsByClassName(selector.substr(1));
                    else if (ifID.test(selector)) ns = [document.getElementById(selector.substr(1))];
                    else if (ifTAG.test(selector)) ns = document.getElementsByTagName(selector);
                    else if (ifNAME.test(selector)) ns = document.getElementsByName(selector.substr(1));
                }
                return new JSV(ns);
            };
        return vita;
    })();

    //End Defining Selectors
    var JSV = function (elements) {
            this.elements = this.originalelements = elements;
            this.previousLength = elements.length;
            this.compileElements();
        }
    var vitajs = JSV.prototype;

    vitajs.compileElements = function () {
        for (var i = 0, ol = 0, l = this.elements.length; i < l; i++) {
            if (!this.elements[i]) continue; //gets rid of elements that are gone due to manipulation or things.
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
				}
                else if (this.elements[i].innerText) { 
					if (text == undefined) return this.elements[i].innerText;
					else this.elements[i].innerText = text;
				}
            }
        return this;
    };

    vitajs.showHide = function () {
            for (i = 0; i < ns.length; i++) {
                if (this.elements[i].style.display == "none") this.elements[i].style.display = "block";
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

    vitajs.style = function (style) {
        var currentStyle;
            for (i = 0; i < this.elements.length; i++) {
                currentStyle = this.elements[i].getAttribute('style');
                if (currentStyle == null || currentStyle == undefined) currentStyle = '';
                else if (/^[^;]+$/.test(currentStyle)) currentStyle = currentStyle + ';';
                this.elements[i].setAttribute('style', currentStyle + style);
            }
        return this;
    };

    vitajs.after = function (node) {
        node = this.generateNodes(node);
            for (i = 0; i < this.elements.length; i++) this.elements[i].parentNode.insertBefore(node.cloneNode(true), this.elements[i].nextSibling);
        return this;
    };

    vitajs.before = function (node) {
        node = this.generateNodes(node);
            for (i = 0; i < this.elements.length; i++) this.elements[i].parentNode.insertBefore(node.cloneNode(true), this.elements[i]);
        return this;
    };

    vitajs.append = function (node) {
        node = this.generateNodes(node);
            for (i = 0; i < this.elements.length; i++) this.elements[i].appendChild(node.cloneNode(true));
        return this;
    };

    vitajs.prepend = function (node) {
        node = this.generateNodes(node);
            for (i = 0; i < this.elements.length; i++) this.elements[i].insertBefore(node.cloneNode(true), this.elements[i].firstChild);
        return this;
    };

    vitajs.remove = function () {
            for (i = 0; i < this.elements.length; i++) this.elements[i].parentNode.removeChild(this.elements[i]);
        return this;
    };

    vitajs.change = function (element) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = element;
        return this;
    };

    vitajs.cover = function (openWrap, closeWrap) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = openWrap + this.elements[i].outerHTML + closeWrap;
        return this;
    };

    vitajs.hover = function (script) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onmouseover = script;
        return this;
    };

    vitajs.hoverOut = function (script) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onmouseout = script;
        return this;
    };

    vitajs.click = function (script) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onclick = script;
        return this;
    };

    vitajs.focus = function (script) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onfocus = script;
        return this;
    };

    vitajs.locate = function (position) {
		for (i = 0; i<this.elements.length; i++) {
        if (position == undefined) {
            var heightLocate = this.elements[i].offsetHeight + 'px';
            var leftLocate = this.elements[i].offsetLeft + 'px';
            return '(' + leftLocate + ', ' + heightLocate + ')';
        } else if (position == "left") return this.elements[i].offsetLeft + 'px';
        else if (position == "height") return this.elements[i].offsetHeight + 'px';
		}
        return this;
    };

    vitajs.parent = function () {
            for (i = 0; i < this.elements.length; i++) this.elements = this.elements[i].parentNode;
        return this;
    };

    vitajs.next = function () {
            for (i = 0; i < this.elements.length; i++) this.elements = this.elements[i].nextSibling;
        return this;
    };

    vitajs.prev = function () {
            for (i = 0; i < this.elements.length; i++) this.elements = this.elements[i].previousSibling;
        return this;
    };

    vitajs.children = function () {
        return this.elements.childNodes;
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
        this.elements = this.elements[this.elements.length - 1];
        return this;
    };

    vitajs.first = function () {
        this.elements = this.elements[0];
        return this;
    };

    //Ajax
    vitajs.load = function (url, success) {
        var rootdomain = "http://" + window.location.hostname
        var page_request = false
        if (window.XMLHttpRequest) // if Mozilla, Safari etc
        page_request = new XMLHttpRequest()
        else if (window.ActiveXObject) { // if IE
            try {
                page_request = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    page_request = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }
        } else return false
        page_request.open('GET', url, false) //get page synchronously 
        page_request.send(null)
        if (window.location.href.indexOf("http") == -1 || page_request.status == 200) {
                for (i = 0; i < this.elements.length; i++) this.elements[i].innerHTML = page_request.responseText;
                if (typeof success === "function") success();
        }
    };



    //Non-Selector Functions
    vita.script = function (src, mode) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        if (mode == "true") script.setAttribute('async', 'async');
        document.getElementsByTagName('head')[0].appendChild(script);
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
            setTimeout('if (!alreadyrunflag) script()', 0)
        }
    };

    //Define how to call JSVita
    window.vita = vita;
    if (!window.$) window.$ = vita;
})(); //END JSVita