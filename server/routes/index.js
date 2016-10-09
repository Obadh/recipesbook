var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , layout: 'layout_admin' });
});

module.exports = router;



router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('ingredients').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      // var output = resultArray.filter(function(x){return x.cat_id == 1});
      res.render('index', {items: resultArray});

    });
  });
});