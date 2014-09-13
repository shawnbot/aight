JS_FILES = \
	src/start.js \
	src/aight.js \
	lib/ie8/src/ie8.js \
	lib/dom4/src/dom4.js \
	lib/es5-shim/es5-shim.js \
	src/createElementNS.js \
	src/css-om.js \
	src/end.js

JS_COMPILER ?= uglifyjs

all: aight.js aight.min.js
# XXX aight.d3.min.js

clean:
	rm -f aight.js aight.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@
