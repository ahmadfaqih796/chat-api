/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const errors = require("@feathersjs/errors");
const logger = require("../../../src/logger");
const { convertPug } = require("../../utils/convertPug");

const {
  NODE_ENV = "development",
  DASHBOARD_BASE_URL_DEV,
  DASHBOARD_BASE_URL,
} = process.env;

module.exports = (app) => {
  const baseUrl =
    NODE_ENV == "development" ? DASHBOARD_BASE_URL : DASHBOARD_BASE_URL;

  async function sendEmail(payload) {
    return await app
      .service("/email")
      .create(payload)
      .then((result) => logger.info("Sent email", result))
      .catch((err) => {
        logger.info(err.message);
        // throw new errors.GeneralError('Server error, code: 631', {
        //   description: err.message
        // });
      });
  }

  function getLink(type, token) {
    const url = `${baseUrl}/verify?id=${token}`;
    return url;
  }

  function getResetLink(token) {
    const url = `${baseUrl}/authentication/reset-password?token=${token}`;
    return url;
  }

  return {
    notifier: async (type, user, notifierOptions) => {
      let data;
      let email;
      const useLinkVerification =
        notifierOptions.platform == "web" ? true : false;

      switch (type) {
        case "resendVerifySignup":
          data = {
            username: user.fullname,
            otp: useLinkVerification
              ? getLink("verify", user.verifyToken)
              : user.verifyShortToken,
            // otp: getLink('verify', user.verifyToken),
          };

          email = {
            to: user.email,
            subject: "Verifikasi Pendaftaran",
            html: convertPug(
              data,
              useLinkVerification
                ? "user-link-verification.pug"
                : "user-verification.pug"
            ),
          };

          return await sendEmail(email);
        case "sendResetPwd":
          data = {
            username: user.fullname,
            otp: useLinkVerification
              ? getResetLink(user.resetToken)
              : user.resetShortToken,
          };

          email = {
            to: user.email,
            subject: "Reset Password",
            html: convertPug(
              data,
              useLinkVerification
                ? "reset-password-with-link.pug"
                : "user-verification.pug"
            ),
          };

          return sendEmail(email);
        default:
          break;
      }
    },
  };
};
