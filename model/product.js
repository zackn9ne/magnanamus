var mongoose = require('mongoose');  
var productSchema = new mongoose.Schema({  
  name: String,
  badge: Number,
  dob: { type: Date, default: Date.now },
    thumbnail: String,
    images: String
});

var Product = mongoose.model('Product', productSchema);
