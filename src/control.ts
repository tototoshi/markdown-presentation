import mousetrap from "mousetrap";

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

function init() {
  mousetrap.bind("home", () => goToPage(getMinPage()));
  mousetrap.bind("end", () => goToPage(getMaxPage()));
  mousetrap.bind("j", () => goToPage(Math.min(getMaxPage(), currentPage + 1)));
  mousetrap.bind("k", () => goToPage(Math.max(getMinPage(), currentPage - 1)));
}

export default { init, setCurrentPage };
