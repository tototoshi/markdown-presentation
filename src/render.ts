import { marked } from "marked";
import { emojiExtension } from "./markedExtensions";
import hljs from "highlight.js";
import sections from "./sections";

export default function render(source: string): string {
  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  marked.use({ extensions: [emojiExtension] });

  return sections(marked(source));
}
