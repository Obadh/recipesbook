var express = require('express');
var app = express();
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var bodyParser = require('body-parser');



var url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' , layout: 'layout_admin' });
// });

module.exports = router;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

function getCategories(cb) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('ingredients').find();
      cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          resultArray.push(doc);
      }, function() {
          db.close();
          var categories = [];
          categories.push({
              category: 1,
              name: 'Vegetables',
              items: resultArray.filter(function(x) {
                  return x.category == 1
              })
          })
          categories.push({
              category: 2,
              name: 'Meet',
              items: resultArray.filter(function(x) {
                  return x.category == 2
              })
          })
          categories.push({
              category: 3,
              name: 'Seafood',
              items: resultArray.filter(function(x) {
                  return x.category == 3
              })
          })
        cb(categories);


      });
  });
}


router.get('/', function(req, res, next) {
  //res.json(categories);
  getCategories(function (categories) {
    res.render('index', {
        categories: categories
    });
  });
});

router.get('/categories' , function (req,res,next) {
  getCategories(function (categories) {
    res.json(categories);
  });
})



router.post('/get_recipe', function(req, res, next) {

  var item = [];
    item = req.body.food;
    if(typeof item === "undefined" || item.length === 0){
      return res.redirect("/");
    }
    //console.log(req.params,"this is params");
    //console.log(req, "request");
    if ( typeof item == "string" )
    {
     var item = item.split(" ");
   }
    var recipesArray = [];
    var item2 = [];
    var recipesArray2 = []
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('recipes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            recipesArray.push(doc);
        }, function() {
            // for(int i=0; i<=recipesArray.length();i++){
            //   console.log(recipesArray[i].ingredients);
            // }
            console.log(item);
            for (var x in recipesArray) {
                item2 = recipesArray[x].ingredients;
                // function arrayContainsArray(superset, subset) {
                //     return superset.every(function(value) {
                //         return (subset.indexOf(value) >= 0);
                //     });
                // }
                //var isSuperset = item.every(function (val) { return item2.indexOf(val) >= 0; });


                var found = item.every(function (val) { return item2.indexOf(val) >= 0; });
                //console.log(found);
                // y = arrayContainsArray(item, item2)
                if (found == true) {
                  //console.log(found);
                  // var z=   recipesArray[x];

                  recipesArray2.push(recipesArray[x]);
                  //console.log();
                }
            }
            console.log(recipesArray);
            res.render('get_recipe', {
                recipes: recipesArray2
            });
            db.close();
        });
    });
});
router.post('/get_recipes', function(req, res, next) {
  var item = [];
  //item = req.body.food;
  for (var i=0; i<req.body.length; i++)
  {
    item.push(req.body[i].name);
  }
  if ( typeof item == "string" )
  {
   var item = item.split(" ");
 }

  var recipesArray = [];
  var item2 = [];
  var recipesArray2 = []
  mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('recipes').find();
      cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          recipesArray.push(doc);
      }, function() {
          // for(int i=0; i<=recipesArray.length();i++){
          //   console.log(recipesArray[i].ingredients);
          // }
          if (typeof item == undefined){
            item=[];
          }
          console.log(item);
          for (var x in recipesArray) {
              item2 = recipesArray[x].ingredients;
              // function arrayContainsArray(superset, subset) {
              //     return superset.every(function(value) {
              //         return (subset.indexOf(value) >= 0);
              //     });
              // }
                 var isSuperset = item.every(function (val) { return item2.indexOf(val) >= 0; });
              // y = arrayContainsArray(item, item2)
              if (isSuperset === true) {
                  console.log(isSuperset);
                // var z=   recipesArray[x];
                 recipesArray2.push(recipesArray[x]);
              }
          }
          res.json(recipesArray2);
          db.close();
      });
  });






});
