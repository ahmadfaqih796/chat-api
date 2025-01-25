const { authenticate } = require("@feathersjs/authentication").hooks;

const handleBeforePatch = () => {
  return async (context) => {
    const { app, data, id: chatId } = context;
    const { user } = context.params;

    const sequelize = app.get("sequelizeClient");
    const { chats, messages, message_status } = sequelize.models;

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
          console.log("message", message.is_read);
          if (message.is_read === false) {
            await message.update({
              is_read: true,
            });
            await message_status.create({
              message_id: message.id,
              user_id: user.id,
              is_read: true,
              read_at: new Date(),
            });
          }
        }
      }
    }

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
