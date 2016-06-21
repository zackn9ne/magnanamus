var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/portfolios if the default route for / is left unchanged
router.route('/')
    //GET all portfolios
    .get(function(req, res, next) {
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

    //POST a new portfolio
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var badge = req.body.badge;
        var dob = req.body.dob;
        var thumbnail = req.body.thumbnail;
        var images =  { $push: 
          { images: 
            { path: req.body.path
              , span: req.body.span
            }
          },
        }
        var description = req.body.description;
        //call the create function for our database
        mongoose.model('Portfolio').create({
            name : name,
            badge : badge,
            dob : dob,
            thumbnail : thumbnail,
            images : images,
            description : description
        }, function (err, portfolio) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Portfolio has been created
                  console.log('POST creating new portfolio: ' + portfolio);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("portfolios");
                        // And forward to success page
                        res.redirect("/portfolio");
                    },
                    //JSON response will show the newly created portfolio
                    json: function(){
                        res.json(portfolio);
                    }
                });
              }
        })
    });

/* GET New Portfolio page. */
router.get('/new', function(req, res) {
    res.render('portfolio/new', { title: 'Add New Portfolio' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Portfolio').findById(id, function (err, portfolio) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(portfolio);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Portfolio').findById(req.id, function (err, portfolio) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + portfolio._id);
        var portfoliodob = portfolio.dob.toISOString();
        portfoliodob = portfoliodob.substring(0, portfoliodob.indexOf('T'))
        res.format({
          html: function(){
              res.render('portfolio/show', {
                "portfoliodob" : portfoliodob,
                "portfolio" : portfolio
              });
          },
          json: function(){
              res.json(portfolio);
          }
        });
      }
    });
  });

router.route('/:id/edit')
  //GET the individual portfolio by Mongo ID
  .get(function(req, res) {
      //search for the portfolio within Mongo
      mongoose.model('Portfolio').findById(req.id, function (err, portfolio) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the portfolio
              console.log('GET Retrieving ID: ' + portfolio._id);
              var portfoliodob = portfolio.dob.toISOString();
              portfoliodob = portfoliodob.substring(0, portfoliodob.indexOf('T'))
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('portfolio/edit', {
                            title: 'Portfolio' + portfolio._id,
                            "portfoliodob" : portfoliodob,
                            "portfolio" : portfolio
                        });
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(portfolio);
                   }
              });
          }
      });
  })

  //PUT to update a portfolio by ID /*todo is fix this whole zone*/
    .put(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var badge = req.body.badge;
        var thumbnail = req.body.thumbnail;
        var dob = req.body.dob;
        var images =  { $push: 
          { images: 
            { path: req.body.path
              , span: req.body.span
            }
          },
        }     
        var description = req.body.description;

        //call the create function for our database
        mongoose.model('Portfolio').findById(req.id, function (err, portfolio) {
          //update it
          console.log("herez" + images[1]);

          portfolio.update({
        
            name : name,
            badge : badge,
            thumbnail : thumbnail,
            images: images,
            description : description


          }, function (err, portfolioID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                    //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                    res.format({
                        html: function(){
                             res.redirect("/portfolio/" + portfolio._id);
                       },
                       //JSON responds showing the updated values
                      json: function(){
                             res.json(portfolio);
                       }
                    });
             }
          })
      });
  })
  //DELETE a Portfolio by ID
  .delete(function (req, res){
      //find portfolio by ID
      mongoose.model('Portfolio').findById(req.id, function (err, portfolio) {
          if (err) {
              return console.error(err);
          } else {
              //remove it from Mongo
              portfolio.remove(function (err, portfolio) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //Returning success messages saying it was deleted
                      console.log('DELETE removing ID: ' + portfolio._id);
                      res.format({
                          //HTML returns us back to the main page, or you can create a success page
                            html: function(){
                                 res.redirect("/portfolio");
                           },
                           //JSON returns the item with the message that is has been deleted
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : portfolio
                                 });
                           }
                        });
                  }
              });
          }
      });
  });

module.exports = router;
