JS_FILES = \
	js/es5-shim/es5-shim.js \
	js/computed-style.js \
	js/css-properties.js

JS_COMPILER ?= java -jar tools/yuicompressor-2.4.2.jar

all: aight.js aight.min.js \
   css/pie/build/PIE_IE678.js

clean:
	rm -f aight.js aight.min.js

aight.js: $(JS_FILES)
	cat $(JS_FILES) > $@

aight.min.js: aight.js
	$(JS_COMPILER) $< > $@

css/pie/build/PIE_IE678.js:
	cd css/pie && ant

css/pie.htc: css/pie/build/PIE.htc
	cp $< $@
