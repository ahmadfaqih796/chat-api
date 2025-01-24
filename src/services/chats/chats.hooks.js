const { authenticate } = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");

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
