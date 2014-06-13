JS_FILES = \
	js/aight.js \
	js/classList/classList.js \
	js/es5-shim/es5-shim.js \
	js/computed-style.js \
	js/css-properties.js \
	js/element-createElementNS.js \
	js/element-events.js \
	js/element-properties.js

JS_COMPILER ?= uglifyjs

all: aight.js aight.min.js aight.d3.min.js

clean:
	rm -f aight.js aight.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@
