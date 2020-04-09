//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var UserModelSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String
});

// Compile model from schema
module.exports= mongoose.model('UserSchema', UserModelSchema );