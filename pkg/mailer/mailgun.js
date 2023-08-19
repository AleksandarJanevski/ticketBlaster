const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: "key-e97dec936ec158258f3f7d29d8f7d5ee",
});

const sendMailGun = async (options) => {
  const emailData = {
    from: "TicketBlaster <postmaster@sandbox7f0019154d7249a3a342ccf38198b68a.mailgun.org>",
    to: options.email,
    date: Date.now(),
    subject: options.subject,
    html: options.html,
  };
  await mg.messages.create(
    "sandbox7f0019154d7249a3a342ccf38198b68a.mailgun.org",
    emailData
  );
};

module.exports = sendMailGun;
