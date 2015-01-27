# <img alt="aight" src="https://raw.github.com/shawnbot/aight/master/assets/aight.png">

<img src="https://travis-ci.org/shawnbot/aight.svg" alt="travis build status">

Aight is a collection of shims and polyfills that get IE8 (and IE9) up to speed
with a bare minimum of HTML5 compatibility, providing all of the interfaces
necessary to do HTML-only[*](#svg) DOM manipulation with [D3](http://d3js.org)
and other libraries that rely on them. It includes:

* [es5-shim](https://github.com/kriskowal/es5-shim), which implements all of
  the Array prototype methods in the ES5 spec, and other goodies. Both the
  [shims](https://github.com/es-shims/es5-shim#shims) and
  [shams](https://github.com/es-shims/es5-shim#shams) are included.

* The [ie8](https://github.com/WebReflection/ie8) and
  [dom4](https://github.com/WebReflection/dom4) collections, courtesy of
  [Andrea Giammarchi](https://github.com/WebReflection). My
  [fork of ie8](https://github.com/shawnbot/ie8/tree/ie9) maintains
  compatibility with IE9, and dom4 provides Event and DOM JavaScript interface
  compatibility for *any* browser.

* A simple shim for
  [CSSStyleDeclaration](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration)'s
  `setProperty()` and `removeProperty()` methods.

* A shim for [document.createElementNS()](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-DocCrElNS),
  which throws an error if you pass it an actual namespace (which IE8 doesn't
  support). This merely provides a facade of interoperability with D3, which
  calls `document.createElementNS()` even in cases where the parent's
  namespaceURI is undefined (as is the case in HTML5, but *not* XHTML).

* [html5shiv](https://github.com/aFarkas/html5shiv/), which monkeypatches IE6-8
  to enable manipulation of HTML5 elements in the DOM and applies basic styling
  for them in IE6-9. *If you need to be able to print these elements* you will
  need to bring your own
  [html5shiv-printshiv.js](https://github.com/aFarkas/html5shiv/#html5shiv-printshivjs).

## Installation
You have some options:

1. Grab the latest from [GitHub](https://github.com/shawnbot/aight):
    ```sh
    curl -O https://raw.githubusercontent.com/shawnbot/aight/master/aight.js
    # or minified:
    curl -O https://raw.githubusercontent.com/shawnbot/aight/master/aight.min.js
    ```

1. Clone [this repository](https://github.com/shawnbot/aight) with git:
    ```sh
    git clone https://github.com/shawnbot/aight.git
    ```

1. Install with [bower](http://bower.io/):
    ```sh
    bower init # if you haven't already
    bower install aight#~2.0
    # then copy it from the bower_components directory
    cp bower_components/aight/aight*.js path/to/js
    ```

1. Install with [npm](https://www.npmjs.com/package/aight):
    ```sh
    npm install aight
    # then copy it from the node_modules directory
    cp node_modules/aight/aight*.js path/to/js
    ```

## Usage
First off, ensure that you're using the [right
DOCTYPE](http://ejohn.org/blog/html5-doctype/) in your HTML:

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
<!--[if lte IE 9]>
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
    <!--[if lte IE 9]>
    <script src="aight.min.js"></script>
    <![endif]-->
  </head>
  <body>
  </body>
</html>
```

For your convenience, this snippet is included with aight in `template.html`.

## What about SVG? <a name="svg"></a>
Shimming SVG support is tricky business. If you need to support IE8, my
suggestion is either to [degrade gracefully](https://www.google.com/search?q=graceful%20degradation)
using HTML elements or to try one of the following:

- [Raphaël](http://raphaeljs.com/), the SVG-friendly abstraction that falls
  back to VML support in IE8.
- [r2d3](https://github.com/mhemesath/r2d3/) uses Raphaël under the hood to
  provide SVG rendering support to [D3](http://d3js.org).
- [svgweb](https://code.google.com/p/svgweb/) is a Flash-based SVG renderer.
  This is **beta** software which lacks full SVG 1.1 support and will not allow
  you to style SVG with CSS.

IE9 has [great SVG support](http://blogs.msdn.com/b/ie/archive/2010/03/18/svg-in-ie9-roadmap.aspx),
though.
