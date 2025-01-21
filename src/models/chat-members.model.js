// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const chatMembers = sequelizeClient.define(
    "chat_members",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      chat_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "chats",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
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
  chatMembers.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    chatMembers.belongsTo(models.chats, {
      foreignKey: "chat_id",
      as: "chat_data",
    });
    chatMembers.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user_data",
    });
  };

  return chatMembers;
};
