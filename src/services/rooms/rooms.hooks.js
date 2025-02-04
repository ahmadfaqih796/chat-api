const handleAfterCreate = () => {
  return async (context) => {
    const { app, result } = context;

    app.service("rooms").on("created", (data, conn) => {
      const { connection } = conn.params;
      console.log("masuuuuuk", data);
      switch (data.action) {
        case "join":
          app.channel(`chat/${data.chat_id}`).join(connection);
          return;
        case "leave":
          app.channel(`chat/${data.chat_id}`).leave(connection);
          // app.channel(`user-list`).leave(connection);
          return;
        default:
          break;
      }
    });

    return context;
  };
};
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [handleAfterCreate()],
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
