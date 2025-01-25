const { authenticate } = require("@feathersjs/authentication").hooks;

const handleBeforePatch = () => {
  return async (context) => {
    const { app, data, id: chatId } = context;
    const { user } = context.params;

    const sequelize = app.get("sequelizeClient");
    const { chats, messages } = sequelize.models;

    const resultChat = await chats.findOne({
      where: {
        id: chatId,
      },
    });

    if (resultChat) {
      const resultMessage = await messages.findAll({
        where: {
          chat_id: chatId,
          is_read: false,
          sender_id: {
            $ne: user.id,
          },
        },
      });
      if (resultMessage.length > 0) {
        for (let i = 0; i < resultMessage.length; i++) {
          const message = resultMessage[i];
          console.log("message", message);
          await message.update({
            is_read: true,
          });
        }
      }
      console.log("tetetet", resultMessage.length);
    }

    // console.log("masukkk ttt gan", resultChat);

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
    patch: [handleBeforePatch()],
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
