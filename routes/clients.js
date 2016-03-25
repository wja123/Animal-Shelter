var express = require('express');
var router = express.Router();
var Pet = require("../models/pet");
var Client = require("../models/client");

/* GET users listing. */
router.get('/', function(req, res, next) {
    Client.find({}).exec(function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.get('/pets', function(req, res, next) {
    Client.find({}).populate('pets').exec(function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.get('/:_id/pets', function(req, res, next) {
    Client.findById(req.params._id).populate('pets').exec(function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.get('/:_id', function(req, res, next) {
    Client.findById(req.params._id).populate('pets').exec(function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.put('/:_id', function(req, res, next) {
    Client.findByIdAndUpdate(req.params._id, {
        $set: req.body
    }, {
        new: true
    }, function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.post('/', function(req, res, next) {
    var newClient = new Client(req.body);
    newClient.save(function(err, data) {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
});

router.delete('/:_id', function(req, res, next) {
    Client.findById(req.params._id, function(err, data) {
        if (err) return res.status(400).send(err);
        if(data.pets){
            Pet.find({'_id':{$in:data.pets}},function(err,data){
                data.remove(function(err,delData){

                });
            });
            
        }
    });
});

router.put('/:clientId/adopt/:petId', function(req, res, next) {
    Client.findById(req.params.clientId, function(err, data) {
        if (err) return res.status(400).send(err);
        Pet.findById(req.params.petId, function(err, petData) {
            if (err) return res.status(400).send(err);
            data.pets.push(petData._id);
            data.save(function(err, saveData) {
                if (err) return res.status(400).send(err);
                petData.adopted=true;
                petData.save(function(err, savePetData) {
                    if (err) return res.status(400).send(err);
                    res.send(savePetData);
                });
            });

        });
    });
});

router.put('/:clientId/undo/:petId', function(req, res, next) {
    Client.findById(req.params.clientId, function(err, data) {
        if (err) return res.status(400).send(err);
        Pet.findById(req.params.petId, function(err, petData) {
            if (err) return res.status(400).send(err);
            data.pets.splice(data.pets.indexOf(petData._id),1);
            data.save(function(err, saveData) {
                if (err) return res.status(400).send(err);
                petData.adopted=false;
                petData.save(function(err, savePetData) {
                    if (err) return res.status(400).send(err);
                    res.send(savePetData);
                });
            });
        });
    });
});

module.exports = router;