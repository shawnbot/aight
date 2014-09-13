/* CSS Object Model patches */
(function(CSSSDProto) {

  // patch CSSStyleDeclaration.prototype using IE8's methods
  if (typeof CSSSDProto.setAttribute !== "undefined") {
    CSSSDProto.setProperty = function(property, value) {
      return this.setAttribute(String(property), value /*, important */ );
    };
    CSSSDProto.getPropertyValue = function(property) {
      return this.getAttribute(property);
    };
    CSSSDProto.removeProperty = function(property) {
      return this.removeAttribute(property);
    };
  }

})(CSSStyleDeclaration.prototype);
