// Initializes the `chat-lists` service on path `/chat-lists`
const { ChatLists } = require('./chat-lists.class');
const hooks = require('./chat-lists.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chat-lists', new ChatLists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chat-lists');

  service.hooks(hooks);
};
