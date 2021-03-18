import "highlight.js/styles/github.css";

import control from "./control";
import render from "./render";

window.onload = function () {
  const root = document.getElementById("root");

  if (root === null) return;

  root.innerHTML = render(__markdown_presentation_source__);

  if (typeof __markdown_presentation_events__ !== "undefined") {
    __markdown_presentation_events__.on("content-changed", (content) => {
      root.innerHTML = render(content);
    });
  }

  control.init();
};

window.onhashchange = function () {
  control.setCurrentPage();
};

export {};
