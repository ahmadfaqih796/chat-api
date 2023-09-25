// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const users = sequelizeClient.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // bahan untuk reset password
      resetAttempts: {
        type: DataTypes.INTEGER,
        field: "resetAttempts",
      },
      verifyToken: {
        type: DataTypes.STRING,
        field: "verifyToken",
      },
      verifyShortToken: {
        type: DataTypes.STRING,
        field: "verifyShortToken",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: "isVerified",
      },
      verifyExpires: {
        type: DataTypes.DATE,
        field: "verifyExpires",
      },
      verifyChanges: {
        type: DataTypes.STRING,
        field: "verifyChanges",
        get() {
          const value = this.getDataValue("verifyChanges") || "{}";
          const parsedValue = JSON.parse(value);

          return parsedValue;
        },
        set(value) {
          this.setDataValue("verifyChanges", JSON.stringify(value));
        },
      },
      resetToken: {
        type: DataTypes.STRING,
        field: "resetToken",
      },
      resetShortToken: {
        type: DataTypes.STRING,
        field: "resetShortToken",
      },
      resetExpires: {
        type: DataTypes.DATE,
        field: "resetExpires",
      },

      googleId: { type: DataTypes.STRING },
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
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return users;
};
