const { authenticate } = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");
const {
  iff,
  isProvider,
  preventChanges,
  disallow,
} = require("feathers-hooks-common");

const isAction =
  (...args) =>
  (hook) =>
    args.includes(hook.data.action);

const logError = () => {
  return async (context) => {
    const { error } = context;
    const { errors: err } = error;
    const { $className } = err;

    switch ($className) {
      case "verifyExpired":
        throw new errors.BadRequest(
          "Kode OTP sudah kadaluarsa. Silahkan kirim ulang OTP"
        );
      case "badParam":
        throw new errors.BadRequest(
          "Kode OTP invalid. Silahkan kirim ulang OTP"
        );
      case "incorrectToken":
        throw new errors.BadRequest("Kode reset password invalid.");
      default:
        break;
    }

    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      iff(isAction("passwordChange", "identityChange"), [authenticate("jwt")]),
    ],
    update: [disallow("external")],
    patch: [
      iff(
        isProvider("external"),
        preventChanges(
          true,
          "email",
          "isVerified",
          "verifyToken",
          "verifyExpires",
          "resetToken",
          "resetExpires"
        )
      ),
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [logError()],
    update: [],
    patch: [],
    remove: [],
  },
};
