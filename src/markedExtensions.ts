import { marked } from "marked";
import emoji from "node-emoji";

const emojiExtension = {
  name: "emoji",
  level: "inline",
  start(src: string): number {
    return src.match(/:/)?.index || -1;
  },
  tokenizer(src: string, token: marked.Token[]) {
    const rule = /^:(\S+):/;
    const match = rule.exec(src);
    if (match !== null) {
      return { type: "emoji", raw: match[0] };
    }
  },
  renderer(token: marked.Tokens.Generic) {
    return emoji.emojify(token.raw);
  },
};

export { emojiExtension };
