import io from "socket.io-client";

const SOCKET_IO_EVENT_CONTENT_CHANGED = "content-changed";
const SOCKET_IO_EVENT_PAGE_CHANGED = "page-changed";
const SOCKET_IO_EVENT_PAGE_SYNC = "page-sync";

const EVENT_CONTENT_CHANGED = "content-changed";
const EVENT_PAGE_CHANGED = "page-changed";
const EVENT_PAGE_SYNC = "page-sync";

const socket = io();

socket.on("connect", () => {
  console.log("connected");

  socket.on(SOCKET_IO_EVENT_CONTENT_CHANGED, (content) => {
    console.log("received content-changed events");

    __markdown_presentation_events__.emit(EVENT_CONTENT_CHANGED, content);
  });

  __markdown_presentation_events__.on(EVENT_PAGE_CHANGED, (n) => {
    socket.emit(SOCKET_IO_EVENT_PAGE_CHANGED, n);
  });

  socket.on(SOCKET_IO_EVENT_PAGE_SYNC, (n) => {
    __markdown_presentation_events__.emit(EVENT_PAGE_SYNC, n);
  });

  console.log("listening content-changed events");
});
