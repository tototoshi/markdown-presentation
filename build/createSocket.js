const socketIO = require("socket.io");
const chokidar = require("chokidar");
const readFile = require("read-file-utf8");

const SOCKET_IO_EVENT_CONTENT_CHANGED = "content-changed";
const SOCKET_IO_EVENT_PAGE_CHANGED = "page-changed";
const SOCKET_IO_EVENT_BROADCAST_PAGE_SYNC = "page-sync";

module.exports = function setUpSocket(server, filename) {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    const watcher = chokidar.watch(filename);

    const callback = () =>
      readFile(filename)
        .then((content) =>
          socket.emit(SOCKET_IO_EVENT_CONTENT_CHANGED, content)
        )
        .catch((e) => console.error(e));

    watcher.on("all", callback);

    socket.on(SOCKET_IO_EVENT_PAGE_CHANGED, (n) => {
      io.emit(SOCKET_IO_EVENT_BROADCAST_PAGE_SYNC, n);
    });

    socket.on("disconnect", () => watcher.close());
  });
};
