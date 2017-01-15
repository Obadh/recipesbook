function Appctrl ($scope, $http) {
  $scope.console = console.log
  $scope.totalRecepiesFound = 0
  $scope.selectIngredients = (item, $event) => {
    $event.preventDefault()
    $event.stopPropagation()
    item.toggle = !item.toggle
    $scope.getRecepiesFromIngredients()
  }

  $scope.getRecepiesFromIngredients = () => {
    let req = {ingredients: []}
    for (let k in $scope.categories) {
      req.ingredients = req.ingredients.concat($scope.categories[k].items.filter(function (item) {
        return item.toggle
      }))
    }
    var data = req.ingredients
    $http.post('/get_recipes', data).success(function (res) {
      $scope.totalRecepies = res
      $scope.totalRecepiesFound = res.length
    })
    return []
  }

  $http.get('/categories').success(function (response) {
    console.log('I got the data I requested', response)
    $scope.categories = response.map(function (category) {
      category.items = category.items.map(function (ingredient) {
        ingredient.toggle = false
        return ingredient
      })
      return category
    })
    console.log($scope.categories)
  })
}
