import io from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  socket.on("content-changed", (content) => {
    __markdown_presentation_events__.emit("content-changed", content);
  });
});
