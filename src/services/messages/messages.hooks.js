const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");
const includeUser = require("../../hooks/includes/include-user");
const includeMessageStatus = require("../../hooks/includes/include-message-status");

const handleBeforeCreate = () => {
  return async (context) => {
    const { data } = context;
    const { user } = context.params;
    if (user) {
      data.sender_id = user.id;
      data.is_read = false;
    }
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
    create: [],
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
