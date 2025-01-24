// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const chats = sequelizeClient.define(
    "chats",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_group: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  chats.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    chats.hasMany(models.messages, {
      foreignKey: "chat_id",
      as: "messages",
    });
    chats.hasMany(models.chat_members, {
      foreignKey: "chat_id",
      as: "members",
    });
  };

  return chats;
};
