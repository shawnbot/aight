if (!('createElementNS' in document)) {
  var DocumentPrototype = (typeof Document === "function")
    ? Document.prototype
    : HTMLDocument.prototype;
  DocumentPrototype.createElementNS = function(ns, name) {
    if (ns) throw "sorry, this browser does not support namespaces";
    return DocumentPrototype.createElement.call(this, name);
  };
}
