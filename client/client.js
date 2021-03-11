import io from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("connected");

  socket.on("content-changed", (content) => {
    console.log("received content-changed events");

    __markdown_presentation_events__.emit("content-changed", content);
  });

  console.log("listening content-changed events");
});
