if (!('createElementNS' in HTMLDocument.prototype)) {
    HTMLDocument.prototype.createElementNS = function(ns, name) {
        if (ns) throw "sorry, this browser does not support namespaces";
        return HTMLDocument.prototype.createElement.call(this, name);
    };
}
