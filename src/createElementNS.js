if (!('createElementNS' in document)) {
  var DocumentPrototype = window.HTMLDocument.prototype;
  DocumentPrototype.createElementNS = function(ns, name) {
    if (ns) throw new Error("sorry, this browser does not support namespaces");
    return DocumentPrototype.createElement.call(this, name);
  };
}
