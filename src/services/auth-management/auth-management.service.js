// Initializes the `auth-management` service on path `/auth-management`
const { AuthManagement } = require('./auth-management.class');
const hooks = require('./auth-management.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/auth-management', new AuthManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
};
