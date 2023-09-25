// Initializes the `auth-management` service on path `/auth-management`
const hooks = require("./auth-management.hooks");
const authManagement = require("feathers-authentication-management");
const notifier = require("./notifier");

module.exports = function (app) {
  const options = Object.assign(notifier(app), {
    path: "/auth-management",
    paginate: app.get("paginate"),
    service: "/users",
    identifyUserProps: ["email", "verifyToken", "resetToken"],
    skipIsVerifiedCheck: false,
    reuseResetToken: true,
    shortTokenLen: 5,
    resetAttempts: 5,
  });

  app.configure(authManagement(options));

  const service = app.service("/auth-management");

  service.hooks(hooks);
};
