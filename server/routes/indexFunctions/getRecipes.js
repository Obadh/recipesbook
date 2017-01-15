import {MongoClient as mongo} from 'mongodb'
import assert from 'assert'
const url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook'

export default function getRecipes (Ingredients, res, cb) {
  let selectedIngredients = []
  let selectedIngredientsFood = Ingredients
  //If we select one ingredient it will be a string so we make it an array
  if (typeof selectedIngredientsFood === 'string') {
    selectedIngredients.push(selectedIngredientsFood)
  } else {
    selectedIngredients = selectedIngredientsFood
  }
  let allRecipes = []
  let recipeIngredients = []
  let selectedRecipes = []
  //getting the recipes from the server and filtering them depending on the ingredients that seledcted
  mongo.connect(url, function (err, db) {
    assert.equal(null, err)
    let cursor = db.collection('recipes').find()
    cursor.forEach(function (doc, err) {
      assert.equal(null, err)
      allRecipes.push(doc)
    }, function () {
      for (let x in allRecipes) {
        recipeIngredients = allRecipes[x].ingredients
        let found = selectedIngredients.every(function (val) {
          return recipeIngredients.indexOf(val) >= 0
        })
        if (found === true) {
          selectedRecipes.push(allRecipes[x])
        }
      }
      cb(selectedRecipes)
      db.close()
    })
  })
}
