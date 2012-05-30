Aight is a collection of shims and polyfills that get IE8 up to speed with
a bare minimul of HTML5 compatibility, providing all of the interfaces
necessary to do HTML-only DOM manipulation with d3.js (and other libraries that
rely on those interfaces). It includes:

* [es5-shim](https://github.com/kriskowal/es5-shim), which implements all of
  the Array prototype methods in the ES5 spec, and other goodies.

* [classList.js](https://github.com/eligrey/classList.js), which implements the
  Element prototype's classList property, for intelligently adding and removing
  classes from HTML elements.

* A shim for [CSSStyleDeclaration](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration)'s
  setProperty() and removeProperty() methods

* A shim for [window.getComputedStyle()](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSview-getComputedStyle)

* A shim for the Element prototype's addEventListener() and
  removeEventListener() methods, per the [DOM2 EventTarget](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget).
