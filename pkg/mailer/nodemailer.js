const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transport.verify((err, succes) => {
    if (err) return console.log(err);
    else return console.log(succes);
  });
  const mailOptions = {
    from: "TicketBlaster <customercare@tblaster.com>",
    to: options.email,
    date: Date.now(),
    subject: options.subject,
    html: options.html,
  };
  await transport.sendMail(mailOptions);
};
