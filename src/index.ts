import "highlight.js/styles/github.css";

import control from "./control";
import render from "./render";

const EVENT_CONTENT_CHANGED = "content-changed";
const EVENT_PAGE_SYNC = "page-sync";

const withNote: boolean = (() => {
  const params = new URLSearchParams(location.search);
  const note = params.get("note") ?? "";
  return note !== "" && note !== "0" && note !== "false";
})();

window.onload = function () {
  const root = document.getElementById("root");

  if (root === null) return;

  root.innerHTML = render(__markdown_presentation_source__, withNote);

  if (typeof __markdown_presentation_events__ !== "undefined") {
    __markdown_presentation_events__.on(EVENT_CONTENT_CHANGED, (content) => {
      root.innerHTML = render(content, withNote);
    });
    __markdown_presentation_events__.on(EVENT_PAGE_SYNC, (n) => {
      control.syncPage(n);
    });
  }

  control.init();
};

window.onhashchange = function () {
  control.setCurrentPage();
};

export {};
