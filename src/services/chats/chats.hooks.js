const { authenticate } = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");
const includeChatMembers = require("../../hooks/includes/include-chat-members");

const handleBeforeCreate = () => {
  return async (context) => {
    const { app, data } = context;
    const { user } = context.params;

    const sequelize = app.get("sequelizeClient");
    const { chat_members } = sequelize.models;

    if (data.person_id) {
      context.data = {
        ...data,
        name: null,
        is_group: false,
        members: [
          {
            user_id: user.id,
          },
          {
            user_id: data.person_id,
          },
        ],
      };
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

    if (data.person_id) {
      context.result = {
        status: 200,
        message: "Berhasil menambahkan user baru",
      };
    }
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [includeChatMembers()],
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
