(function(exports) {

  aight.d3 = {
    version: aight.version
  };

  var aight_mappedProperty = function(property, format, parse) {
    var read = function(p) {
        var value = this.node().style[property];
        return parse
          ? parse.call(this, value, p)
          : value;
      },
      write = function(p, value) {
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
            this.style[property] = format
              ? format.call(this, v, p)
              : v;
          }
        });
      };
    return function() {
      return arguments.length > 1
        ? write.apply(this, arguments)
        : read.call(this);
    };
  };

  var aight_d3_style = {
    "opacity": aight_mappedProperty("filter",
      function opacity_to_filter(opacity) {
        if (isNaN(opacity)) opacity = 100;
        return ["alpha(opacity=", Math.round(opacity * 100), ")"].join("");
      }, 
      function filter_to_opacity(filter) {
        var match = (filter || "").match(/alpha\(opacity=(\d+)\)/);
        return match ? match[1] / 100 : 1;
      })
  };

  aight.d3.style = aight_d3_style;
  aight.d3.mappedProperty = aight_mappedProperty;

  if (aight.browser.ie8) {

    (function() {
      var d3_style = d3.selection.prototype.style;
      d3.selection.prototype.style = function(prop) {
        var style = aight_d3_style.hasOwnProperty(prop)
          ? aight_d3_style[prop]
          : d3_style;
        return style.apply(this, arguments);
      };
    })();

  }

})(this);
