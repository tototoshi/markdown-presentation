import { marked } from "marked";
import { emojiExtension, speakerNoteExtension } from "./markedExtensions";
import hljs from "highlight.js";
import sections from "./sections";

export default function render(source: string, withNote: boolean): string {
  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  var extensions = [emojiExtension];
  if (withNote) {
    extensions = [...extensions, speakerNoteExtension];
  }

  marked.use({ extensions });

  return sections(marked(source));
}
