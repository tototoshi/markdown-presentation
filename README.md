# markdown-presentation

- This tool generates slides for a presentation from Markdown.
- You can create slides with live preview by starting a development server with the `-serve` option.
- You can use j/k on the keyboard to move back and forth through the pages of the slide.


## Install

```console
$ npm install -g @tototoshi/markdown-presentation
```

## Usage

```console
Usage: markdown-presentation [options] <filename>
Options:
  -V, --version      output the version number
  -p, --port <port>  The port the server will listen on (default: 8080)
  -w, --write        Write files
  -s, --serve        Run dev server
  -h, --help         display help for command
```

## Example

- Start the development server on port 3000 and write the generated files to disk.

```console
$ markdown-presentation --serve -p 3000 --write your_file.md
```

- Generate slides from markdowns, and output the generated files in the dist/ directory

```console
$ markdown-presentation your_file.md
```

## Screenshot

<img width="70%" src="screenshot.png">


## LICENSE

Apache 2.0
