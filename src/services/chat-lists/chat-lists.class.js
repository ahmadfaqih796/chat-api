/* eslint-disable no-unused-vars */
exports.ChatLists = class ChatLists {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    console.log("masuk dulu gan");

    const { query } = params;
    const sequelize = this.app.get("sequelizeClient");
    const { chats, chat_members, users, messages, message_status } =
      sequelize.models;

    const userId = query.user_id;

    const chatlists = await chats.findAll({
      include: [
        {
          attributes: ["id"],
          model: chat_members,
          as: "members",
          include: [
            {
              attributes: ["id", "fullname", "email"],
              model: users,
              as: "user",
            },
          ],
        },
        {
          model: messages,
          as: "messages",
          include: [
            {
              model: message_status,
              as: "statuses",
            },
          ],
        },
      ],
    });

    return chatlists;
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
