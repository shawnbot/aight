JS_FILES = js/computed-style.js \
		   js/es5-shim/es5-shim.min.js

JS_COMPILER ?= java -jar tools/yuicompressor-2.4.2.jar

all: aight.js aight.min.js

clean:
	rm -f aight.js aight.min.js

aight.js:
	cat $(JS_FILES) > $@

aight.min.js: aight.js
	$(JS_COMPILER) $< > $@
