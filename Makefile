CMD := ./bin/markdown-presentation.js
SOURCE := README.md

.PHONY: install build serve clean fmt

build:
	$(CMD) --out docs --highlight rainbow $(SOURCE)

install:
	npm install

serve:
	$(CMD) --serve $(SOURCE)

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
