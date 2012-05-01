JSVita - JavaScript Framework - Simplicity to the Fullest | Beta 1
===============================

This is a beta version of the upcoming JSVita. This framework is very simple, hence the motto: "Simplicity to the Fullest". I strive to teach others about pure JavaScript while having them decide whether they want to write it all out, or use our framework, but understand JavaScript at the same time.

This Framework/Library will only currently work with the more modern browsers (Firefox, Google Chrome, Safari, Internet Explorer 6+). I believe that in order for someone to get the full experience of developing, they should experience it in the most modern conditions.

Currently, this beta version only selects single selectors (not chainable, or multiple).

Selecting IDs (use the # symbol):
```javascript
vita('#ID').prepend('<div>TEST</div>') //Creates a new first child of the ID: ID
```

Selecting Classes (use the . symbol):
```javascript
vita('.class').prepend('<div>TEST</div>') //Creates a new first child of all classes with the class name: class
```

Selecting Tags (no symbol):
```javascript
vita('body').prepend('<div>TEST</div>') //Creates a new first child of the tag: body
```

Selecting Names (use the @ symbol):
```javascript
vita('@name').prepend('<div>TEST</div>') //Creates a new first child of elements with the name: name
```

Selecting Classes, Tags, and Names Through Node Specification
```javascript
vita('.name', 0).prepend('<div>TEST</div>') //Creates a new first child of the first element that contains the class name: class
```
-------------
#### Using JSVita Beta.  
The main global "selector function" of JSVita is "vita" (vita(selector).function()). However, if no library that uses the "$" as a selector function, then you may also use the $, much like jQuery ($(selector).function()).

#### Functions
* __.get()__ Returns the element selected for use with pure JavaScript.
* __.html(html)__ Returns the HTML of an element if there are no set paramaters: "()". This also sets the innerHTML if you input text/html in the paramaters: "('Some Text')".
* __.text(text)__ Returns the text content (only) of an element if there are no set paramaters: "()". This also sets the textContent || innerText if you input text in the paramaters: "('Some Text')".
* __.val(value)__ Returns the value of an element if there are no set paramaters: "()". This also sets the value if you input text in the paramaters: "('Some Text')".
* __.showHide()__ Either hides or shows the element. If it's visible, it will be hidden and vice-versa. This can be used in a function of a button or by itself.
* __.show()__ Makes an element visible.
* __.hide()__ Makes an element invisible.
* __.prop(attribute, value)__ Returns the specified attribute value of an element if you only put the attribute: .prop('alt') returns the value of alt. This also sets the specified attribute's value if you define the next paramater: .prop('alt','Some Text'). This also removes the attribute completely if you put an exclamation before the specified attribute: .prop('!alt') removes the "alt" attribute.
* __.addClass(class)__ Adds the specified class to an element.
* __.style(style)__ Adds whatever is defined in the style parameter to the style attribute of the specified element(s). For example: <div id="test" style="color: red;"></div>, vita('#test').style('background-color: white; font-size: 14px;') makes the div's style change to: <div id="test" style="color: red;background-color: white; font-size: 14px;"></div>. There must be a semicolon existing in the last style attribute of the exisisting element (color: red;).
* __.after(element)__ Adds whatever is defined in 'element' after the specified element(s).
* __.before(element)__ Adds whatever is defined in 'element' before the specified element(s).
* __.append(element)__ Appends whatever is defined in 'element' to a the specified element(s) as the last child.
* __.prepend(element)__ Prepends whatever is defined in 'element' to a the specified element(s) as the first child.
* __.remove()__ Removes the specified element(s) from the DOM.
* __.change(element)__ Changes the specified element(s) to whatever is defined in 'element'.
* __.cover(opening, closing)__ Wraps whatever element(s) are selected in the tags defined. For example: .cover('<div class="test">','</div>') towards <span>Test</span> will result in <div class="test"><span>Test</span></div>.
* __.locate(position)__ Gives the offsetLeft and offsetHeight of the specified element. If you leave position blank "()", you will get: (offsetLeft+px, offsetHeight+px). If you specify 'left' in the position, you will be returned the offsetLeft in pixels. If you specify 'height' in the location, you will be returned the offsetHeight of the element in pixels.
* __.mouseover(function() { })__ Executes the function whenever you hover over the specified element(s).
* __.mouseout(function() { })__ Executes the function whenever you hover out of the specified element(s).
* __.click(function() { })__ Executes the function whenever you click the specified element(s).
* __.focus(function() { })__ Executes the function whenever you focus on the specified element(s).




