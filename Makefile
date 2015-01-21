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

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

# ie8.js has an unfortunate bug in zuul, for some reason
# this is a patch that removes the offending line
src/ie8.js: lib/ie8/src/ie8.js
	cat $< | egrep -v "Object = window.Object," > $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@

clean:
	rm -f aight.js aight.min.js
