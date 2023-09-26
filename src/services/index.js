const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const email = require('./email/email.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(authManagement);
  app.configure(email);
};
