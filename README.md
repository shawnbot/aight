# <img src="https://raw.github.com/shawnbot/aight/master/assets/aight.png">

Aight is a collection of shims and polyfills that get IE8 up to speed with
a bare minimum of HTML5 compatibility, providing all of the interfaces
necessary to do HTML-only DOM manipulation with d3.js (and other libraries that
rely on those interfaces). It includes:

* [es5-shim](https://github.com/kriskowal/es5-shim), which implements all of
  the Array prototype methods in the ES5 spec, and other goodies.

* [classList.js](https://github.com/eligrey/classList.js), which implements the
  Element prototype's classList property, for intelligently adding and removing
  classes from HTML elements.

* A shim for [CSSStyleDeclaration](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration)'s
  setProperty() and removeProperty() methods

* A shim for [document.createElementNS()](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-DocCrElNS),
  which throws an error if you pass it an actual namespace (which IE8 doesn't
  support). This merely provides a facade of interoperability with d3, which
  calls createElementNS() even in cases where the parent's namespaceURI is
  undefined (as is the case in HTML5, but *not* XHTML).

* A shim for [window.getComputedStyle()](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSview-getComputedStyle)

* A shim for the Element prototype's addEventListener() and
  removeEventListener() methods, per the [DOM2 EventTarget](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget).

## Usage
Using aight is simple. First off, be sure that you're using the right `DOCTYPE`
in your HTML:

```html
<!DOCTYPE html>
```

And in your `<head>`, include the following `<meta>` tag:

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

These two steps ensure that IE8 will run in [standards
mode](http://en.wikipedia.org/wiki/Internet_Explorer_8#Standards_mode).
Finally, include `aight.min.js` (or the un-minified version, `aight.js`, if
you're debugging aight itself) in a [conditional
comment](http://www.quirksmode.org/css/condcom.html) inside the `<head>`:

```html
<!--[if lt IE 9]>
<script type="text/javascript" src="aight.min.js"></script>
<![endif]-->
```

Bringing it all together, you end up with:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--[if lt IE 9]>
    <script type="text/javascript" src="aight.min.js"></script>
    <![endif]-->
  </head>
  <body>
  </body>
</html>
```

For your convenience, this snippet is included with aight in `template.html`.
