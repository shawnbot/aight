if (!CSSStyleDeclaration.prototype.getPropertyValue) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
        return this.getAttribute(a);
    };
    CSSStyleDeclaration.prototype.setProperty = function(a, b) {
        return this.setAttribute(String(a), b);
    };
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
        return this.removeAttribute(a);
    };
}
