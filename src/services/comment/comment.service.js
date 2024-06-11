// Initializes the `comment` service on path `/comment`
const { Comment } = require('./comment.class');
const createModel = require('../../models/comment.model');
const hooks = require('./comment.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comment', new Comment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment');

  service.hooks(hooks);
};
