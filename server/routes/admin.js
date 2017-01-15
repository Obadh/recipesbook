import express from 'express'
const router = express.Router()
import {MongoClient as mongo} from 'mongodb'
import assert from 'assert'

const url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

module.exports = router;
router.get('/', function (req, res, next) {
  res.render('admin', {layout: 'layout_admin'});
});

router.post('/recipe', function (req, res, next) {
  var item = {
    name: req.body.name_recipes,
    image: req.body.Image_recipes,
    description: req.body.Descreption_recipes,
    ingredients: req.body.Ingredients_recipes
  };
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('recipes').insertOne(item, function (err, result) {
      if (err) return res.status(500).json({msg: err});
      res.json({msg: 'Item inserted', item: item});
      console.log('Item inserted');
      db.close();
    });
  });
});

router.post('/ingredients', function (req, res, next) {
  var item = {
    name: req.body.name,
    image: req.body.image,
    category: req.body.category
  };
  console.log(req.body.name);
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('ingredients').insertOne(item, function (err, result) {
      if (err) return res.status(500).json({msg: err});
      res.json({msg: 'Item inserted', item: item});
      console.log('Item inserted');
      db.close();
    });
  });
});
