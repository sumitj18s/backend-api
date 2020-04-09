var mongoose = require('mongoose');

var UserModelSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String
});

module.exports= mongoose.model('UserSchema', UserModelSchema );