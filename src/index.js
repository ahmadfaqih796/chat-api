/* eslint-disable no-console */
const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);

// const socketio = require("@feathersjs/socketio");
// const configureSocket = require("./socket");
// const io = configureSocket(server);
// app.configure(socketio(io));

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  )
);
