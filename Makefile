.PHONY: install build serve clean fmt

build:
	npx webpack

install:
	npm install

serve:
	./bin/markdown-presentation.js source.md

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
