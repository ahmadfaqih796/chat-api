const {
  HOST,
  PORT,
  DB_DIALECT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SECRET_KEY,
  EXPIRES_IN,
  ISSUER,
  AUDIENCE,
  ALGORITHM,
} = process.env;

module.exports = {
  host: HOST,
  port: PORT,
  public: "../public/",
  paginate: {
    default: 10,
    max: 50,
  },
  authentication: {
    entity: "user",
    service: "users",
    secret: SECRET_KEY,
    authStrategies: ["jwt", "local"],
    jwtOptions: {
      header: {
        typ: "access",
      },
      audience: AUDIENCE,
      issuer: ISSUER,
      algorithm: ALGORITHM,
      expiresIn: EXPIRES_IN,
    },
    local: {
      usernameField: "\\username",
      passwordField: "password",
    },
    oauth: {
      redirect: "/",
      google: {
        key: "<google oauth key>",
        secret: "<google oauth secret>",
        scope: ["email", "profile", "openid"],
      },
    },
  },
  mysql: `${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
};
