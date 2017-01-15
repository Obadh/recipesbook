import {MongoClient as mongo} from 'mongodb'
import assert from 'assert'
const url = 'mongodb://recipesbookuser:12345@ds047666.mlab.com:47666/recipesbook'

export default function getIngredients (cb) {
  let IngredientsArray = []
  //getting the ingredients from the server
  mongo.connect(url, (err, db) => {
    assert.equal(null, err)
    let cursor = db.collection('ingredients').find()
    cursor.forEach(function (doc, err) {
      assert.equal(null, err)
      IngredientsArray.push(doc)
    }, () => {
      db.close()
      let categories = []
      categories.push({
        category: 1,
        name: 'Vegetables',
        items: IngredientsArray.filter(function (x) {
          return x.category === '1'
        })
      })
      categories.push({
        category: 2,
        name: 'Meet',
        items: IngredientsArray.filter(function (x) {
          return x.category === '2'
        })
      })
      categories.push({
        category: 3,
        name: 'Seafood',
        items: IngredientsArray.filter(function (x) {
          return x.category === '3'
        })
      })
      cb(categories)
    })
  })
}
