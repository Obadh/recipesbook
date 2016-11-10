function Appctrl($scope,$http) {
  $scope.console = console.log;
  $scope.totalRecepiesFound = 0;
  $scope.selectIngredients= function(item,$event){
    $event.preventDefault();
    $event.stopPropagation();
    item.toggle = !item.toggle;
    $scope.getRecepiesFromIngredients();
    //$scope.$apply();
    //console.log(item);
  }

  $scope.getRecepiesFromIngredients = function(){
    var req = {ingredients: []}

    for(var k = 0; k < $scope.categories.length; k++){
      req.ingredients = req.ingredients.concat($scope.categories[k].items.filter(function(item){
        return item.toggle;
      }));
    }
    var data = req.ingredients;
    $http.post('/get_recipes', data).success(function (res) {
      $scope.totalRecepies = res;
      $scope.totalRecepiesFound = res.length;
    })
    //console.log(req);
    return []
  }


  // $http.post('/get_recipes', $scope.recipesArray2).success(function (response) {
  //
  // })


$http.get('/categories').success(function (response) {
  console.log("I got the data I requested", response);
  $scope.categories = response.map(function(category){
    category.items = category.items.map(function(ingredient){
      ingredient.toggle = false;
      return ingredient;
    })
    return category
  });

  console.log($scope.categories)
})
}





// angular.
//     module('recepie', []).
//     controller('search-recepie',function($scope, $http){
//       console.log($scope);
//       $http({
//   method: 'POST',
//   url: '/get_recipe',
//   data: {
//     food: [ 'Broccoli', 'Parsley']
//   }
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//     console.log('Recepies', response)
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//     console.log('Mauro is stupid');
//   });
//     })
