const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");
const includeUser = require("../../hooks/includes/include-user");
const includeMessageStatus = require("../../hooks/includes/include-message-status");

const handleBeforeCreate = () => {
  return async (context) => {
    const { data, app, params } = context;
    const { user } = context.params;
    if (user) {
      data.sender_id = user.id;
      data.is_read = false;
    }
    if (params.connection) {
      app.channel(`chat`).join(params.connection);
    }
    return context;
  };
};

const handleAfterCreate = () => {
  return async (context) => {
    const { app, params } = context;
    if (params.connection) {
      app.channel(`chat`).leave(params.connection);
    }
    // app.service("messages").emit("created", result);
    // app.service("messages").emit("created", context.dispatch || result);
    return context;
  };
};

const handleAfterRemove = () => {
  return async (context) => {
    const { app, result, params } = context;
    console.log("🗑️ Pesan dihapus:", result);
    app.service("messages").emit("removed", result);
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [disablePagination(), includeMessageStatus()],
    get: [],
    create: [handleBeforeCreate()],
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
    remove: [handleAfterRemove()],
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
