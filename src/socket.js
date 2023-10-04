const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    // path: "/messages",
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
    console.log("xxxxxxxxx");

    socket.on("disconnect", () => {
      // console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = configureSocket;
