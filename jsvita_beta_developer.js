/*
 *COPYRIGHT - NOTICE
 *JSVita JavaScript Framework Copyright 2012, Dominick A.
 *http://www.vitajs.com/
 *http://www.fmquery.com/
 *Credits to LGforum @ http://www.avacweb.com/ for extra help
 *Removal of this copyright is prohibited without the author's consent.
 */ 
 
 (function () {
    window.vita = function (selector, child) {
        //Begin Defining Selectors
        //Begin Defining Variables
        //Regex for classes, tags, names, and IDs
        var ifCLASS = /^\.\w+/;
        var ifID = /^#\w+/;
        var ifTAG = /^[^\.#@]+$/;
        var ifNAME = /^@\w+/;
        //End Defining Variables
        var ns;
        if (typeof child === 'number') {
            if (ifCLASS.test(selector)) ns = document.getElementsByClassName(selector.substr(1))[child];
            else if (ifTAG.test(selector)) ns = document.getElementsByTagName(selector)[child];
            else if (ifNAME.test(selector)) ns = document.getElementsByName(selector.substr(1))[child];
        } else if (child == undefined) {
			if (ifCLASS.test(selector)) ns = document.getElementsByClassName(selector.substr(1));
            else if (ifID.test(selector)) ns = document.getElementById(selector.substr(1));
            else if (ifTAG.test(selector)) ns = document.getElementsByTagName(selector);
            else if (ifNAME.test(selector)) ns = document.getElementsByName(selector.substr(1));
        } 
        return new JSV(ns);
    };
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
	
    //Begin Defining Functions
    vitajs.get = function () {
        return this.elements;
		return this;
    };

    vitajs.html = function (html) {
        if (html == undefined) return this.elements.innerHTML;
        else if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) {
                this.elements[i].innerHTML = html;
            }
        } else {
            this.elements.innerHTML = html;
        }
        return this;
    };
	
    vitajs.val = function (value) {
        if (value == undefined) return this.elements.value;
        else if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) {
                this.elements[i].value = value;
            }
        } else {
            this.elements.value = value;
        }
        return this;
    };

    vitajs.text = function (text) {
        if (this.elements.textContent) {
            if (text == undefined) return this.elements.textContent;
            else {
                if (this.elements.length >= 1) for (i = 0; i < this.elements.length; i++) this.elements[i].textContent = text;
                else this.elements.textContent = text;
            }
        } else if (this.elements.innerText) {
            if (this.elements.innerText) {
                if (text == undefined) return this.elements.innerText;
                else {
                    if (this.elements.length >= 1) for (i = 0; i < this.elements.length; i++) this.elements[i].innerText = text;
                    else this.elements.innerText = text;
                }
            }
        }
        return this;
    };

    vitajs.showHide = function () {
        if (this.elements.length >= 1) {
            for (i = 0; i < ns.length; i++) {
                if (this.elements[i].style.display == "none") this.elements[i].style.display = "block";
                else this.elements[i].style.display = "none";
            }
        } else {
            if (this.elements.style.display == "none") this.elements.style.display = "block";
            else this.elements.style.display = "none";
        }
        return this;
    };

    vitajs.show = function () {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) if (this.elements[i]) this.elements[i].style.display = "";
        } else {
            if (this.elements) this.elements.style.display = "";
        }
        return this;
    };

    vitajs.hide = function () {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) if (this.elements[i]) this.elements[i].style.display = "none";
        } else {
            if (this.elements) this.elements.style.display = "none";
        }
        return this;
    };

    vitajs.prop = function (prop, value) {
        if (value == undefined) { //Get Attributes
            if (/^[^!]+$/.test(prop)) return this.elements.getAttribute(prop); //Return the attribute
            else if (/^!\w+/.test(prop)) { //
                if (this.elements.length >= 1) { //Loop through them
                    for (i = 0; i < this.elements.length; i++) this.elements[i].removeAttribute(prop.substring(prop.indexOf('!') + 1)); //Remove from all classes, tags, names
                } else this.elements.removeAttribute(prop.substring(prop.indexOf('!') + 1)); //Remove from ID's, specified nodes
            }
        } else { //If value is defined
            if (this.elements.length >= 1) {
                for (i = 0; i < this.elements.length; i++) this.elements[i].setAttribute(prop, value); //Set attribute for all
            } else this.elements.setAttribute(prop, value); //Set attribute for specified nodes and IDs
        }
        return this;
    };

    vitajs.addClass = function (newclass) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].className += ' ' + newclass; //Set attribute for all
        } else this.elements.className += ' ' + newclass;
        return this;
    };

    vitajs.style = function (style) {
        var currentStyle;
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) {
                currentStyle = this.elements[i].getAttribute('style');
                if (currentStyle == null || currentStyle == undefined) currentStyle = '';
                this.elements[i].setAttribute('style', currentStyle + style);
            }
        } else {
            currentStyle = this.elements.getAttribute('style');
            if (currentStyle == null || currentStyle == undefined) currentStyle = '';
            this.elements.setAttribute('style', currentStyle + style);
        }
        return this;
    };

    vitajs.after = function (element) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = this.elements[i].outerHTML + element;
        } else this.elements.outerHTML = this.elements.outerHTML + element;
        return this;
    };

    vitajs.before = function (element) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = element + this.elements[i].outerHTML;
        } else this.elements.outerHTML = element + this.elements.outerHTML;
        return this;
    };

    vitajs.append = function (element) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].innerHTML = this.elements[i].innerHTML + element;
        } else this.elements.innerHTML = this.elements.innerHTML + element;
        return this;
    };

    vitajs.prepend = function (element) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].innerHTML = element + this.elements[i].innerHTML;
        } else this.elements.innerHTML = element + this.elements.innerHTML;
        return this;
    };

    vitajs.remove = function () {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].parentNode.removeChild(this.elements[i]);
        } else this.elements.parentNode.removeChild(this.elements);
        return this;
    };

    vitajs.change = function (element) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = element;
        } else this.elements.outerHTML = element;
        return this;
    };

    vitajs.cover = function (openWrap, closeWrap) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].outerHTML = openWrap + this.elements[i].outerHTML + closeWrap;
        } else this.elements.outerHTML = openWrap + this.elements.outerHTML + closeWrap;
        return this;
    };

    vitajs.mouseover = function (script) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onmouseover = script;
        } else this.elements.onmouseover = script;
        return this;
    };

    vitajs.mouseout = function (script) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onmouseout = script;
        } else this.elements.onmouseout = script;
        return this;
    };

    vitajs.click = function (script) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onclick = script;
        } else this.elements.onclick = script;
        return this;
    };
	
	vitajs.focus = function(script) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) this.elements[i].onfocus = script;
        } else this.elements.onfocus = script;
        return this;
    };
	
	vitajs.locate = function(position) {
		if (position == undefined) {
		var heightLocate = this.elements.offsetHeight+'px';
		var leftLocate = this.elements.offsetLeft+'px';
		return '('+leftLocate+', '+heightLocate+')';
		} else if (position == "left") return this.elements.offsetLeft+'px';
		else if (position == "height") return this.elements.offsetHeight+'px';
		return this;
	};
	//Select By
	vitajs.hasClass = function(cname) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].getAttribute('class').indexOf(cname) == 0) return this.elements[i];
			}
        }
        return this;
	};
	
	vitajs.hasText = function(text) {
        if (this.elements.length >= 1) {
            for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].innerHTML.indexOf(text) == 0) return this.elements[i];
			}
        }
        return this;
	};
	
    //Define how to call JSVita
    if (!window.$) window.$ = window.vita;
})(); //END JSVita