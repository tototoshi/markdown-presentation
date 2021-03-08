import "./app.css";
import "highlight.js/styles/github.css";

import source from "./source.md";
import marked from "marked";
import parse from "./parse";

import hljs from "highlight.js";

window.onload = function () {
  const root = document.getElementById("root");

  const sections = parse(source);

  marked.setOptions({
    langPrefix: "",
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

  const minPage = 0;
  const maxPage = Math.max(
    1,
    document.getElementsByClassName("page").length - 1
  );

  let currentPage = 0;

  if (location.hash.match(/#/)) {
    try {
      currentPage = parseInt(location.hash.replace("#", ""));
    } catch (e) {
      console.error(e);
    }
  }

  let windowHeight = window.innerHeight;

  const goToPage = (n: number) => {
    window.scroll({ top: n * windowHeight, behavior: "smooth" });
    location.hash = "#" + n;
    currentPage = n;
  };

  document.body.addEventListener("keydown", function (e) {
    e.stopPropagation();

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
};

export {};
