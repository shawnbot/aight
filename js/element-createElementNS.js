if (!document.createElementNS) {
    document.createElementNS = function(ns, name) {
        if (ns) throw "sorry, this browser does not support namespaces";
        return document.createElement(name);
    };
}
