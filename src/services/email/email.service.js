// Initializes the `emails` service on path `/emails`
const Mailer = require("feathers-mailer");

const {
  EMAIL_USER: user,
  EMAIL_PASSWORD: pass,
  EMAIL_HOST: host,
  EMAIL_PORT: port,
} = process.env;

module.exports = function (app) {
  const transporter = {
    requireTLS: true,
    auth: {
      user,
      pass,
    },
    name: "peluangkerjaku.com",
    host,
    port: Number(port),
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  };

  // Initialize our service with any options it requires
  app.use("/email", Mailer(transporter, { from: user }));

  // Get our initialized service so that we can register hooks
  // const service = app.service('/api/v1/emails');

  // service.hooks(hooks);
};
