JS_FILES = \
	src/start.js \
		src/aight.js \
		src/before-ie8.js \
		lib/ie8/src/ie8.js \
		src/after-ie8.js \
		lib/dom4/src/dom4.js \
		src/css-om.js \
		src/createElementNS.js \
		lib/html5shiv/src/html5shiv.js \
	src/end.js \
	lib/es5-shim/es5-shim.js \
	lib/es5-shim/es5-sham.js

JS_COMPILER ?= uglifyjs

all: \
	aight.js \
	aight.min.js \
	d3/d3.ie8.js \
	d3/d3.ie8.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

d3/d3.ie8.js: d3/d3.js
	cat $^ | ./bin/aight >> $@
	cat src/d3.ie8.js >> $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@

d3/d3.js:
	curl http://d3js.org/d3.v3.js > $@

clean:
	rm -f aight.js aight.min.js
	rm -f d3/d3.ie8.js d3/d3.ie8.min.js

distclean: clean
	rm -f d3/d3.js
