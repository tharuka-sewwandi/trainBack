const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Brs = require("../models/bookResult");

router.post("/", (req, res, next) => {
  const brs = new Brs({
    _id: new mongoose.Types.ObjectId(), //construcyor function automatically create and give a new & unique id
    tname: req.body.tname,
    nic: req.body.nic,
    not: req.body.not,
    empType: req.body.empType,
    firstPrice: req.body.firstPrice,
    disountedPrice: req.body.disountedPrice
  });
  brs
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    message: "created product successfully",
    createdbrs: brs //pass the products object which created in the previous step
  });
});

router.get("/", (req, res, next) => {
  Brs.find()
    .select("_id tname nic not empType firstPrice disountedPrice")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        train: docs.map(doc => {
          return {
            tname: doc.tname,
            depatureStation: doc.depatureStation,
            nic: doc.nic,
            not: doc.not,
            empType: doc.empType,
            firstPrice: doc.firstPrice,
            disountedPrice: doc.disountedPrice,
            request: {
              //meta information
              type: "GET",
              url: "http://localhost:3000/product/" + doc._id
            }
          };
        })
      };
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "no entry found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/", (req, res, next) => {
  Brs.remove()
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
