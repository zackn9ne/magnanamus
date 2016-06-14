var mongoose = require('mongoose');  
var pressSchema = new mongoose.Schema({  
  name: String,
  badge: Number,
  dob: { type: Date, default: Date.now },
    thumbnail: String,
    images: String
});

var Press = mongoose.model('Press', pressSchema);

