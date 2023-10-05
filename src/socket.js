const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    // path: "/messages",
  });
  const messages = [];
  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("post", (data) => {
      messages.push(data);
      io.emit("get", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = configureSocket;
