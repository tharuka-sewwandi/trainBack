const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Trains = require("../models/train");

router.post("/", (req, res, next) => {
  const trains = new Trains({
    _id: new mongoose.Types.ObjectId(), //construcyor function automatically create and give a new & unique id
    name: req.body.name,
    depatureStation: req.body.depatureStation,
    depatureTime: req.body.depatureTime,
    arriveStation: req.body.arriveStation,
    arriveTime: req.body.arriveTime,
    price: req.body.price
  });
  trains
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    message: "created product successfully",
    createdtrain: trains //pass the products object which created in the previous step
  });
});

router.get("/", (req, res, next) => {
  Trains.find()
    .select(
      "_id name depatureStation depatureTime arriveStation arriveTime price"
    )
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        train: docs.map(doc => {
          return {
            name: doc.name,
            depatureStation: doc.depatureStation,
            depatureTime: doc.depatureTime,
            arriveStation: doc.arriveStation,
            arriveTime: doc.arriveTime,
            price: doc.price,
            _id: doc._id,
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

router.delete("/:trainId", (req, res, next) => {
  const id = req.params.trainId;
  Trains.remove({ _id: id })
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

router.get("/:trainName", (req, res, next) => {
  const name = req.params.trainName;
  Trains.findById(name)
    .select("price")
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
