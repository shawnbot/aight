if (!Element.prototype.addEventListener) {
    Element.prototype.addEventListener = function(type, fn, bubble) {
        this["e" + type + fn] = fn;
        var obj = this;
        this[type + fn] = function onevent() {
            fn.call(obj, window.event);
        };
        return this.attachEvent("on" + type, this[type + fn]);
    };

    Element.prototype.removeEventListener = function(type, fn) {
        this["e" + type + fn] = null;
        var result = this.detachEvent("on" + type, this[type + fn]);
        this[type + fn] = null;
        return result;
    };
}
