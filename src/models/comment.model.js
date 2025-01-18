// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const comment = sequelizeClient.define(
    "comment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      comment_id: {
        type: DataTypes.UUID,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      created_by: {
        type: DataTypes.STRING(100),
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
  comment.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html

    comment.belongsTo(models.users, {
      forignKey: "user_id",
      as: "user",
    });
  };

  return comment;
};
