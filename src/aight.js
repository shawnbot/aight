
  aight.version = "2.0.5";

  var nav = null,
      version = 0,
      ie = false;
  if (typeof navigator === "object") {
    nav = navigator.appName;
    version = navigator.appVersion;
    ie = (nav == 'Microsoft Internet Explorer');
    if (ie) {
      var match = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
      version = match ? parseFloat(match[1]) : 0;
    }
  }

  aight.browser = {
    name: nav,
    ie:   ie ? version : false,
    ie9:  ie && (version >= 9 && version <= 10),
    ie8:  ie && (version >= 8 && version <= 9),
    ie7:  ie && (version >= 7 && version <= 8),
    ie6:  ie && (version >= 6 && version <= 7)
  };

  if (typeof window !== "object") return;

  window.aight = aight;

  function aliasInterface(ns, expectedName, nonStandardName) {
    if (ns[nonStandardName] && !ns[expectedName]) {
      ns[expectedName] = ns[nonStandardName];
      return true;
    }
    return false;
  }

  function shimPropertyAccessor(klass, property, shim) {
    if (klass && !(property in klass.prototype)) {
      return shim(klass.prototype, property);
    }
  }

  aliasInterface(window, "HTMLCommentElement", "Comment");
  aliasInterface(window, "HTMLDocument", "Document");
