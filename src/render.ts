import marked from "marked";
import hljs from "highlight.js";
import emoji from "node-emoji";
import parse from "./parse";

export default function render(source: string): string {
  const sections = parse(
    source.replace(/(:.*:)/g, (match) => emoji.emojify(match))
  );

  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  return sections
    .map(
      (section) =>
        `<div class="page">${marked(section)}</div><div class="new-page"></div>`
    )
    .join("");
}
