const { authenticate } = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");

const handleBeforeCreate = () => {
  return async (context) => {
    const { app, data } = context;
    const { user } = context.params;
    console.log("dara", data);

    if (!Object.keys(data).includes("members")) {
      throw new errors.BadRequest("members is required");
    }

    return context;
  };
};

const handleAfterCreate = () => {
  return async (context) => {
    const { app, data, result } = context;
    const sequelize = app.get("sequelizeClient");
    const { chat_members } = sequelize.models;

    const user = data.members.map((item) => ({
      user_id: item.user_id,
      chat_id: result.id,
    }));
    await chat_members.bulkCreate(user);
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
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
