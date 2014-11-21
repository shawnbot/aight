var module = QUnit.module,
    test = QUnit.test;

module("jQuery");
(function() {

  var root = $("#test-root"),
      div = root
        .append(document.createElement("div"))
        .children("div"),
      span = div
        .append(document.createElement("span"))
        .children("span");

  test("selection.text()", function(assert) {
    span.text("foo");
    assert.strictEqual(span.text(), "foo");

    span.text("<foo>");
    assert.strictEqual(span.text(), "<foo>");

    span.text("");
    assert.strictEqual(span.text(), "");
  });

  test("selection.html()", function(assert) {
    span.html("foo");
    assert.strictEqual(span.html(), "foo");

    span.html("<i>foo</i>");
    assert.strictEqual(span.html(), "<i>foo</i>");

    span.html("");
    assert.strictEqual(span.html(), "");
  });

})();
