const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data } = context;

    if (context.error.message === 'Invalid login') {
      const email = data.email;
      const isEmailValid = await app.service('users').Model.findOne({
        where: {
          email: email,
        },
      });

      if (isEmailValid) {
        throw new errors.NotAuthenticated('Email atau password salah');
      }

      throw new errors.NotAuthenticated(
        'Username atau password tidak ditemukan'
      );
    }

    return context;
  };
};
