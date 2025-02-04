// Initializes the `rooms` service on path `/rooms`
const { Rooms } = require('./rooms.class');
const hooks = require('./rooms.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rooms', new Rooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rooms');

  service.hooks(hooks);
};
