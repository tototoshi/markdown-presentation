import "./app.css";
import "highlight.js/styles/github.css";

import marked from "marked";
import control from "./control";
import parse from "./parse";

import hljs from "highlight.js";
import EventEmitter from "events";

declare var __markdown_presentation_events__: EventEmitter | undefined;
declare var __markdown_presentation_source__: string;

function renderPage(content: string) {
  const root = document.getElementById("root");
  const sections = parse(content);

  marked.setOptions({
    langPrefix: "hljs ",
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
  });

  if (root !== null) {
    root.innerHTML = sections
      .map(
        (section) =>
          `<div class="page">${marked(section)}</div><div class="new-page"/>`
      )
      .join("");
  }
}

window.onload = function () {
  renderPage(__markdown_presentation_source__);

  if (typeof __markdown_presentation_events__ !== "undefined") {
    __markdown_presentation_events__.on("content-changed", (content) => {
      renderPage(content);
    });
  }

  control.init();
};

window.onhashchange = function () {
  control.setCurrentPage();
};

export {};
