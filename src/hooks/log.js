// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const util = require("util");
const { compose, getPath, option } = require("crocks");

const logger = require("../logger");

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

const getUserId = compose(option(null), getPath(["params", "user", "id"]));

module.exports = function () {
  return (context) => {
    const userId = getUserId(context);
    const { path, method, type, params } = context;
    const defaultData = {
      userId,
      type,
      method,
      path,
      query: params.query,
    };
    const childLogger = logger.child(defaultData);

    childLogger.info(`${type} app.service('${path}').${method}()`);

    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and logger) to your needs
    logger.debug(`${type} app.service('${path}').${method}()`);

    context.logger = childLogger;

    if (typeof context.toJSON === "function" && logger.level === "debug") {
      logger.debug("Hook Context", util.inspect(context, { colors: false }));
    }

    if (context.error) {
      childLogger.error(context.error, {
        data: context.data,
      });
    }
  };
};
