import "./app.css";
import "highlight.js/styles/github.css";

import marked from "marked";
import parse from "./parse";

import hljs from "highlight.js";
import EventEmitter from "events";

declare var __markdown_presentation_events__: EventEmitter | undefined;
declare var __markdown_presentation_source__: string;

let currentPage = 0;
let windowHeight = window.innerHeight;

function getMinPage(): number {
  return 0;
}

function getMaxPage(): number {
  return Math.max(1, document.getElementsByClassName("page").length - 1);
}

function setCurrentPage() {
  if (location.hash.match(/#/)) {
    try {
      currentPage = parseInt(location.hash.replace("#", ""));
      window.scroll({ top: currentPage * windowHeight, behavior: "smooth" });
    } catch (e) {
      console.error(e);
    }
  }
}

function goToPage(n: number): void {
  window.scroll({ top: n * windowHeight, behavior: "smooth" });
  location.hash = "#" + n;
  currentPage = n;
}

function setUpControl(): void {
  document.body.addEventListener("keydown", function (e) {
    e.stopPropagation();

    const minPage = getMinPage();
    const maxPage = getMaxPage();

    if (e.key === "Home") {
      goToPage(minPage);
    } else if (e.key === "End") {
      goToPage(maxPage);
    } else if (e.key === "j") {
      goToPage(Math.min(maxPage, currentPage + 1));
    } else if (e.key === "k") {
      goToPage(Math.max(minPage, currentPage - 1));
    }
  });
}

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

  setCurrentPage();

  if (typeof __markdown_presentation_events__ !== "undefined") {
    __markdown_presentation_events__.on("content-changed", (content) => {
      renderPage(content);
    });
  }

  setUpControl();
};

window.onhashchange = function () {
  setCurrentPage();
};

export {};
