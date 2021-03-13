CMD := ./bin/markdown-presentation.js
SOURCE := README.md

.PHONY: install build serve clean fmt

build:
	$(CMD) --write $(SOURCE)
	rsync -av ./dist/ ./docs/

install:
	npm install

serve:
	$(CMD) --serve $(SOURCE)

clean:
	rm -rf dist/

fmt:
	npx prettier . --write
