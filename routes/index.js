var express = require('express');
var router = express.Router();

/* basic routes here */ /* complex routes -> index.js */

router.get('/', function(req, res) {
  res.render('index', { title: 'Magness Design' });
//  res.json({ message: 'hooray! welcome to our api!' });   

  // res.sendFile('../index.html', { title: 'Magness Design' });

});

router.get('/about', function(req, res) {
  res.render('static_about', { title: 'About' });
});

router.get('/contact', function(req, res) {
  res.render('static_contact', { title: 'Contact' });
 
});




module.exports = router;
