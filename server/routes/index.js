import express from 'express';
const app = express();
const router = express.Router();
import {MongoClient as mongo} from 'mongodb';
import {ObjectID as objectId} from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';

const url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook';

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' , layout: 'layout_admin' });
// });
//----------------------
//exporting router functions to app.js
module.exports = router;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

function getCategories(cb) {
  let resultArray = [];
  mongo.connect(url, (err, db) => {
      assert.equal(null, err);
      let cursor = db.collection('ingredients').find();
      cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          resultArray.push(doc);
      }, ()=> {
          db.close();
          let categories = [];
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


router.get('/', (req, res, next)=> {
  getCategories(function (categories) {
    res.render('index', {
        categories: categories
    });
  });
});

router.get('/categories' , (req,res,next)=> {
  getCategories(function (categories) {
    res.json(categories);
  });
})

function getRecipes(Ingrediants, res, cb) {
    var selectedIngrediants = [];
    var selectedIngrediantsFood = Ingrediants;
    if (typeof selectedIngrediantsFood === 'string') {
        selectedIngrediants.push(selectedIngrediantsFood);
    } else {
        selectedIngrediants = selectedIngrediantsFood;
    }
    var allRecipes = [];
    var recipeIngrediants = [];
    var selectedRecipes = []
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('recipes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            allRecipes.push(doc);
        }, function() {
            for (var x in allRecipes) {
                recipeIngrediants = allRecipes[x].ingredients;
                var found = selectedIngrediants.every(function(val) {
                    return recipeIngrediants.indexOf(val) >= 0;
                });
                if (found == true) {
                    selectedRecipes.push(allRecipes[x]);
                }
            }
            cb(selectedRecipes);
            db.close();
        });
    });
}

router.post('/get_recipe', (req, res, next) => {
  let Ingrediants = req.body.food;
  getRecipes(Ingrediants, res, function(selectedRecipes) {
    res.render('get_recipe', {
        recipes: selectedRecipes
    });
  });
});

router.post('/get_recipes', (req, res, next) => {
  let Ingrediants = [];
  for (let i = 0; i < req.body.length; i++) {
      Ingrediants.push(req.body[i].name);
  }
  getRecipes(Ingrediants, res, function(selectedRecipes) {
    console.log(res);
    res.json(selectedRecipes);
  });
});
