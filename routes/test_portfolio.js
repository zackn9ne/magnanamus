var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose') //mongo connection


    router.route('/').get(function(req, res, next) {
console.log(' testing portfolios all')
        //retrieve all portfolios from Monogo
        mongoose.model('Portfolio').find({ 

        }, 
          function (err, portfolios) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/portfolios folder. We are also setting "portfolios" to be an accessible variable in our jade view
                    html: function(){
                        res.render('portfolio/index', {
                              title: 'Portfolio',
                              "portfolios" : portfolios
                          });
                    },
                    //JSON response will show all portfolios in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }     
        }).
        sort({ badge: 1 });

    })

//* static because fuck this */
router.route('/old_field').get(function(req,res){
  res.sendFile(__dirname + '/old_field.html');
});
router.route('/townhouse').get(function(req,res){
  res.sendFile(__dirname + '/townhouse.html');
});
router.route('/downtown_loft').get(function(req,res){
  res.sendFile(__dirname + '/downtown_loft.html');
});
router.route('/greenwich_village').get(function(req,res){
  res.sendFile(__dirname + '/greenwich_village.html');
});
module.exports = router;
