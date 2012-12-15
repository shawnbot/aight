(function() {
    try {
        // from Eli Grey @ http://eligrey.com/blog/post/textcontent-in-ie8
        if (Object.defineProperty && Object.getOwnPropertyDescriptor &&
            Object.getOwnPropertyDescriptor(Element.prototype, "textContent") &&
            !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                // It won't work if you just drop in innerText.get
                // and innerText.set or the whole descriptor.
                get: function() {
                    return innerText.get.call(this)
                },
                set: function(x) {
                    return innerText.set.call(this, x)
                }
            });
        }
    } catch (e) {
        // bad Firefox
    }
})();
