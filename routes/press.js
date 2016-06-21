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

//build the REST operations at the base for Presss
//this will be accessible from http://127.0.0.1:3000/Presss if the default route for / is left unchanged
router.route('/')
    //GET all Presss
    .get(function(req, res, next) {
        //retrieve all Presss from Monogo
        mongoose.model('Press').find({}, function (err, pressPlural) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/Presss folder. We are also setting "Presss" to be an accessible variable in our jade view
                    html: function(){
                        res.render('press/index', {
                              title: 'Press',
                              "pressPlural" : pressPlural
                          });
                    },
                    //JSON response will show all Presss in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }     
        });
    })
    //POST a new Press
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var badge = req.body.badge;
        var dob = req.body.dob;
        var thumbnail = req.body.thumbnail;
        var images = req.body.images;
        //call the create function for our database
        mongoose.model('Press').create({
            name : name,
            badge : badge,
            dob : dob,
            thumbnail : thumbnail,
            images : images
        }, function (err, press) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Press has been dob
                  console.log('POST creating new press: ' + press);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("pressPlural");
                        // And forward to success page
                        res.redirect("/press");
                    },
                    //JSON response will show the newly dob Press
                    json: function(){
                        res.json(press);
                       // res.send(press);
                    }
                });
              }
        })
    });

/* GET New Press page. */
router.get('/new', function(req, res) {
    res.render('press/new', { title: 'Add New Press' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Press').findById(id, function (err, press) {
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
            //console.log(Press);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Press').findById(req.id, function (err, press) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + press._id);
        var pressdob = press.dob.toISOString();
        pressdob = pressdob.substring(0, pressdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('press/show', {
                "pressdob" : pressdob,
                "press" : press
              });
          },
          json: function(){
              res.json(press);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual Press by Mongo ID
	.get(function(req, res) {
	    //search for the Press within Mongo
	    mongoose.model('Press').findById(req.id, function (err, press) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the Press
	            console.log('GET Retrieving ID: ' + press._id);
              var pressdob = press.dob.toISOString();
              pressdob = pressdob.substring(0, pressdob.indexOf('T'))
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('press/edit', {
	                          title: 'Press' + press._id,
                            "pressdob" : pressdob,
	                          "press" : press
	                      });
	                 },
	                 //JSON response will return the JSON output


	                json: function(){
	                       res.json(press);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a Press by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
	    var name = req.body.name;
	    var badge = req.body.badge;
	    var dob = req.body.dob;
      var thumbnail = req.body.thumbnail;
      var images = req.body.images;

	    //find the document by ID
	    mongoose.model('Press').findById(req.id, function (err, press) {
	        //update it
	        press.update({
	            name : name,
	            badge : badge,
	            dob : dob,
	            thumbnail : thumbnail,
              images : images
	        }, function (err, press) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          } 
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/press/" + press._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(Press);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Press by ID
	.delete(function (req, res){
	    //find Press by ID
	    mongoose.model('Press').findById(req.id, function (err, press) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            Press.remove(function (err, press) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + Press._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/press");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : Press
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
