if (!('createElementNS' in document)) {
  window.HTMLDocument.createElementNS = function(ns, name) {
    if (ns) throw "sorry, this browser does not support namespaces";
    return DocumentPrototype.createElement.call(this, name);
  };
}
