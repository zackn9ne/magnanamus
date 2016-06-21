var mongoose = require('mongoose');  
var portfolioSchema = new mongoose.Schema({  
  name: String,
  badge: Number,
  thumbnail : String,
  images : [{
  	path: String,
  	span: String
  }],
  dob: { type: Date, default: Date.now },
  description : String
});
mongoose.model('Portfolio', portfolioSchema);
