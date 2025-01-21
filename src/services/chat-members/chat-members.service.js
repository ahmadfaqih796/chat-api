// Initializes the `chat-members` service on path `/chat-members`
const { ChatMembers } = require('./chat-members.class');
const createModel = require('../../models/chat-members.model');
const hooks = require('./chat-members.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chat-members', new ChatMembers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chat-members');

  service.hooks(hooks);
};
