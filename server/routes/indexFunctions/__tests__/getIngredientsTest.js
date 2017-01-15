import getIngredients from '../getIngredients'

describe('getIngrediants', () => {
  it("should find the ingredients and put it in an array", () => {
    getIngredients(function (categories) {
      //console.log(categories)
      return categories
    })
    expect(result).toEqual('')
  })
})
