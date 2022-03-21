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

function goToHome(): void {
  goToPage(getMinPage());
}

function goToEnd(): void {
  goToPage(getMaxPage());
}

function goToNextPage(): void {
  goToPage(Math.min(getMaxPage(), currentPage + 1));
}

function goToPreviousPage(): void {
  goToPage(Math.max(getMinPage(), currentPage - 1));
}

function init() {
  setCurrentPage();

  mousetrap.bind("home", goToHome);
  mousetrap.bind("end", goToEnd);
  mousetrap.bind("j", goToNextPage);
  mousetrap.bind("right", goToNextPage);
  mousetrap.bind("down", goToNextPage);
  mousetrap.bind("k", goToPreviousPage);
  mousetrap.bind("left", goToPreviousPage);
  mousetrap.bind("up", goToPreviousPage);
}

export default { init, setCurrentPage };
