'use strict';

var mongoose = require("mongoose");

var Client = mongoose.model("client",{
  joined : {type: Date, default: Date.now()},
  name: String,
  prefSpecies: String,
  prefBreed: String,
  image: String,
  about: String,
  pets:[{type: mongoose.Schema.Types.ObjectId,ref:'pet'}]
});

module.exports = Client;