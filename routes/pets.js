var express = require('express');
var router = express.Router();
var Pet = require("../models/pet");
var Client = require("../models/client");
var moment = require("moment");

router.get('/', function(req, res, next) {
    Pet.find({}).exec(function(err, data) {
        if (err) res.status(400).send(err);
        res.send(data);
    });
});

router.get('/available', function(req, res, next) {
    Pet.find({adopted:false}).exec(function(err, data) {
        if (err) res.status(400).send(err);
        res.send(data);
    });
});

router.post('/', function(req, res, next) {
    var newPet = Pet(req.body);
    newPet.save(function(err, data) {
        if (err) res.status(400).send(err);
        res.send(data);
    });
});

router.put("/:_id", function(req, res, next) {
    Pet.findByIdAndUpdate(req.params._id, {
        $set: req.body
    }, {
        new: true
    }, function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.delete("/:_id",function(req,res,next){
    Client.find({pets:{$in: [req.params._id]}}).exec(function(err,data){
        if(data){
        data.remove(function(err,data){
            if(err) return res.status(400).send(err);
            res.send(data);
        });
            
        }
    });

      Pet.findByIdAndRemove(req.params._id,function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});


module.exports = router;