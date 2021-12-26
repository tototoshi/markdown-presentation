import { marked } from "marked";
import hljs from "highlight.js";
import emoji from "node-emoji";
import sections from "./sections";

export default function render(source: string): string {
  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  return sections(
    marked(source.replace(/(:.*:)/g, (match) => emoji.emojify(match)))
  );
}
