/*
 * IE8 shims for d3!
 */
;(function(exports) {

  aight.d3 = {};

  var aight_mappedProperty = function(property, format, parse) {
    var read = function(_property) {
          var value = this.style.getPropertyValue(property);
          return parse
            ? parse.call(this, value, _property)
            : value;
        },
        write = function(_property, value) {
          if (value === null) {
            return this.style(property, null);
          }
          return this.each(function() {
            var v = (typeof value === "function")
              ? value.apply(this, arguments)
              : value;
            if (v === null) {
              this.style.removeProperty(property);
            } else {
              this.style.setProperty(
                property,
                format
                  ? format.call(this, v, _property)
                  : v
              );
            }
          });
        };
    return function() {
      return arguments.length > 1
        ? write.apply(this, arguments)
        : read.apply(this.node(), arguments);
    };
  };

  // a map of shimmed CSS properties
  var aight_d3_style = {};

  aight.d3.style = aight_d3_style;
  aight.d3.mappedProperty = aight_mappedProperty;

  // shim d3.select().style() with mapped properties
  var d3_style = d3.selection.prototype.style;
  d3.selection.prototype.style = function(prop) {
    var style = aight_d3_style.hasOwnProperty(prop)
      ? aight_d3_style[prop]
      : d3_style;
    return style.apply(this, arguments);
  };

  var hasOpacity = function() {
    return "opacity" in document.createElement("div").style;
  };

  if (!hasOpacity()) {
    aight_d3_style.opacity = aight_mappedProperty("filter",
      function opacity_to_filter(opacity) {
        if (isNaN(opacity)) opacity = 1;
        return ["alpha(opacity=", Math.round(opacity * 100), ")"].join("");
      },
      function filter_to_opacity(filter) {
        var match = (filter || "").match(/opacity=(\d+)/);
        return match ? match[1] / 100 : 1;
      });
  }

})(this);
