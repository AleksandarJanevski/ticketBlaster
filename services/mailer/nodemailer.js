const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    transport.verify((err, succes) => {
        if (err) return console.log(err);
        else return console.log(succes);
    });
    const mailOptions = {
        from: 'TicketBlaster <customarecare@tblaster.com>',
        to: options.email,
        date: Date.now(),
        subject: options.subject,
        html: `<h1 style="color: white; background-color: black; text-align: center">
        Ticket Blaster
      </h1>
      <span style="margin: 0 auto"
        ><p style="text-align: center">
          Please click the button to verify your Email
        </p>
        <br />
        <a href="${options.link}">
          <button style="background-color: #ff48ab; color: black">
            Verify Email
          </button>
        </a>
      </span>`
    }
    await transport.sendMail(mailOptions)
}

