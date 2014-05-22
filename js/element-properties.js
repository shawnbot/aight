(function() {
    try {
        // inspired by Eli Grey's shim @ http://eligrey.com/blog/post/textcontent-in-ie8
        // heavily modified to better match the spec:
        // http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-textContent
        if (Object.defineProperty && Object.getOwnPropertyDescriptor &&
            Object.getOwnPropertyDescriptor(Element.prototype, "textContent") &&
            !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var nodeValue = Object.getOwnPropertyDescriptor(Text.prototype, "nodeValue");
            Object.defineProperty(Text.prototype, "textContent", {
                // It won't work if you just drop in nodeValue.get
                // and nodeValue.set or the whole descriptor.
                get: function() {
                    return nodeValue.get.call(this);
                },
                set: function(x) {
                    return nodeValue.set.call(this,x);
                }
            });
            var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                get: function() {
                    // It won't work if you just drop in innerText.get
                    // or the whole descriptor.
                    return innerText.get.call(this);
                },
                set: function(x) {
                    //return innerText.set.call(this,x); // nope! you do weird things!
                    var c;
                    while(!!(c=this.firstChild)) { this.removeChild(c); }
                    if (x!==null) {
                        c=document.createTextNode(x);
                        this.appendChild(c);
                    }
                    c=null;
                    return x;
                }
            });
        }
    } catch (e) {
        // bad Firefox
    }
})();
