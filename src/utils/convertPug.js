
const pug = require('pug');
const juice = require('juice');

exports.convertPug = (options, filename) => {
  const template = pug.renderFile(`${process.cwd()}/src/email-templates/${filename}`, options);
  const inlinedHtml = juice(template);

  return inlinedHtml;
};
