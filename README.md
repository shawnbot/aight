# <img alt="aight" src="https://raw.github.com/shawnbot/aight/master/assets/aight.png">

<img src="https://travis-ci.org/shawnbot/aight.svg" alt="travis build status"> [![CDNJS](https://img.shields.io/cdnjs/v/aight.svg)](https://cdnjs.com/libraries/aight)

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

* An [IE8-friendly build](#d3-ie8) of [D3](http://d3js.org).

## Installation
You have some options:

1. Download [the latest release](https://github.com/shawnbot/aight/releases)
or grab the latest from [GitHub](https://github.com/shawnbot/aight):
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
<script src="aight.min.js"></script>
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

## D3 for IE8 <a name="d3-ie8"></a>
IE8 barfs on [some parts](https://github.com/mbostock/d3/pull/2209) of
[D3](http://d3js.org)'s JavaScript. The included `d3.ie8.js` and minified
`d3.ie8.min.js` (in the `d3` directory) are IE8-friendly builds of
[d3.v3.js](http://d3js.org/d3.v3.js) with shams for some CSS properties, namely
`opacity`. You'll need to tweak your HTML to use these, e.g.:

```html
<!--[if lte IE 9]><script src="aight.js"></script><![endif]-->
<script src="http://d3js.org/d3.v3.min.js"></script>
<!--[if IE 8]><script src="d3.ie8.js"></script><![endif]-->
```

Since conditional comments are inaccessible to other browsers, we
have to download the "modern" d3.js (which will throw errors in IE8)
*and* the shimmed one (which won't). It's an imperfect solution,
obviously. You *may* serve `d3.ie8.js` to modern browsers, but there
will probably be performance implications depending on how you use
D3.

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

## aight: the command line tool
As of version 2.0.5, aight comes with a handy command-line script that rewrites
JavaScript (specifically, the stuff that shims and shams can't reach) to be
IE8-friendly. Just install aight via [npm](https://www.npmjs.com/package/aight):

```sh
npm install -g aight
# leave off the -g to install locally
```

Then run `aight` and give it a JavaScript filename (or source via stdin), and
it will print JavaScript to stdout:

```sh
aight modern.js > ie8-friendly.js
cat modern.js | aight > ie8-friendly.js
```

You can see how it works by piping in a simple `for..in` loop:

```sh
echo "var obj = {}; for (var key in obj) console.log(key, obj[key]);" | aight
```

which outputs (with whitespace, for clarity):

```js
var obj = {};
for (var key in obj) if (obj.hasOwnProperty(key)) {
  console.log(key, obj[key]);
}
```
