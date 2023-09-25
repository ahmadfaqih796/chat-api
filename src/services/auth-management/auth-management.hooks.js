const { authenticate } = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");
const {
  iff,
  isProvider,
  preventChanges,
  disallow,
} = require("feathers-hooks-common");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
