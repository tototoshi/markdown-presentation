CMD := ./bin/markdown-presentation.js

.PHONY: install build serve clean fmt

build:
	$(CMD) --write source.md

install:
	npm install

serve:
	$(CMD) source.md

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
