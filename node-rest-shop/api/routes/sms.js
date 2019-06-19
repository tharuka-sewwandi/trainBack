const express = require("express");
const router = express.Router();

const accountSid = "ACc12674c3d9d5141ee992ef0a5432fd35";
const authToken = "7aa8a5796ccfe7d307231c7c85de1746";
const client = require("twilio")(accountSid, authToken);

router.post("/", (req, res) => {
  const { recipient, textmessage } = req.query;

  client.messages
    .create({
      body: textmessage,
      to: "+94" + recipient,
      from: "+19386665682"
    })
    .then(message => console.log(message.body))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
