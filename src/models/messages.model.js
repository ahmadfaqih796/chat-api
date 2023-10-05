// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const messages = sequelizeClient.define(
    "messages",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id_sender: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      id_receiver: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
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
  messages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    messages.belongsTo(models.users, {
      foreignKey: "id_sender",
      as: "user_data",
    });
    messages.belongsTo(models.users, {
      foreignKey: "id_receiver",
      as: "receiver_data",
    });
  };

  return messages;
};
