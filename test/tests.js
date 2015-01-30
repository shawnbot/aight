var assert = require("assert"),
    SVG_NS = "http://www.w3.org/2000/svg";

describe("ES5", function() {

  var asc = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
      },
      desc = function(a, b) {
        return a > b ? -1 : a < b ? 1 : 0;
      };

  it("has Array#sort", function() {
    assert.ok(Array.prototype.sort, "missing Array.prototype.sort");
    var list = [1, 2, 3],
        sorted = list.sort(desc);
    assert.strictEqual(list, sorted, "sort() should return this Array");
    assert.deepEqual(list, [3, 2, 1]);
  });

  it("has Array#forEach", function() {
    // expect(13);
    assert.ok(Array.prototype.forEach, "missing Array.prototype.forEach");
    var letters = ["a", "b", "c"],
        context = {foo: "bar"};
    letters.forEach(function(letter, i, list) {
      assert.ok(typeof letter === "string");
      assert.ok(typeof i === "number");
      assert.strictEqual(list, letters);
      assert.strictEqual(this, context);
    }, context);
  });

  it("has Array#every", function() {
    assert.ok(Array.prototype.every, "missing Array.prototype.every");
    // TODO
  });

  it("has Array#some", function() {
    assert.ok(Array.prototype.some, "missing Array.prototype.some");
    // TODO
  });

  it("has Array#filter", function() {
    assert.ok(Array.prototype.filter, "missing Array.prototype.filter");
    // TODO
  });

  it("has Array#map", function() {
    // expect(4);
    var letters = ["a", "b", "c"].map(function(letter) {
      assert.ok(letter);
      return letter.toUpperCase();
    });
    assert.deepEqual(letters, ["A", "B", "C"], "not uppercased: " + JSON.stringify(letters));
  });

  it("has Array#reduce", function() {
    // expect(5);
    assert.strictEqual([3, 0, 1, 2].reduce(function(memo, n) {
      assert.ok(typeof n === "number");
      return memo + n;
    }, 0), 6);
  });

});


describe("DOM", function() {

  it("has Element#textContent", function() {
    var node = document.createElement("span");
    node.textContent = "foo";
    assert.equal(node.textContent, "foo");
    assert.equal(node.innerText, "foo");
    assert.equal(node.innerHTML, "foo");

    node.innerHTML = "<b>foo</b>";
    assert.equal(node.childNodes.length, 1, "setting innerHTML should produce a single childNode")
    assert.equal(node.firstChild.textContent, "foo", "first child's textContent should be 'foo'");
  });

  it("has Element#innerText", function() {
    var node = document.createElement("span");
    node.textContent = "bar";
    assert.equal(node.innerText, "bar");
    assert.equal(node.textContent, "bar");
    assert.equal(node.innerHTML, "bar");

    node.innerHTML = "<b>bar</b>";
    assert.equal(node.childNodes.length, 1, "setting innerHTML should produce a single childNode")
    assert.equal(node.firstChild.textContent, "bar", "first child's textContent should be 'bar'");
  });

  it("has document.createElementNS", function() {
    try {
      var node = document.createElementNS("span", undefined);
      assert.ok(node, "no node created by createElementNS");
    } catch (err) {
      // XXX PhantomJS throws exceptions here, but nobody else does
      if (typeof DOMException !== "undefined" && err.code === DOMException.INVALID_CHARACTER_ERR) {
        console.warn("your browser throws exceptions when calling createElementNS() without a namespace");
      } else {
        assert.ok(err.message.match(/does not support namespaces/), "createElementNS() throws the wrong error: " + err.message);
      }
    }
  });

});

describe("CSS", function() {

  it("style properties", function() {
    var node = document.createElement("div");
    node.setAttribute("style", "color: red");
    assert.equal(node.style.color, "red");
    node.style.color = "green";
    assert.equal(node.getAttribute("style")
      .toLowerCase()
      .replace(/;\s*$/, ""), "color: green");
  });

  it("style.getPropertyValue()", function() {
    var node = document.createElement("div");
    assert.ok(node.style.getPropertyValue, "node.style.getPropertyValue() is not a function");
    node.style.color = "red";
    assert.equal(node.style.getPropertyValue("color"), "red");
  });

  it("style.setProperty()", function() {
    var node = document.createElement("div");
    assert.ok(node.style.setProperty, "node.style.setProperty() is not a function");
    node.style.setProperty("background-color", "red");
    assert.equal(node.style.getPropertyValue("background-color"), "red");
    assert.equal(node.style.backgroundColor, "red");
    node.style.setProperty("background-color", "green");
    assert.equal(node.style.getPropertyValue("background-color"), "green");
    assert.equal(node.style.backgroundColor, "green");
  });

  it("style.removeProperty()", function() {
    var node = document.createElement("div");
    node.style.setProperty("background-color", "blue");
    var value = node.style.removeProperty("background-color");
    assert.equal(value, "blue", "return value of removeProperty() should be 'red'");
    assert.ok(!node.style.backgroundColor, "style.backgroundColor should be empty after removeProperty()");
    assert.ok(!node.style.getPropertyValue("background-color"), "'background-color' should be empty after removeProperty()");
  });

  it("has Element#classList", function() {
    var node = document.createElement("div");
    assert.ok(node.classList, "element has classList property");
    node.classList.add("foo");
    assert.ok(node.classList.contains("foo"), "classList.add() works");
    assert.equal(node.className, "foo", "className contians class added via classList.add()");
    node.className = "bar baz";
    assert.equal(node.classList.contains("foo"), false, "setting className affects classList");
    assert.equal(node.classList.contains("bar"), true);
    assert.equal(node.classList.contains("baz"), true);
    node.classList.add("foo");
    assert.equal(node.classList.contains("foo"), true, "classList.add() works after setting className");

    // SVG-specific classList shim tests, per
    // <https://github.com/WebReflection/dom4/issues/10>
    if (aight.browser.ie9) {
      var svg = document.createElementNS(SVG_NS, "svg");
      assert.ok(svg.classList, "SVG elements have a classList member");
      assert.equal(svg.classList.contains("foo"), false, "classList.contains() returns false for new SVG element");
      svg.classList.add("foo");
      assert.equal(svg.className.baseVal, "foo", "className.baseVal is set by classList.add()");
      assert.equal(svg.classList.contains("foo"), true, "classList.contains() works for SVG elements");
      svg.classList.remove("foo");
      assert.equal(svg.className.baseVal, "", "className.baseVal is empty after classList.remove()");
    }
  });

  it("window.getComputedStyle()", function() {
    assert.ok(window.getComputedStyle, "window.getComputedStyle() is not a function");

    var node = document.createElement("div");
    document.body.appendChild(node);

    var red =   ["red",   "rgb(255, 0, 0)", "#ff0000"],
        green = ["green", "rgb(0, 128, 0)", "#008a00"],
        blue =  ["blue",  "rgb(0, 0, 255)", "#0000ff"],
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

});

describe("IE", function() {
  var ie = (navigator.appName === "Microsoft Internet Explorer"),
      ie8 = ie && navigator.userAgent.match(/MSIE 8/);

  it("knows how to set aight.browser", function() {
    if (ie) {
      assert.ok(aight.browser.ie, "aight.browser.ie should be true");
      if (ie8) {
        assert.ok(aight.browser.ie8, "aight.browser.ie8 should be true");
      } else {
        assert.ok(!aight.browser.ie8, "aight.browser.ie8 should be false");
      }
    } else {
      assert.ok(!aight.browser.ie, "aight.browser.ie should not be true");
    }
  });

  if (typeof d3 === "object") {
    it("does aight.d3 right", function() {
      assert.ok(aight.d3, "aight.d3 should exist");

      if (ie8) {
        var div = d3.select(document.createElement("div"));
        div.style("opacity", .5);
        assert.ok(div.property("style").filter, "div should have a filter style");
        assert.equal(+div.style("opacity"), .5);
      } else {
        assert.ok(!aight.d3.style.opacity, "no opacity shim should exist outside of IE8");
      }
    });
  } else {
    console.warn("d3 not loaded; skipping d3 tests");
  }

});
