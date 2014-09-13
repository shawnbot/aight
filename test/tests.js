var module = QUnit.module,
    test = QUnit.test;

module("ES5");
(function() {

  var asc = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
      },
      desc = function(a, b) {
        return a > b ? -1 : a < b ? 1 : 0;
      };

  test("Array.prototype.sort", function(assert) {
    var list = [1, 2, 3],
        sorted = list.sort(desc);
    assert.strictEqual(list, sorted, "sort() should return this Array");
    assert.deepEqual(list, [3, 2, 1]);
  });

  test("Array.prototype.forEach", function(assert) {
    var letters = ["a", "b", "c"],
        context = {foo: "bar"};
    expect(12);
    letters.forEach(function(letter, i, list) {
      assert.ok(typeof letter === "string");
      assert.ok(typeof i === "number");
      assert.strictEqual(list, letters);
      assert.strictEqual(this, context);
    }, context);
  });

  /*
  test("Array.prototype.every", function(assert) {
  });

  test("Array.prototype.some", function(assert) {
  });

  test("Array.prototype.filter", function(assert) {
  });
  */

  test("Array.prototype.map", function(assert) {
    expect(4);
    var letters = ["a", "b", "c"].map(function(letter) {
      assert.ok(letter);
      return letter.toUpperCase();
    });
    assert.deepEqual(letters, ["A", "B", "C"], "not uppercased: " + JSON.stringify(letters));
  });

  test("Array.prototype.reduce", function(assert) {
    expect(5);
    assert.strictEqual([3, 0, 1, 2].reduce(function(memo, n) {
      assert.ok(typeof n === "number");
      return memo + n;
    }, 0), 6);
  });

})();


module("DOM");
(function() {

  test("textContent", function(assert) {
    var node = document.createElement("span");
    node.textContent = "foo";
    assert.equal(node.textContent, "foo");
    assert.equal(node.innerText, "foo");
    assert.equal(node.innerHTML, "foo");

    node.innerHTML = "<b>foo</b>";
    assert.equal(node.firstChild.textContent, "foo");
  });

  test("innerText", function(assert) {
    var node = document.createElement("span");
    node.textContent = "bar";
    assert.equal(node.innerText, "bar");
    assert.equal(node.textContent, "bar");
    assert.equal(node.innerHTML, "bar");

    node.innerHTML = "<b>bar</b>";
    assert.equal(node.firstChild.textContent, "bar");
  });

  /*
  test("dataset", function(assert) {
    var node = document.createElement("div");
    assert.ok(node.dataset);
    node.setAttribute("data-foo", "bar");
    assert.equal(node.dataset.foo, "bar");
    node.dataset.foo = "baz";
    assert.equal(node.dataset.foo, "baz");
  });
  */

})();

module("CSS");
(function() {

  test("style properties", function(assert) {
    var node = document.createElement("div");
    node.setAttribute("style", "color: red");
    assert.equal(node.style.color, "red");
    node.style.color = "green";
    assert.equal(node.getAttribute("style")
      .toLowerCase()
      .replace(/;$/, ""), "color: green");
  });

  test("style.getPropertyValue()", function(assert) {
    var node = document.createElement("div");
    assert.ok(node.style.getPropertyValue, "node.style.getPropertyValue() is not a function");
    node.style.color = "red";
    assert.equal(node.style.getPropertyValue("color"), "red");
  });

  test("style.setProperty()", function(assert) {
    var node = document.createElement("div");
    assert.ok(node.style.setProperty, "node.style.setProperty() is not a function");
    node.style.setProperty("background-color", "red");
    assert.equal(node.style.getPropertyValue("background-color"), "red");
  });

  test("window.getComputedStyle()", function(assert) {
    assert.ok(window.getComputedStyle, "window.getComputedStyle() is not a function");

    var node = document.createElement("div");
    document.body.appendChild(node);

    var red =   ["red",   "rgb(255, 0, 0)", "#FF0000"],
        green = ["green", "rgb(0, 128, 0)", "#008A00"],
        blue =  ["blue",  "rgb(0, 0, 255)", "#0000FF"],
        getColor = function() {
          return window.getComputedStyle(node, null)
            .getPropertyValue("color")
            .toLowerCase();
        };
    node.style.setProperty("color", "green");
    assert.notEqual(green.indexOf(getColor()), -1);
    node.style.setProperty("color", "red");
    assert.notEqual(red.indexOf(getColor()), -1);
    node.setAttribute("style", "color: blue");
    assert.notEqual(blue.indexOf(getColor()), -1);

    document.body.removeChild(node);
  });

})();
