CMD := ./bin/markdown-presentation.js
SOURCE := README.md

.PHONY: install build serve clean fmt

build:
	$(CMD) --out docs --theme dark $(SOURCE)

install:
	npm install

serve:
	$(CMD) --serve --theme dark $(SOURCE)

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
