// Initializes the `chats` service on path `/chats`
const { Chats } = require('./chats.class');
const createModel = require('../../models/chats.model');
const hooks = require('./chats.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chats', new Chats(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chats');

  service.hooks(hooks);
};
