/* CSS Object Model patches */
(function(CSSSDProto) {

  function getAttribute(property) {
    return property.replace(/-[a-z]/g, function(bit) {
      return bit[1].toUpperCase();
    });
  }

  // patch CSSStyleDeclaration.prototype using IE8's methods
  if (typeof CSSSDProto.setAttribute !== "undefined") {
    CSSSDProto.setProperty = function(property, value) {
      return this.setAttribute(getAttribute(property), String(value) /*, important */ );
    };
    CSSSDProto.getPropertyValue = function(property) {
      return this.getAttribute(getAttribute(property)) || null;
    };
    CSSSDProto.removeProperty = function(property) {
      var value = this.getPropertyValue(property);
      this.removeAttribute(getAttribute(property));
      return value;
    };
  }

})(CSSStyleDeclaration.prototype);
