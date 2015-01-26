
  var nav = navigator.appName,
      version = navigator.appVersion,
      ie = (nav == 'Microsoft Internet Explorer');
  if (ie) {
    var match = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
    version = match ? parseFloat(match[1]) : 0;
  }

  var aight = {
    version: "2.0.1",
    browser: {
      name: nav,
      ie:   ie ? version : false,
      ie9:  ie && (version >= 9 && version <= 10),
      ie8:  ie && (version >= 8 && version <= 9),
      ie7:  ie && (version >= 7 && version <= 8),
      ie6:  ie && (version >= 6 && version <= 7)
    }
  };

  // exporting to globals doesn't work from within browserify
  window.aight = aight;

  // copy keys to the exports for browserify
  Object.keys(aight).forEach(function(k) {
    exports[k] = aight[k];
  });
