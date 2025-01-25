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

const handleAfterFind = () => {
  return async (context) => {
    const { result } = context;

    const coba = result.map((item) => {
      const name = item?.chat?.is_group
        ? item.chat.name
        : item.chat?.members[0].user.fullname;

      return {
        id: item?.chat?.id,
        name: name || "",
        is_group: item?.chat?.is_group,
        last_message: item?.messages[0]?.message || "",
        total_unread: 0,
      };
    });
    context.result = {
      total: result.length,
      coba: coba,
      data: result,
    };
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
    find: [handleAfterFind()],
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
