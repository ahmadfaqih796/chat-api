const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const invalidAuth = require("./hooks/invalid-auth");
const authResponse = require("./hooks/auth-response");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());

  const service = app.service("authentication");

  service.hooks({
    after: {
      create: [authResponse()],
    },
    error: {
      create: [invalidAuth()],
    },
  });
};
