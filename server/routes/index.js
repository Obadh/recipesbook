var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' , layout: 'layout_admin' });
// });

module.exports = router;



router.get('/', function(req, res, next) {

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('ingredients').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      var output = resultArray.filter(function(x){return x.category == 1 || x.category == 2 || x.category == 3});
      var categories= [];
      categories.push({category : 1,  name: 'Vegetables', items:resultArray.filter(function(x){return x.category == 1})})
      categories.push({category : 2, name: 'Meet', items:resultArray.filter(function(x){return x.category == 2})})
      categories.push({category : 3, name: 'Seafood', items:resultArray.filter(function(x){return x.category == 3})})


      res.render('index', {categories: categories});
      // res.render('index', { title: 'Express' , layout: 'layout_admin' });

    });
  });
});


router.post('/get_recipe', function(req, res, next) {


    var item =[];
    var recipesArray=[];
    item = req.body.food;

      console.log(item);

    mongo.connect(url, function (err, db) {
      assert.equal(null, err);


      var cursor = db.collection('recipes').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        recipesArray.push(doc);

      }, function() {

        // for(int i=0; i<=recipesArray.length();i++){
        //   console.log(recipesArray[i].ingredients);
        // }


        db.close();

      });


});

});
