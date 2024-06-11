const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");
const includeUser = require("../../hooks/includes/include-user");

const HandleGetUser = () => {
  return async (context) => {
    const { params, result } = context;
    result.user_data = {
      id: params.user.id,
      name: params.user.name,
      email: params.user.email,
    };
    // context.app.io.emit("post", result);
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [disablePagination()],
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
    create: [HandleGetUser()],
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
