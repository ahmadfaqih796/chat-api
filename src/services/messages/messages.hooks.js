module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        const message = context.result;
        const socket = context.params.socket;
        context.app.io.emit("message-created", message);
        console.log("yyyyyyyyyyyyy", socket);
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        const message = context.result;
        context.app.io.emit("message-created", message);
        console.log("mas", context.params);
        console.log("maju", message);
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
