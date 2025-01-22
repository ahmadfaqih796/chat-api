// Initializes the `message-status` service on path `/message-status`
const { MessageStatus } = require('./message-status.class');
const createModel = require('../../models/message-status.model');
const hooks = require('./message-status.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/message-status', new MessageStatus(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('message-status');

  service.hooks(hooks);
};
