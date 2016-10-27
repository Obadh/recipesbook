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
            var output = resultArray.filter(function(x) {
                return x.category == 1 || x.category == 2 || x.category == 3
            });
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

            res.json(categories);
            // res.render('index', {
            //     categories: categories
            // });
            // res.render('index', { title: 'Express' , layout: 'layout_admin' });

        });
    });
});


router.post('/get_recipe', function(req, res, next) {
    var recipesArray = [];

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);


        var cursor = db.collection('recipes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            recipesArray.push(doc);
        }, function() {

            var ingredients = typeof req.body.food === 'string' ? (req.body.food.indexOf(',') > -1 ? req.body.food.split(',') : [req.body.food]) : req.body.food;

            /** This is the definition of the variable before;
            if(typeof req.body.food === 'string'){
              if(req.body.food.indexOf(',') > -1){
                ingredients = req.body.food.split(',')
              }else{
                ingredients = [ req.body.food ]
              }
            }else{
              ingredients = req.body.food
            } **/

            recipesArray = recipesArray.filter(function(recepie){
              var isPreset = [];
              var _ingredientsRecipe = recepie.ingredients.map(function(_ingredient){
                return _ingredient.toLowerCase()
              });
              for(var k in ingredients){
                var _ingredient = ingredients[k].toLowerCase();
                if(_ingredientsRecipe.indexOf(_ingredient) > -1){
                  isPreset.push(_ingredient);
                }
              }
              console.log(isPreset.length, ingredients.length)
              return isPreset.length === ingredients.length;
            })

            res.json({
                recipes: recipesArray
            });

            db.close();

        });



    });

});
