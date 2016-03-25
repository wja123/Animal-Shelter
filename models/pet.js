'use strict';

var mongoose = require("mongoose");

var Pet = mongoose.model("pet", {
    birthDate: Date,
    name: String,
    species: String,
    breed: String,
    image: String,
    adopted: {
        type: Boolean,
        default: false
    },
    about: String
});

module.exports = Pet;