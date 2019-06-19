const expres = require("express");
const router = expres.Router();
const mongoose = require("mongoose");
const Govs = require("../models/gov");

router.post("/", (req, res, next) => {
  const gov = new Govs({
    _id: new mongoose.Types.ObjectId(),
    nic: req.body.nic
  });
  gov
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    message: "Created government user successfully",
    createdGov: gov
  });
});

router.get("/nic/:nic", (req, res, next) => {
  const nic = req.params.nic;
  Govs.findOne({ nic: req.params.nic })
    .select("nic")
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/nic", (req, res, next) => {
  const nic = req.params.nic;
  Govs.find()
    .select("nic")
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
