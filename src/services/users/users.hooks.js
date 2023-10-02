const { authenticate } = require("@feathersjs/authentication").hooks;

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

const {
  addVerification,
  removeVerification,
} = require("feathers-authentication-management");

const {
  disallow,
  iff,
  isProvider,
  preventChanges,
  disablePagination,
} = require("feathers-hooks-common");

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt"), disablePagination()],
    get: [authenticate("jwt")],
    create: [hashPassword("password"), addVerification("auth-management")],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      disallow("external"),
    ],
    patch: [
      authenticate("jwt"),
      iff(
        isProvider("external"),
        preventChanges(
          true,
          "email",
          "isVerified",
          "resetExpires",
          "resetShortToken",
          "resetToken",
          "verifyChanges",
          "verifyExpires",
          "verifyShortToken",
          "verifyToken"
        ),
        hashPassword("password")
      ),
    ],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [removeVerification()],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
