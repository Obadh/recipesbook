import express from 'express'
const app = express()
const router = express.Router()
import bodyParser from 'body-parser'
app.use(express.static('__dirname' + '/'))
import getRecipes from './indexFunctions/getRecipes'
import getIngredients from './indexFunctions/getIngredients'
module.exports = router
app.use(bodyParser.json())

// -----------------Get requests-----------------------
//Get the ingredients to use it in the html file
router.get('/', (req, res, next) => {
  getIngredients(function (categories) {
    res.render('index', {
      categories: categories
    })
  })
})
//Get the ingredients to use it in the controller(angularJS)
router.get('/categories', (req, res, next) => {
  getIngredients(function (categories) {
    res.json(categories)
  })
})

// ------------------Post requests-------------------------
//Get the recipes depending on a post ingredients request to use it in the html file
router.post('/get_recipe', (req, res, next) => {
  let Ingredients = req.body.food
  getRecipes(Ingredients, res, function (selectedRecipes) {
    res.render('get_recipe', {
      recipes: selectedRecipes
    })
  })
})
//Get the recipes depending on a post ingredients request to use it in the controller(angularJS)
router.post('/get_recipes', (req, res, next) => {
  let Ingredients = []
  for (let i = 0; i < req.body.length; i++) {
    Ingredients.push(req.body[i].name)
  }
  getRecipes(Ingredients, res, function (selectedRecipes) {
    res.json(selectedRecipes)
  })
})
