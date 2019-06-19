const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
    <li> Name :${req.body.name}</li>
    <li> Email :${req.body.email}</li>
    <li> Contact Number :${req.body.telephone}</li>
    </ul>
    <h3>Message</h3>
    <p> ${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "noel.weber44@ethereal.email",
        pass: "a4M8fU2drR7TvqCP8Q"
      }
    });

    let mailOptions = {
      from: "test@textaccount.com",
      to: "noel.weber44@ethereal.email",
      replyTo: "test@textaccount.com",
      subject: "New Message",
      text: req.body.message,
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }

      console.log("Message Sent: %s", info.message);
      console.log("Message URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
});

module.exports = router;
