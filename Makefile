.PHONY: install build serve clean fmt

build:
	npx webpack

install:
	npm install

serve:
	npx webpack serve

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
