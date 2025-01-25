const { authenticate } = require("@feathersjs/authentication").hooks;

const checkLastMessage = (data) => {
  if (data.length > 0) {
    return {
      content: data[data.length - 1].content,
      message_type: data[data.length - 1].message_type,
    };
  }
  return {
    content: "",
    message_type: "",
  };
};
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
    const sequelize = context.app.get("sequelizeClient");
    const { messages } = sequelize.models;

    const chatResults = await Promise.all(
      result.map(async (item) => {
        const name = item?.chat?.is_group
          ? item.chat.name
          : item.chat?.members[0]?.user?.fullname;

        // Get the last message
        const message = checkLastMessage(item?.chat?.messages);

        // Count total unread messages for this chat
        const totalUnread = await messages.count({
          where: {
            chat_id: item?.chat?.id,
            is_read: false,
            sender_id: {
              $ne: context.params.user.id, // Exclude messages sent by the current user
            },
          },
        });

        return {
          id: item?.chat?.id,
          // ...(item.chat?.members?.[0]?.user.id && {
          //   user_id: item.chat?.members[0]?.user?.id,
          // }),
          name: name || "",
          is_group: item?.chat?.is_group,
          last_message: message,
          total_unread: totalUnread,
        };
      })
    );

    context.result = {
      total: result.length,
      data: chatResults,
      xxxx: result,
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
