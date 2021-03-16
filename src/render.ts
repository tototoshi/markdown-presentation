import marked from "marked";
import hljs from "highlight.js";
import parse from "./parse";

export default function render(source: string): string {
  const sections = parse(source);

  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  return sections
    .map(
      (section) =>
        `<div class="page">${marked(section)}</div><div class="new-page"/>`
    )
    .join("");
}
