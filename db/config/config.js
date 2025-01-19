const app = require("../../src/app");
const env = process.env.NODE_ENV || "development";
const dialect = process.env.DB_DIALECT || "mysql";
const port = process.env.DB_PORT || 3306;

module.exports = {
  [env]: {
    dialect,
    dialectOptions: {
      encrypt: true,
      port: Number(port),
    },
    url: app.get(dialect),
    migrationStorageTableName: "_migrations",
  },
};
