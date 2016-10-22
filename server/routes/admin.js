var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

module.exports = router;

/* GET home page. */
//  router.get('/', function(req, res, next) {
//    res.render('admin', { title: 'my admin page', layout: 'layout_admin' });
// });


router.get('/', function(req, res, next) {
  var resulIngredients = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('ingredients').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resulIngredients.push(doc);
    }, function() {
      db.close();
      // var output = resultArray.filter(function(x){return x.cat_id == 1});
      res.render('admin', {items: resulIngredients , layout: 'layout_admin'});
      console.log(resulIngredients[0].name);
      console.log("erojkroegkgk");


    });
  });
});


router.post('/recipe', function(req, res, next) {


    var item = {
      name: req.body.name_recipes,
      image: req.body.Image_recipes,
      description: req.body.Descreption_recipes,
        ingredients : req.body.Ingredients_recipes
    };



    mongo.connect(url, function (err, db) {
      assert.equal(null, err);
      db.collection('recipes').insertOne(item, function (err, result) {
        if(err) return res.status(500).json({msg: err});
        res.json({msg: 'Item inserted', item: item});
        console.log('Item inserted');
        db.close();
      });
    });



});



router.post('/ingredients', function(req, res, next) {


    var item = {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
    };
  console.log(req.body.name);
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('ingredients').insertOne(item, function (err, result) {
            if(err) return res.status(500).json({msg: err});
            res.json({msg: 'Item inserted', item: item});
            console.log('Item inserted');
            db.close();
        });
    });



});
