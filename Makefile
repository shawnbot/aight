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

all: aight.js aight.min.js aight.d3.min.js \
   css/pie/build/PIE_IE678.js

clean:
	rm -f aight.js aight.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

%.min.js: %.js
	$(JS_COMPILER) $< > $@

css/pie/build/PIE_IE678.js:
	cd css/pie && ant

css/pie.htc: css/pie/build/PIE.htc
	cp $< $@
