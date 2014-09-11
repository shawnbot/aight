/*
 * aight <http://github.com/shawnbot/aight/>
 * Aight is a collection of JavaScript shims that make IE8 behave like a modern
 * browser (sans SVG).
 */
(function(exports) {

    var aight = exports.aight = (function() {
        var nav = navigator.appName,
            version = navigator.appVersion,
            ie = (nav == 'Microsoft Internet Explorer');
        if (ie) {
            var match = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
            version = match ? parseFloat(match[1]) : 0;
        }
        return {
            version: "1.2.5",
            browser: {
                name:       nav,
                version:    version,
                ie:         ie,
                ie10:       (ie && version >= 10),
                ie9:        (ie && version >= 9 && version < 10),
                ie8:        (ie && version >= 8 && version < 9),
                ie7:        (ie && version >= 7 && version < 8),
                ie6:        (ie && version >= 6 && version < 7)
            }
        };
    })();

})(this);
