// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const messageStatus = sequelizeClient.define(
    "message_status",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      message_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      read_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
  messageStatus.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    messageStatus.belongsTo(models.messages, {
      foreignKey: "message_id",
      as: "message",
    });
    messageStatus.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return messageStatus;
};
