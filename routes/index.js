var express = require('express');
var router = express.Router();

/* basic routes here */ /* complex routes -> index.js */

router.get('/', function(req, res) {
  res.render('index', { title: 'Magness Design' });
  res.sendFile('../index.html', { title: 'Magness Design' });
});

router.get('/about', function(req, res) {
  res.render('basic_about', { title: 'About' });
});

router.get('/contact', function(req, res) {
  res.render('basic', { title: 'Contact' });
});




module.exports = router;
