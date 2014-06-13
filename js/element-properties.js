(function() {
    try {
        // inspired by Eli Grey's shim @ http://eligrey.com/blog/post/textcontent-in-ie8
        // heavily modified to better match the spec:
        // http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-textContent
        if (Object.defineProperty && Object.getOwnPropertyDescriptor &&
            Object.getOwnPropertyDescriptor(Element.prototype, "textContent") &&
            !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {

            // NOTE: Neither of these "drop-in" patterns would work:
            // Object.defineProperty(..., ..., descriptor); // nope!
            // Object.defineProperty(..., ..., { get: descriptor.get, set: descriptor.set }); // nope!
            // So must use function-wrapped descriptor.fn.call pattern.

            // "Normal" Elements
            // NOTE: textContent is different from innerText, so its use would be incorrect:
            //var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText"); // nope!
            var getTextContent = function(x) {
		var c = this.firstChild;
		var tc=[];
                // append the textContent of its children
		while(!!c) {
                    if (c.nodeType !== 8 && c.nodeType !== 7) { // skip comments
                        tc.push(c.textContent);
                    }
		    c = c.nextSibling;
		}
		// a <br> Element should show as a newline
		if (this.tagName === 'BR') { tc.push('\n'); }
		c = null;
		tc = tc.join('');
		return tc;
	    };
            var setTextContent = function(x) {
                    var c;
                    while(!!(c=this.lastChild)) {
                        this.removeChild(c);
                    }
                    if (x!==null) {
                        c=document.createTextNode(x);
                        this.appendChild(c);
                    }
                    return x;
            };
            Object.defineProperty(Element.prototype, "textContent", {
                get: function() {
                    // return innerText.get.call(this); // not good enough!
                    return getTextContent.call(this);
                },
                set: function(x) {
                    // return innerText.set.call(this, x); // not good enough!
                    return setTextContent.call(this, x);
                }
            });
	    // <script> Elements
            var scriptText = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "text");
            Object.defineProperty(HTMLScriptElement.prototype, "textContent", {
                get: function() {
                    return scriptText.get.call(this);
                },
                set: function(x) {
                    return scriptText.set.call(this, x);
                }
            });
	    // <style> Elements
            var cssText = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "cssText");
            Object.defineProperty(HTMLStyleElement.prototype, "textContent", {
                get: function() {
                    return cssText.get.call(this.styleSheet);
                },
                set: function(x) {
                    return cssText.set.call(this.styleSheet, x);
                }
            });
	    // <title> Elements
            var titleText = Object.getOwnPropertyDescriptor(HTMLTitleElement.prototype, "text");
            Object.defineProperty(HTMLTitleElement.prototype, "textContent", {
                get: function() {
                    return titleText.get.call(this);
                },
                set: function(x) {
                    return titleText.set.call(this, x);
                }
            });
            // Text nodes
            var textNodeValue = Object.getOwnPropertyDescriptor(Text.prototype, "nodeValue");
            Object.defineProperty(Text.prototype, "textContent", {
                get: function() {
                    return textNodeValue.get.call(this);
                },
                set: function(x) {
                    return textNodeValue.set.call(this, x);
                }
            });
            // Comments (and possibly other weird Node types that are treated as comments in IE)
            var elementNodeValue = Object.getOwnPropertyDescriptor(Element.prototype, "nodeValue");
            Object.defineProperty(HTMLCommentElement.prototype, "textContent", {
                get: function() {
                    return elementNodeValue.get.call(this);
                },
                set: function(x) {
                    return elementNodeValue.set.call(this, x);
                }
            });
            // Document and DocumentFragment Nodes
            // NOTE: IE8 seems to reuse HTMLDocument for both, so have to check nodeType explicitly
            var documentNodeValue = Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "nodeValue");
            Object.defineProperty(HTMLDocument.prototype, "textContent", {
                get: function() {
                    // document fragments have textContent
                    if (this.nodeType === 11) {
                        return getTextContent.call(this);
                    }
                    // a true Document's textContent is always null
                    return null; // === documentNodeValue.get.call(this);
                },
                set: function(x) {
                    if (this.nodeType === 11) {
                        return setTextContent.call(this, x);
                    }
                    // setting a Document's textContent has no side effects
                    return x; // === documentNodeValue.set.call(this, x);
                }
            });
            // other Node types are either deprecated or don't matter in HTML5/IE standards mode
        }
    } catch (e) {
        // bad Firefox
    }
})();
