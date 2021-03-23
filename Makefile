CMD := ./bin/markdown-presentation.js
SOURCE := README.md

.PHONY: install build serve clean fmt

build:
	$(CMD) --out docs --theme blue $(SOURCE)

install:
	npm install

serve:
	$(CMD) --serve --theme blue $(SOURCE)

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
