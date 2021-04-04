import { parseDOM, DomUtils } from "htmlparser2";
import render from "dom-serializer";
import { Node, Element } from "domhandler";

function isHeader(node: Node): boolean {
  if (node.type !== "tag") return false;
  const element = node as Element;
  return element.name === "h1" || element.name === "h2";
}

function createSection(nodeList: Node[]): Node[] {
  const section: Element = parseDOM('<div class="page"></div>')[0] as Element;
  section.childNodes = nodeList;
  return [section, parseDOM('<div class="new-page"></div>')[0]];
}

export default function (html: string): string {
  const nodeList = parseDOM(html);

  let sections: Node[] = [];
  let nodeListInSection: Node[] = [];

  for (let i = 0, l = nodeList.length; i < l; i++) {
    const node = nodeList[i];

    if (isHeader(node)) {
      if (nodeListInSection.length !== 0) {
        sections = [...sections, ...createSection(nodeListInSection)];
        nodeListInSection = [];
      }
    }
    nodeListInSection = [...nodeListInSection, node];
  }

  if (nodeListInSection.length !== 0) {
    sections = [...sections, ...createSection(nodeListInSection)];
    nodeListInSection = [];
  }

  return render(sections);
}
