const users = require("./users/users.service.js");
const messages = require("./messages/messages.service.js");
const authManagement = require("./auth-management/auth-management.service.js");
const email = require("./email/email.service.js");
const chats = require("./chats/chats.service.js");
const chatMembers = require("./chat-members/chat-members.service.js");
const messageStatus = require("./message-status/message-status.service.js");
const chatLists = require('./chat-lists/chat-lists.service.js');
const rooms = require('./rooms/rooms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(authManagement);
  app.configure(email);
  app.configure(chats);
  app.configure(chatMembers);
  app.configure(messageStatus);
  app.configure(chatLists);
  app.configure(rooms);
};
