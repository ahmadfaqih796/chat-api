const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    path: "/pesan/",
  });
  const messages = [];
  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("post", (data) => {
      messages.push(data);
      console.log("ssssssssssssss", data);
      io.emit("get", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = configureSocket;
