JS_FILES = \
	src/start.js \
		src/aight.js \
		src/before-ie8.js \
		lib/ie8/src/ie8.js \
		src/after-ie8.js \
		lib/dom4/src/dom4.js \
		src/css-om.js \
		src/createElementNS.js \
	src/end.js \
	lib/es5-shim/es5-shim.js \
	lib/es5-shim/es5-sham.js \
	lib/html5shiv/src/html5shiv.js

JS_COMPILER ?= uglifyjs

all: aight.js aight.min.js
# TODO aight.d3.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@

clean:
	rm -f aight.js aight.min.js
